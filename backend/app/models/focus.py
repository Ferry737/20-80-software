from __future__ import annotations

from datetime import datetime

from sqlalchemy import Boolean, DateTime, ForeignKey, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class FocusSession(Base):
    __tablename__ = "focus_sessions"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    started_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    ended_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    mode: Mapped[str] = mapped_column(String(50), default="deep_focus")
    distraction_minutes: Mapped[int] = mapped_column(Integer, default=0)
    focus_minutes: Mapped[int] = mapped_column(Integer, default=0)
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)

    user = relationship("User", back_populates="focus_sessions")


class AppRestriction(Base):
    __tablename__ = "app_restrictions"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    app_name: Mapped[str] = mapped_column(String(100))
    package_id: Mapped[str | None] = mapped_column(String(255), nullable=True)
    daily_limit_minutes: Mapped[int] = mapped_column(Integer, default=30)
    is_blocked: Mapped[bool] = mapped_column(Boolean, default=False)
    context_tag: Mapped[str | None] = mapped_column(String(100), nullable=True)

    user = relationship("User", back_populates="app_restrictions")
