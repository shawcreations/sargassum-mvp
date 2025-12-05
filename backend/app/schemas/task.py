from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    priority: Optional[str] = "medium"
    campaign_id: Optional[int] = None
    due_date: Optional[datetime] = None


class TaskCreate(TaskBase):
    pass


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    priority: Optional[str] = None
    campaign_id: Optional[int] = None
    assigned_to: Optional[int] = None
    due_date: Optional[datetime] = None


class TaskResponse(TaskBase):
    id: int
    status: str
    assigned_to: Optional[int] = None
    created_at: datetime

    class Config:
        from_attributes = True

