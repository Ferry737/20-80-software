from app.domain.automation.repositories import AutomationRepository
from app.models.automation import AutomationRule
from sqlalchemy.ext.asyncio import AsyncSession

class AutomationService:
    def __init__(self, db: AsyncSession):
        self.repo = AutomationRepository(db)

    async def list_rules(self, user_id: int):
        return await self.repo.list_by_user(user_id)

    async def create_rule(self, rule: AutomationRule) -> AutomationRule:
        return await self.repo.create(rule)

    async def update_rule(self, rule_id: int, user_id: int, **kwargs):
        return await self.repo.update(rule_id, user_id, **kwargs)
