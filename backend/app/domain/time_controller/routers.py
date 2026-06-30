from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.domain.time_controller.schemas import FocusSessionCreate, FocusSessionRead, AppRestrictionCreate, AppRestrictionRead
from app.domain.time_controller.services import TimeControllerService
from app.models.focus import FocusSession, AppRestriction

router = APIRouter(prefix="/time", tags=["time-controller"])

@router.post("/sessions", response_model=FocusSessionRead)
async def create_session(data: FocusSessionCreate, db: AsyncSession = Depends(get_db), user_id: int = 1):
    session = FocusSession(user_id=user_id, mode=data.mode, notes=data.notes)
    session = await TimeControllerService(db).create_session(session)
    await db.commit()
    return session

@router.get("/sessions", response_model=list[FocusSessionRead])
async def list_sessions(db: AsyncSession = Depends(get_db), user_id: int = 1):
    return await TimeControllerService(db).list_sessions(user_id)

@router.post("/restrictions", response_model=AppRestrictionRead)
async def create_restriction(data: AppRestrictionCreate, db: AsyncSession = Depends(get_db), user_id: int = 1):
    restriction = AppRestriction(user_id=user_id, app_name=data.app_name, package_id=data.package_id, daily_limit_minutes=data.daily_limit_minutes, context_tag=data.context_tag)
    restriction = await TimeControllerService(db).create_restriction(restriction)
    await db.commit()
    return restriction

@router.get("/restrictions", response_model=list[AppRestrictionRead])
async def list_restrictions(db: AsyncSession = Depends(get_db), user_id: int = 1):
    return await TimeControllerService(db).list_restrictions(user_id)
