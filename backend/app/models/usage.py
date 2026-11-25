from pydantic import BaseModel

class UsageLog(BaseModel):
    user_id: str
    prompt_tokens: int
    completion_tokens: int
    total_tokens: int