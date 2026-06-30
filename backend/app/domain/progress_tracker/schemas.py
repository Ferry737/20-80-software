from datetime import date, datetime
from pydantic import BaseModel, Field

class GoalCreate(BaseModel):
    title: str
    category: str = "productivity"
    target_value: int = Field(ge=1)
    unit: str = "minutes"
    deadline: date | None = None

class GoalRead(BaseModel):
    id: int
    title: str
    category: str
    target_value: int
    current_value: int
    unit: str
    deadline: date | None
    created_at: datetime
    model_config = {"from_attributes": True}

class ProductivityScore(BaseModel):
    score: float
    focus_ratio: float
    goals_completed: int
    goals_total: int
