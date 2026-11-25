import jwt
from datetime import datetime, timedelta

SECRET_KEY = "SUPER_SECRET_AI_ASSISTANT_KEY"

def create_token(user_id):

    payload = {
        "user_id": user_id,
        "exp": datetime.utcnow() + timedelta(days=7)
    }

    return jwt.encode(
        payload,
        SECRET_KEY,
        algorithm="HS256"
    )