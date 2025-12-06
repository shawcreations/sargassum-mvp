from sqlalchemy import Column, Integer, String, Date, Text, DateTime, JSON
from sqlalchemy.sql import func
from ..database import Base


class SatLayer(Base):
    __tablename__ = "sat_layers"

    id = Column(Integer, primary_key=True, index=True)
    source = Column(String, nullable=False, index=True)  # e.g. "NOAA_SIR", "USF_SAWS"
    date = Column(Date, nullable=False, index=True)
    description = Column(Text, nullable=True)
    data_type = Column(String, nullable=True)  # e.g. "risk_raster", "density_map"
    url_or_path = Column(Text, nullable=True)
    metadata_json = Column(JSON, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

