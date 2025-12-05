from pydantic import BaseModel
from datetime import date, datetime
from typing import Optional


class CampaignBase(BaseModel):
    name: str
    description: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    status: Optional[str] = "planned"


class CampaignCreate(CampaignBase):
    pass


class CampaignUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    status: Optional[str] = None


class CampaignRead(CampaignBase):
    id: int
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True
