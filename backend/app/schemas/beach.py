from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class BeachBase(BaseModel):
    name: str
    island: Optional[str] = None
    latitude: float
    longitude: float
    tourism_importance: Optional[int] = 0
    notes: Optional[str] = None


class BeachCreate(BeachBase):
    pass


class BeachUpdate(BaseModel):
    name: Optional[str] = None
    island: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    tourism_importance: Optional[int] = None
    notes: Optional[str] = None


class BeachRead(BeachBase):
    id: int
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True
