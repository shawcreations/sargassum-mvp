from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class AlertBase(BaseModel):
    beach_id: int
    alert_type: str  # e.g. "HIGH_RISK", "PERSISTENT_RISK"
    severity: int  # 1-3
    message: Optional[str] = None


class AlertCreate(AlertBase):
    pass


class AlertRead(AlertBase):
    id: int
    date_created: Optional[datetime] = None
    is_active: bool
    resolved_at: Optional[datetime] = None
    beach_name: Optional[str] = None

    class Config:
        from_attributes = True

