from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class BeachBase(BaseModel):
    name: str
    description: Optional[str] = None
    latitude: float
    longitude: float
    region: Optional[str] = None
    country: Optional[str] = "Saint Vincent and the Grenadines"
    risk_level: Optional[str] = "low"


class BeachCreate(BeachBase):
    pass


class BeachUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    region: Optional[str] = None
    risk_level: Optional[str] = None


class BeachResponse(BeachBase):
    id: int
    last_survey_date: Optional[datetime] = None
    created_at: datetime

    class Config:
        from_attributes = True

