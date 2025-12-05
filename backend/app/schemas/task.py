from pydantic import BaseModel
from datetime import date, datetime
from typing import Optional
from decimal import Decimal


class TaskBase(BaseModel):
    campaign_id: Optional[int] = None
    beach_id: Optional[int] = None
    scheduled_date: Optional[date] = None
    status: Optional[str] = "planned"
    assigned_crew: Optional[str] = None
    estimated_volume_tons: Optional[Decimal] = None
    actual_volume_tons: Optional[Decimal] = None
    notes: Optional[str] = None


class TaskCreate(TaskBase):
    pass


class TaskUpdate(BaseModel):
    campaign_id: Optional[int] = None
    beach_id: Optional[int] = None
    scheduled_date: Optional[date] = None
    status: Optional[str] = None
    assigned_crew: Optional[str] = None
    estimated_volume_tons: Optional[Decimal] = None
    actual_volume_tons: Optional[Decimal] = None
    notes: Optional[str] = None


class TaskRead(TaskBase):
    id: int
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True
