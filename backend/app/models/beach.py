from sqlalchemy import Column, Integer, String, Float, DateTime, Text
from sqlalchemy.sql import func
from geoalchemy2 import Geometry
from ..database import Base


class Beach(Base):
    __tablename__ = "beaches"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    description = Column(Text)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    location = Column(Geometry(geometry_type='POINT', srid=4326))
    region = Column(String)
    country = Column(String, default="Saint Vincent and the Grenadines")
    risk_level = Column(String, default="low")  # low, medium, high, critical
    last_survey_date = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

