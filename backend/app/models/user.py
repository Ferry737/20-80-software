from __future__ import annotations

from datetime import datetime

from sqlalchemy import Boolean, DateTime, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    hashed_password: Mapped[str] = mapped_column(String(255))
    full_name: Mapped[str | None] = mapped_column(String(255), nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    focus_sessions = relationship("FocusSession", back_populates="user")
    goals = relationship("Goal", back_populates="user")
    tutor_documents = relationship("TutorDocument", back_populates="user")
    automation_rules = relationship("AutomationRule", back_populates="user")
    app_restrictions = relationship("AppRestriction", back_populates="user")
