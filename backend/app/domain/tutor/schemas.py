from datetime import datetime
from pydantic import BaseModel

class TutorDocumentCreate(BaseModel):
    title: str
    topic: str

class TutorDocumentRead(BaseModel):
    id: int
    title: str
    topic: str
    summary: str | None
    created_at: datetime
    model_config = {"from_attributes": True}

class TutorMessage(BaseModel):
    message: str
    document_ids: list[int] = []
    difficulty: str = "medium"

class TutorResponse(BaseModel):
    reply: str
    follow_up_questions: list[str] = []
