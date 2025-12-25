from flask import Blueprint, request, jsonify
from services.auth_service import signup_user, login_user
import jwt
from functools import wraps
from utils.config import JWT_SECRET_KEY

auth_bp = Blueprint("auth", __name__, url_prefix="/api")


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
