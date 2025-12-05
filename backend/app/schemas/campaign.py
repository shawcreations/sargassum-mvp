from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class CampaignBase(BaseModel):
    name: str
    description: Optional[str] = None
    beach_id: Optional[int] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    volunteers_needed: Optional[int] = 0


class CampaignCreate(CampaignBase):
    pass


class CampaignUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    beach_id: Optional[int] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    volunteers_needed: Optional[int] = None
    volunteers_registered: Optional[int] = None


class CampaignResponse(CampaignBase):
    id: int
    status: str
    coordinator_id: Optional[int] = None
    volunteers_registered: int
    created_at: datetime

    class Config:
        from_attributes = True

