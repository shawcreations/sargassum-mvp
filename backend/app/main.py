from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import sargassum

app = FastAPI(title="Sargassum MVP API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "OK", "message": "Sargassum MVP API Running"}

app.include_router(sargassum.router, prefix="/sargassum")

