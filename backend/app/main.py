from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .routers import auth_router, beaches_router, campaigns_router, tasks_router, ai_router

app = FastAPI(
    title=settings.APP_NAME,
    description="API for Sargassum monitoring and cleanup management - Vincy GreenRoots",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "status": "OK",
        "message": "Sargassum MVP API Running"
    }


@app.get("/health")
def health_check():
    return {"status": "healthy"}


# Include routers with /api prefix
app.include_router(auth_router, prefix="/api")
app.include_router(beaches_router, prefix="/api")
app.include_router(campaigns_router, prefix="/api")
app.include_router(tasks_router, prefix="/api")
app.include_router(ai_router, prefix="/api")
