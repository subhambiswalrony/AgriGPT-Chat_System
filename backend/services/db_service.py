from pymongo import MongoClient
from datetime import datetime
from utils.config import MONGO_URI, MONGO_DB

client = MongoClient(MONGO_URI)
db = client[MONGO_DB]

chat_collection = db.chat_history
user_collection = db.users


def save_chat(user_id, question, answer, response_type, language):
    chat_collection.insert_one({
        "user_id": user_id,
        "question": question,
        "answer": answer,
        "response_type": response_type,
        "language": language,
        "timestamp": datetime.utcnow()
    })


def get_chat_history(user_id):
    return list(
        chat_collection.find(
            {"user_id": user_id},
            {"_id": 0}
        ).sort("timestamp", -1)
    )
