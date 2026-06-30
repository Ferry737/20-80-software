from app.domain.progress_tracker.repositories import GoalRepository
from app.models.goal import Goal
from sqlalchemy.ext.asyncio import AsyncSession

class GoalService:
    def __init__(self, db: AsyncSession):
        self.repo = GoalRepository(db)

    async def list_goals(self, user_id: int):
        return await self.repo.list_by_user(user_id)

    async def create_goal(self, goal: Goal) -> Goal:
        return await self.repo.create(goal)
