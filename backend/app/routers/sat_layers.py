from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..schemas.sat_layer import SatLayerRead
from ..models.sat_layer import SatLayer

router = APIRouter(tags=["Satellite Layers"])


@router.get("/sat-layers", response_model=List[SatLayerRead])
def get_sat_layers(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """
    Get list of available satellite layers.
    """
    layers = db.query(SatLayer).order_by(SatLayer.date.desc()).offset(skip).limit(limit).all()
    return layers

