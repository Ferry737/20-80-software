from __future__ import annotations
from datetime import datetime
from typing import Sequence
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.goal import Goal

class GoalRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def list_by_user(self, user_id: int) -> Sequence[Goal]:
        stmt = select(Goal).where(Goal.user_id == user_id).order_by(Goal.created_at.desc())
        result = await self.db.execute(stmt)
        return result.scalars().all()

    async def create(self, goal: Goal) -> Goal:
        self.db.add(goal)
        await self.db.flush()
        return goal
