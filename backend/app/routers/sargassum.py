from fastapi import APIRouter

router = APIRouter()

@router.get("/latest")
def get_latest_sargassum():
    return {
        "data": [
            {"lat": 13.15, "lng": -61.23, "density": "medium"},
            {"lat": 13.20, "lng": -61.18, "density": "high"}
        ]
    }

