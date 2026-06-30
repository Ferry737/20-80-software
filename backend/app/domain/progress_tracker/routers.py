from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.domain.progress_tracker.schemas import GoalCreate, GoalRead
from app.domain.progress_tracker.services import GoalService
from app.models.goal import Goal

router = APIRouter(prefix="/goals", tags=["progress-tracker"])

def _build_goal_from_create(data: GoalCreate, user_id: int) -> Goal:
    return Goal(
        user_id=user_id,
        title=data.title,
        category=data.category,
        target_value=data.target_value,
        unit=data.unit,
        deadline=data.deadline,
    )

@router.post("/", response_model=GoalRead)
async def create_goal(data: GoalCreate, db: AsyncSession = Depends(get_db), user_id: int = 1):
    goal = await GoalService(db).create_goal(_build_goal_from_create(data, user_id))
    await db.commit()
    return goal

@router.get("/", response_model=list[GoalRead])
async def list_goals(db: AsyncSession = Depends(get_db), user_id: int = 1):
    return await GoalService(db).list_goals(user_id)
