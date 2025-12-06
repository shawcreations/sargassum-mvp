from sqlalchemy import Column, Integer, String, Date, Numeric, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..database import Base


class BeachDailyRisk(Base):
    __tablename__ = "beach_daily_risks"

    id = Column(Integer, primary_key=True, index=True)
    beach_id = Column(Integer, ForeignKey("beaches.id"), nullable=False, index=True)
    date = Column(Date, nullable=False, index=True)
    risk_level = Column(Integer, nullable=False, default=0)  # 0=none, 1=low, 2=medium, 3=high
    source = Column(String, nullable=True)  # e.g. "NOAA_SIR"
    raw_value = Column(Numeric(10, 4), nullable=True)
    confidence = Column(Numeric(3, 2), nullable=True)  # 0-1
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    beach = relationship("Beach", backref="daily_risks")

