from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..database import Base


class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)
    beach_id = Column(Integer, ForeignKey("beaches.id"), nullable=False, index=True)
    date_created = Column(DateTime(timezone=True), server_default=func.now(), index=True)
    alert_type = Column(String, nullable=False)  # e.g. "HIGH_RISK", "PERSISTENT_RISK"
    severity = Column(Integer, nullable=False, default=1)  # 1-3
    message = Column(Text, nullable=True)
    is_active = Column(Boolean, default=True)
    resolved_at = Column(DateTime(timezone=True), nullable=True)

    beach = relationship("Beach", backref="alerts")

