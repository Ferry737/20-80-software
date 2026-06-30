from app.domain.tutor.repositories import TutorRepository
from app.models.tutor import TutorDocument
from sqlalchemy.ext.asyncio import AsyncSession

class TutorService:
    def __init__(self, db: AsyncSession):
        self.repo = TutorRepository(db)

    async def list_documents(self, user_id: int):
        return await self.repo.list_by_user(user_id)

    async def create_document(self, doc: TutorDocument) -> TutorDocument:
        return await self.repo.create(doc)
