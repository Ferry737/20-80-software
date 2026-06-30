from datetime import datetime
from typing import Sequence
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.automation import AutomationRule

class AutomationRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def list_by_user(self, user_id: int) -> Sequence[AutomationRule]:
        stmt = select(AutomationRule).where(AutomationRule.user_id == user_id).order_by(AutomationRule.created_at.desc())
        result = await self.db.execute(stmt)
        return result.scalars().all()

    async def create(self, rule: AutomationRule) -> AutomationRule:
        self.db.add(rule)
        await self.db.flush()
        return rule

    async def update(self, rule_id: int, user_id: int, **kwargs) -> AutomationRule | None:
        stmt = select(AutomationRule).where(AutomationRule.id == rule_id, AutomationRule.user_id == user_id)
        result = await self.db.execute(stmt)
        rule = result.scalar_one_or_none()
        if not rule:
            return None
        for key, value in kwargs.items():
            setattr(rule, key, value)
        await self.db.flush()
        return rule
