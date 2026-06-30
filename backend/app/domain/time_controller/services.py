from app.domain.time_controller.repositories import FocusRepository
from app.models.focus import FocusSession, AppRestriction
from sqlalchemy.ext.asyncio import AsyncSession

class TimeControllerService:
    def __init__(self, db: AsyncSession):
        self.repo = FocusRepository(db)

    async def list_sessions(self, user_id: int):
        return await self.repo.list_sessions(user_id)

    async def create_session(self, session: FocusSession) -> FocusSession:
        return await self.repo.create_session(session)

    async def list_restrictions(self, user_id: int):
        return await self.repo.list_restrictions(user_id)

    async def create_restriction(self, restriction: AppRestriction) -> AppRestriction:
        return await self.repo.create_restriction(restriction)
