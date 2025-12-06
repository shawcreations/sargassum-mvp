from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import init_db
from .routers import (
    auth_router,
    beaches_router, 
    campaigns_router,
    tasks_router,
    ai_router,
    risk_router,
    sat_layers_router
)

app = FastAPI(title="Sargassum MVP API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup_event():
    """Initialize database on startup."""
    init_db()


@app.get("/")
def root():
    return {"status": "OK", "message": "Sargassum MVP API Running"}


# Include routers with /api prefix
app.include_router(auth_router, prefix="/api")
app.include_router(beaches_router, prefix="/api")
app.include_router(campaigns_router, prefix="/api")
app.include_router(tasks_router, prefix="/api")
app.include_router(ai_router, prefix="/api")
app.include_router(risk_router, prefix="/api")
app.include_router(sat_layers_router, prefix="/api")
