from fastapi import APIRouter
from pydantic import BaseModel
from app.database.mongodb import users_collection

router = APIRouter()

class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str


class LoginRequest(BaseModel):
    email: str
    password: str


@router.post("/register")
async def register(request: RegisterRequest):

    print("REGISTER DATA:")
    print(request)

    result = users_collection.insert_one(
        {
            "name": request.name,
            "email": request.email,
            "password": request.password
        }
    )

    print("INSERTED ID:")
    print(result.inserted_id)

    return {
        "success": True,
        "message": "User Registered Successfully"
    }


@router.post("/login")
async def login(request: LoginRequest):

    user = users_collection.find_one(
        {
            "email": request.email
        }
    )

    if not user:

        return {
            "success": False,
            "message": "User not found"
        }

    if request.password != user["password"]:

        return {
            "success": False,
            "message": "Invalid Password"
        }

    return {
        "success": True,
        "message": "Login Success",
        "user_id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "token": str(user["_id"])
    }