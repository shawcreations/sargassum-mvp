from pydantic import BaseModel
from datetime import date, datetime
from typing import Optional, Any


class SatLayerBase(BaseModel):
    source: str
    date: date
    description: Optional[str] = None
    data_type: Optional[str] = None
    url_or_path: Optional[str] = None
    metadata_json: Optional[Any] = None


class SatLayerCreate(SatLayerBase):
    pass


class SatLayerRead(SatLayerBase):
    id: int
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True

