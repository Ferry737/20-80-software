from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.domain.automation.services import AutomationService
from app.domain.automation.repositories import AutomationRepository
from app.models.automation import AutomationRule

router = APIRouter(prefix="/automation", tags=["automation"])

class AutomationRuleCreate(BaseModel):
    name: str
    trigger_type: str
    trigger_config: str = "{}"
    action_type: str
    action_config: str = "{}"

class AutomationRuleUpdate(BaseModel):
    name: str | None = None
    trigger_config: str | None = None
    action_config: str | None = None
    is_enabled: bool | None = None

@router.post("/rules")
async def create_rule(data: AutomationRuleCreate, db: AsyncSession = Depends(get_db), user_id: int = 1):
    rule = AutomationRule(user_id=user_id, name=data.name, trigger_type=data.trigger_type, trigger_config=data.trigger_config, action_type=data.action_type, action_config=data.action_config)
    rule = await AutomationService(db).create_rule(rule)
    await db.commit()
    return {"id": rule.id, "name": rule.name}

@router.get("/rules")
async def list_rules(db: AsyncSession = Depends(get_db), user_id: int = 1):
    rules = await AutomationService(db).list_rules(user_id)
    return [{"id": r.id, "name": r.name, "trigger_type": r.trigger_type, "action_type": r.action_type, "is_enabled": r.is_enabled} for r in rules]

@router.patch("/rules/{rule_id}")
async def update_rule(rule_id: int, data: AutomationRuleUpdate, db: AsyncSession = Depends(get_db), user_id: int = 1):
    rule = await AutomationService(db).update_rule(rule_id, user_id, **{k: v for k, v in data.model_dump().items() if v is not None})
    if not rule:
        raise HTTPException(status_code=404, detail="Rule not found")
    await db.commit()
    return {"id": rule.id, "name": rule.name, "is_enabled": rule.is_enabled}
