from sqlalchemy import Column, Integer, String, Text, Date, Numeric, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..database import Base


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    campaign_id = Column(Integer, ForeignKey("campaigns.id"), nullable=True)
    beach_id = Column(Integer, ForeignKey("beaches.id"), nullable=True)
    scheduled_date = Column(Date, nullable=True)
    status = Column(String, default="planned")  # planned, in_progress, completed
    assigned_crew = Column(String, nullable=True)
    estimated_volume_tons = Column(Numeric(10, 2), nullable=True)
    actual_volume_tons = Column(Numeric(10, 2), nullable=True)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    campaign = relationship("Campaign", backref="tasks")
    beach = relationship("Beach", backref="tasks")
