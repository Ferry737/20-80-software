from fastapi import FastAPI
from app.database import engine
from app.models import Base
from app.infrastructure.health import router as health_router
from app.domain.auth.routers import router as auth_router
from app.domain.time_controller.routers import router as time_router
from app.domain.progress_tracker.routers import router as progress_router
from app.domain.tutor.routers import router as tutor_router
from app.domain.automation.routers import router as automation_router

app = FastAPI(title="80/20 Software API", version="1.0.0")

app.include_router(health_router)
app.include_router(auth_router)
app.include_router(time_router)
app.include_router(progress_router)
app.include_router(tutor_router)
app.include_router(automation_router)


@app.on_event("startup")
async def on_startup() -> None:
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
