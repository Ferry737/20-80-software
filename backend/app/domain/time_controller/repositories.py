from __future__ import annotations
from datetime import datetime
from typing import Sequence
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.focus import FocusSession, AppRestriction

class FocusRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def list_sessions(self, user_id: int) -> Sequence[FocusSession]:
        stmt = select(FocusSession).where(FocusSession.user_id == user_id).order_by(FocusSession.started_at.desc())
        result = await self.db.execute(stmt)
        return result.scalars().all()

    async def create_session(self, session: FocusSession) -> FocusSession:
        self.db.add(session)
        await self.db.flush()
        return session

    async def list_restrictions(self, user_id: int) -> Sequence[AppRestriction]:
        stmt = select(AppRestriction).where(AppRestriction.user_id == user_id)
        result = await self.db.execute(stmt)
        return result.scalars().all()

    async def create_restriction(self, restriction: AppRestriction) -> AppRestriction:
        self.db.add(restriction)
        await self.db.flush()
        return restriction
