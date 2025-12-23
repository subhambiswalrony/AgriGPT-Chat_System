import os
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
MONGO_URI = os.getenv("MONGO_URI")
MONGO_DB = os.getenv("MONGO_DB")

JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "change-this-secret")
JWT_EXPIRY_HOURS = int(os.getenv("JWT_EXPIRY_HOURS", "24"))

if not GEMINI_API_KEY:
    raise ValueError("❌ GEMINI_API_KEY missing")

if not MONGO_URI:
    raise ValueError("❌ MONGO_URI missing")

if not MONGO_DB:
    raise ValueError("❌ MONGO_DB missing")
