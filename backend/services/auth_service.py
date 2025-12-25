import jwt, bcrypt
from datetime import datetime, timedelta
from utils.config import JWT_SECRET_KEY, JWT_EXPIRY_HOURS
from services.db_service import user_collection


def signup_user(email, password, name):
    if user_collection.find_one({"email": email}):
        raise Exception("User already exists")

    hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt())

    user = {
        "email": email,
        "password": hashed,
        "name": name,
        "created_at": datetime.utcnow(),
        "last_login": None
    }

    result = user_collection.insert_one(user)
    token = generate_token(str(result.inserted_id))

    return {
        "user_id": str(result.inserted_id),
        "email": email,
        "name": name,
        "token": token
    }


def login_user(email, password):
    user = user_collection.find_one({"email": email})
    if not user:
        raise Exception("User not registered")
    if not bcrypt.checkpw(password.encode(), user["password"]):
        raise Exception("Invalid credentials")

    # Update last login timestamp
    user_collection.update_one(
        {"_id": user["_id"]},
        {"$set": {"last_login": datetime.utcnow()}}
    )

    token = generate_token(str(user["_id"]))
    return {
        "user_id": str(user["_id"]),
        "email": user["email"],
        "name": user.get("name"),
        "token": token
    }


def generate_token(user_id):
    payload = {
        "user_id": user_id,
        "exp": datetime.utcnow() + timedelta(hours=JWT_EXPIRY_HOURS)
    }
    return jwt.encode(payload, JWT_SECRET_KEY, algorithm="HS256")
