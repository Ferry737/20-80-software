from datetime import datetime
from pydantic import BaseModel, Field

class FocusSessionCreate(BaseModel):
    mode: str = "deep_focus"
    notes: str | None = None

class FocusSessionRead(BaseModel):
    id: int
    mode: str
    started_at: datetime
    ended_at: datetime | None = None
    focus_minutes: int
    distraction_minutes: int
    notes: str | None = None
    model_config = {"from_attributes": True}

class AppRestrictionCreate(BaseModel):
    app_name: str
    package_id: str | None = None
    daily_limit_minutes: int = Field(default=30, ge=1)
    context_tag: str | None = None

class AppRestrictionRead(BaseModel):
    id: int
    app_name: str
    package_id: str | None
    daily_limit_minutes: int
    is_blocked: bool
    context_tag: str | None
    model_config = {"from_attributes": True}
