from fastapi import APIRouter
from pydantic import BaseModel

from app.llm.groq_chain import chain
from app.database.mongodb import (
    chat_collection,
    usage_collection
)

router = APIRouter()


class ChatRequest(BaseModel):
    message: str



@router.post("/chat")
async def chat(request: ChatRequest):

    response = chain.invoke(
        {
            "question": request.message
        }
    )

    user_id = "demo_user"

    # Save Chat

    chat_collection.insert_one(
        {
            "user_id": user_id,
            "question": request.message,
            "answer": response
        }
    )

    # Simple token estimate

    prompt_tokens = len(
        request.message.split()
    )

    completion_tokens = len(
        str(response).split()
    )

    total_tokens = (
        prompt_tokens +
        completion_tokens
    )

    # Save Usage

    usage_collection.insert_one(
        {
            "user_id": user_id,
            "prompt_tokens": prompt_tokens,
            "completion_tokens": completion_tokens,
            "total_tokens": total_tokens
        }
    )

    return {
        "response": response
    }
    
    
@router.get("/history")
async def history():

    chats = []

    for item in chat_collection.find():

        chats.append(
            {
                "id": str(item["_id"]),
                "question": item["question"],
                "answer": item["answer"]
            }
        )

    return chats