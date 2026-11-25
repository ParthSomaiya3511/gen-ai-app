from pymongo import MongoClient

client = MongoClient(
    "mongodb://localhost:27017"
)

db = client["ai_assistant"]

users_collection = db["users"]
chat_collection = db["chats"]
usage_collection = db["usage"]

print("MongoDB Connected Successfully")