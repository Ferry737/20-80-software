from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.domain.auth.schemas import UserCreate, UserRead, Token
from app.domain.auth.models import User
from app.models import Base
from sqlalchemy import select

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register", response_model=UserRead)
async def register(data: UserCreate, db: AsyncSession = Depends(get_db)):
    user = User(email=data.email, hashed_password=data.password, full_name=data.full_name)
    db.add(user)
    await db.flush()
    return user

@router.post("/login", response_model=Token)
async def login(data: UserCreate, db: AsyncSession = Depends(get_db)):
    stmt = select(User).where(User.email == data.email)
    result = await db.execute(stmt)
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    return {"access_token": "mock-jwt-token", "token_type": "bearer"}
