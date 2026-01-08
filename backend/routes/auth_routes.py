from flask import Blueprint, request, jsonify
from services.auth_service import signup_user, login_user, update_user_profile, change_user_password, delete_user_account, send_otp_email, verify_otp_code, sync_firebase_user_with_mongodb, create_password_for_google_user, generate_token
from services.firebase_service import verify_firebase_token, get_firebase_user_info
from services.db_service import user_collection, developers_collection
from bson import ObjectId
import jwt
from functools import wraps
from utils.config import JWT_SECRET_KEY

auth_bp = Blueprint("auth", __name__, url_prefix="/api")


def verify_token(token):
    """Verify JWT token and return payload if valid, None otherwise"""
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=["HS256"])
        return payload
    except Exception:
        return None


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get("Authorization", "").replace("Bearer ", "")
        if not token:
            return jsonify({"error": "Token missing"}), 401
        try:
            payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=["HS256"])
            request.current_user = payload
        except Exception:
            return jsonify({"error": "Invalid token"}), 401
        return f(*args, **kwargs)
    return decorated


def admin_required(f):
    """Decorator to check if user is a developer (has access to admin panel)"""
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get("Authorization", "").replace("Bearer ", "")
        if not token:
            return jsonify({"error": "Token missing"}), 401
        try:
            payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=["HS256"])
            user_id = payload.get("user_id")
            
            # Check if user exists
            user = user_collection.find_one({"_id": ObjectId(user_id)})
            if not user:
                return jsonify({"error": "User not found"}), 404
            
            # Check if user is in developers collection
            developer = developers_collection.find_one({"user_id": user_id})
            if not developer:
                return jsonify({"error": "Developer access required. You must be in the developers collection."}), 403
            
            request.current_user = payload
        except Exception as e:
            return jsonify({"error": "Invalid token"}), 401
        return f(*args, **kwargs)
    return decorated


@auth_bp.route("/signup", methods=["POST"])
def signup():
    """Initiate signup by sending OTP - does not create account yet"""
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")
        name = data.get("name")
        
        # Check if user already exists
        if user_collection.find_one({"email": email}):
            return jsonify({"error": "User already exists"}), 400
        
        # Send OTP for signup verification
        from services.otp_service import create_and_send_otp
        result = create_and_send_otp(email, "signup")
        
        # Store signup data temporarily (we'll create account after OTP verification)
        # Note: Password will be hashed when account is created in verify-signup-otp
        return jsonify({
            "message": "OTP sent to your email",
            "otp_id": result["otp_id"],
            "requires_otp": True
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@auth_bp.route("/verify-signup-otp", methods=["POST"])
def verify_signup_otp():
    """Verify OTP and create user account"""
    try:
        data = request.get_json()
        email = data.get("email")
        otp = data.get("otp")
        password = data.get("password")
        name = data.get("name")
        
        # Verify OTP
        from services.db_service import db
        from datetime import datetime
        
        otp_record = db.otp_verifications.find_one({
            "email": email,
            "otp": otp,
            "purpose": "signup",
            "verified": False
        })
        
        if not otp_record:
            return jsonify({"error": "Invalid OTP"}), 400
        
        if otp_record["expires_at"] < datetime.utcnow():
            return jsonify({"error": "OTP expired"}), 400
        
        # Mark OTP as verified
        db.otp_verifications.update_one(
            {"_id": otp_record["_id"]},
            {"$set": {"verified": True}}
        )
        
        # Now create the user account
        result = signup_user(email, password, name)
        return jsonify(result), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@auth_bp.route("/login", methods=["POST"])
def login():
    """Initiate login by verifying credentials and sending OTP"""
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")
        
        # First verify the credentials
        user = user_collection.find_one({"email": email})
        if not user:
            return jsonify({"error": "User not registered"}), 401
        
        # Check if user has a password field
        if "password" not in user or not user["password"]:
            auth_providers = user.get("auth_providers", [])
            if "google" in auth_providers and "local" not in auth_providers:
                return jsonify({"error": "Please sign in with Google or create a password first"}), 401
            else:
                return jsonify({"error": "No password set for this account"}), 401
        
        # Verify password
        import bcrypt
        if not bcrypt.checkpw(password.encode(), user["password"]):
            return jsonify({"error": "Invalid credentials"}), 401
        
        # Credentials verified, now send OTP
        from services.otp_service import create_and_send_otp
        result = create_and_send_otp(email, "login")
        
        return jsonify({
            "message": "OTP sent to your email",
            "otp_id": result["otp_id"],
            "requires_otp": True
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 401


@auth_bp.route("/verify-login-otp", methods=["POST"])
def verify_login_otp():
    """Verify OTP and complete login"""
    try:
        data = request.get_json()
        email = data.get("email")
        otp = data.get("otp")
        
        # Verify OTP
        from services.db_service import db
        from datetime import datetime
        
        otp_record = db.otp_verifications.find_one({
            "email": email,
            "otp": otp,
            "purpose": "login",
            "verified": False
        })
        
        if not otp_record:
            return jsonify({"error": "Invalid OTP"}), 400
        
        if otp_record["expires_at"] < datetime.utcnow():
            return jsonify({"error": "OTP expired"}), 400
        
        # Mark OTP as verified
        db.otp_verifications.update_one(
            {"_id": otp_record["_id"]},
            {"$set": {"verified": True}}
        )
        
        # Complete login
        user = user_collection.find_one({"email": email})
        
        # Update last login timestamp
        user_collection.update_one(
            {"_id": user["_id"]},
            {"$set": {"last_login": datetime.utcnow()}}
        )
        
        token = generate_token(str(user["_id"]))
        return jsonify({
            "user_id": str(user["_id"]),
            "email": user["email"],
            "name": user.get("name"),
            "profilePicture": user.get("profilePicture", ""),
            "token": token
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 401


@auth_bp.route("/update-profile", methods=["PUT"])
@token_required
def update_profile():
    try:
        data = request.get_json()
        user_id = request.current_user["user_id"]
        result = update_user_profile(
            user_id, 
            data.get("name"), 
            data.get("email"),
            data.get("profilePicture")
        )
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@auth_bp.route("/change-password", methods=["PUT"])
@token_required
def change_password():
    try:
        data = request.get_json()
        user_id = request.current_user["user_id"]
        result = change_user_password(user_id, data.get("currentPassword"), data.get("newPassword"))
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@auth_bp.route("/delete-account", methods=["DELETE"])
@token_required
def delete_account():
    try:
        user_id = request.current_user["user_id"]
        result = delete_user_account(user_id)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@auth_bp.route("/send-otp", methods=["POST"])
def send_otp():
    try:
        data = request.get_json()
        email = data.get("email")
        
        if not email:
            return jsonify({"error": "Email is required"}), 400
        
        result = send_otp_email(email)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@auth_bp.route("/verify-otp", methods=["POST"])
def verify_otp():
    try:
        data = request.get_json()
        email = data.get("email")
        otp = data.get("otp")
        
        if not email or not otp:
            return jsonify({"error": "Email and OTP are required"}), 400
        
        result = verify_otp_code(email, otp)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@auth_bp.route("/auth/google", methods=["POST"])
def google_auth():
    """
    Handle Google Sign-In with Firebase
    Verifies Firebase ID token and syncs user with MongoDB
    """
    try:
        # Get Firebase ID token from Authorization header
        auth_header = request.headers.get("Authorization", "")
        if not auth_header.startswith("Bearer "):
            return jsonify({"error": "Invalid authorization header"}), 401
        
        firebase_token = auth_header.replace("Bearer ", "")
        
        # Verify Firebase token
        decoded_token = verify_firebase_token(firebase_token)
        
        # Extract user information
        firebase_user_info = get_firebase_user_info(decoded_token)
        
        # Sync with MongoDB and get/create user
        result = sync_firebase_user_with_mongodb(firebase_user_info)
        
        return jsonify(result)
    except Exception as e:
        print(f"❌ Google auth error: {str(e)}")
        return jsonify({"error": str(e)}), 401


@auth_bp.route("/create-password", methods=["POST"])
@token_required
def create_password():
    """
    Allow Google users to create a password for email/password login
    This works with Firebase linkWithCredential on frontend
    """
    try:
        data = request.get_json()
        user_id = request.current_user["user_id"]
        new_password = data.get("password")
        
        print(f"🔐 Creating password for user_id: {user_id}")
        
        if not new_password:
            return jsonify({"error": "Password is required"}), 400
        
        if len(new_password) < 6:
            return jsonify({"error": "Password must be at least 6 characters"}), 400
        
        result = create_password_for_google_user(user_id, new_password)
        print(f"✅ Password created successfully for user_id: {user_id}")
        return jsonify(result)
    except Exception as e:
        print(f"❌ Error creating password: {str(e)}")
        return jsonify({"error": str(e)}), 400
