from __future__ import annotations
from datetime import datetime
from typing import Sequence
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.tutor import TutorDocument

class TutorRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def list_by_user(self, user_id: int) -> Sequence[TutorDocument]:
        stmt = select(TutorDocument).where(TutorDocument.user_id == user_id).order_by(TutorDocument.created_at.desc())
        result = await self.db.execute(stmt)
        return result.scalars().all()

    async def create(self, doc: TutorDocument) -> TutorDocument:
        self.db.add(doc)
        await self.db.flush()
        return doc
