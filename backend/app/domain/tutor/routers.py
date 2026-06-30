from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.domain.tutor.schemas import TutorDocumentCreate, TutorDocumentRead
from app.domain.tutor.services import TutorService
from app.models.tutor import TutorDocument

router = APIRouter(prefix="/tutor", tags=["tutor"])

@router.post("/documents", response_model=TutorDocumentRead)
async def create_document(data: TutorDocumentCreate, db: AsyncSession = Depends(get_db), user_id: int = 1):
    doc = TutorDocument(user_id=user_id, title=data.title, topic=data.topic, file_path="")
    doc = await TutorService(db).create_document(doc)
    await db.commit()
    return doc

@router.get("/documents", response_model=list[TutorDocumentRead])
async def list_documents(db: AsyncSession = Depends(get_db), user_id: int = 1):
    return await TutorService(db).list_documents(user_id)
