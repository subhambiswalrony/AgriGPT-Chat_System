from flask import Blueprint, request, jsonify
from services.auth_service import signup_user, login_user, update_user_profile, change_user_password, delete_user_account, send_otp_email, verify_otp_code, sync_firebase_user_with_mongodb, create_password_for_google_user
from services.firebase_service import verify_firebase_token, get_firebase_user_info
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


@auth_bp.route("/signup", methods=["POST"])
def signup():
    try:
        data = request.get_json()
        return jsonify(signup_user(data["email"], data["password"], data.get("name")))
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@auth_bp.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        return jsonify(login_user(data["email"], data["password"]))
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
        
        if not new_password:
            return jsonify({"error": "Password is required"}), 400
        
        if len(new_password) < 6:
            return jsonify({"error": "Password must be at least 6 characters"}), 400
        
        result = create_password_for_google_user(user_id, new_password)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 400
