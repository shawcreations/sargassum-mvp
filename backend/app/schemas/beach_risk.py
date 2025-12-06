from pydantic import BaseModel
from datetime import date, datetime
from typing import Optional, List
from decimal import Decimal


class BeachDailyRiskBase(BaseModel):
    beach_id: int
    date: date
    risk_level: int  # 0=none, 1=low, 2=medium, 3=high
    source: Optional[str] = None
    raw_value: Optional[Decimal] = None
    confidence: Optional[Decimal] = None


class BeachDailyRiskCreate(BeachDailyRiskBase):
    pass


class BeachDailyRiskRead(BeachDailyRiskBase):
    id: int
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class RiskDataPoint(BaseModel):
    date: date
    risk_level: int
    source: Optional[str] = None


class BeachRiskHistory(BaseModel):
    beach_id: int
    data: List[RiskDataPoint]


class HighRiskBeach(BaseModel):
    beach_id: int
    beach_name: str
    risk_level: int
    date: date
    source: Optional[str] = None

