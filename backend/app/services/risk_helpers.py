from datetime import date, timedelta
from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import desc
from ..models.beach import Beach
from ..models.beach_daily_risk import BeachDailyRisk
from ..models.alert import Alert


def get_high_risk_beaches_for_date(db: Session, target_date: date, min_risk_level: int = 2) -> List[dict]:
    """
    Get beaches with risk >= min_risk_level for a given date.
    """
    results = db.query(BeachDailyRisk, Beach).join(
        Beach, BeachDailyRisk.beach_id == Beach.id
    ).filter(
        BeachDailyRisk.date == target_date,
        BeachDailyRisk.risk_level >= min_risk_level
    ).order_by(desc(BeachDailyRisk.risk_level)).all()
    
    return [
        {
            "beach_id": risk.beach_id,
            "beach_name": beach.name,
            "risk_level": risk.risk_level,
            "date": str(risk.date),
            "source": risk.source,
            "raw_value": float(risk.raw_value) if risk.raw_value else None,
            "confidence": float(risk.confidence) if risk.confidence else None
        }
        for risk, beach in results
    ]


def get_beach_risk_timeseries(
    db: Session, 
    beach_id: int, 
    start_date: date, 
    end_date: date
) -> List[dict]:
    """
    Get risk history for a beach between start and end date.
    """
    results = db.query(BeachDailyRisk).filter(
        BeachDailyRisk.beach_id == beach_id,
        BeachDailyRisk.date >= start_date,
        BeachDailyRisk.date <= end_date
    ).order_by(BeachDailyRisk.date).all()
    
    return [
        {
            "date": str(r.date),
            "risk_level": r.risk_level,
            "source": r.source
        }
        for r in results
    ]


def get_recent_alerts(db: Session, limit: int = 20, active_only: bool = True) -> List[dict]:
    """
    Get recent alerts, optionally filtered to active only.
    """
    query = db.query(Alert, Beach).join(Beach, Alert.beach_id == Beach.id)
    
    if active_only:
        query = query.filter(Alert.is_active == True)
    
    results = query.order_by(desc(Alert.date_created)).limit(limit).all()
    
    return [
        {
            "id": alert.id,
            "beach_id": alert.beach_id,
            "beach_name": beach.name,
            "alert_type": alert.alert_type,
            "severity": alert.severity,
            "message": alert.message,
            "date_created": alert.date_created.isoformat() if alert.date_created else None,
            "is_active": alert.is_active
        }
        for alert, beach in results
    ]


def get_risk_summary(db: Session, target_date: Optional[date] = None) -> dict:
    """
    Get summary of risk levels for a date.
    """
    if not target_date:
        target_date = date.today()
    
    risks = db.query(BeachDailyRisk).filter(
        BeachDailyRisk.date == target_date
    ).all()
    
    summary = {
        "date": str(target_date),
        "total_beaches": len(risks),
        "high_risk": sum(1 for r in risks if r.risk_level == 3),
        "medium_risk": sum(1 for r in risks if r.risk_level == 2),
        "low_risk": sum(1 for r in risks if r.risk_level == 1),
        "no_risk": sum(1 for r in risks if r.risk_level == 0)
    }
    
    # Get active alerts count
    active_alerts = db.query(Alert).filter(Alert.is_active == True).count()
    summary["active_alerts"] = active_alerts
    
    return summary

