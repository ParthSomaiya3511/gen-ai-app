from fastapi import APIRouter
from app.database.mongodb import usage_collection

router = APIRouter()

@router.get("/usage")
async def usage():

    total = 0

    for item in usage_collection.find():
        total += item["total_tokens"]

    return {
        "total_tokens": total
    }