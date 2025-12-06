import random
from datetime import date, datetime, timedelta
from sqlalchemy.orm import Session
from ..models.beach import Beach
from ..models.beach_daily_risk import BeachDailyRisk
from ..models.alert import Alert


def generate_synthetic_risk(beach_id: int, target_date: date) -> dict:
    """
    Generate synthetic risk data for a beach.
    In production, this would fetch from satellite APIs.
    """
    # Simple heuristic: random risk with some beaches having higher tendency
    base_risk = random.random()
    
    # Some beaches have naturally higher risk (simulate based on ID)
    if beach_id % 3 == 0:
        base_risk += 0.2
    
    # Seasonal factor (higher in summer months)
    month = target_date.month
    if month in [6, 7, 8, 9]:
        base_risk += 0.15
    
    base_risk = min(base_risk, 1.0)
    
    # Convert to risk level
    if base_risk < 0.25:
        risk_level = 0  # none
    elif base_risk < 0.5:
        risk_level = 1  # low
    elif base_risk < 0.75:
        risk_level = 2  # medium
    else:
        risk_level = 3  # high
    
    return {
        "risk_level": risk_level,
        "raw_value": round(base_risk, 4),
        "confidence": round(0.7 + random.random() * 0.3, 2),
        "source": "SYNTHETIC_MVP"
    }


def update_beach_risk_for_date(db: Session, target_date: date) -> dict:
    """
    Update risk data for all beaches for a given date.
    For MVP, generates synthetic data.
    """
    beaches = db.query(Beach).all()
    
    updated = 0
    alerts_created = 0
    
    for beach in beaches:
        # Check if risk already exists for this date
        existing = db.query(BeachDailyRisk).filter(
            BeachDailyRisk.beach_id == beach.id,
            BeachDailyRisk.date == target_date
        ).first()
        
        risk_data = generate_synthetic_risk(beach.id, target_date)
        
        if existing:
            # Update existing
            existing.risk_level = risk_data["risk_level"]
            existing.raw_value = risk_data["raw_value"]
            existing.confidence = risk_data["confidence"]
            existing.source = risk_data["source"]
        else:
            # Create new
            new_risk = BeachDailyRisk(
                beach_id=beach.id,
                date=target_date,
                risk_level=risk_data["risk_level"],
                raw_value=risk_data["raw_value"],
                confidence=risk_data["confidence"],
                source=risk_data["source"]
            )
            db.add(new_risk)
        
        updated += 1
        
        # Create alert for high risk
        if risk_data["risk_level"] >= 3:
            # Check if alert already exists
            existing_alert = db.query(Alert).filter(
                Alert.beach_id == beach.id,
                Alert.alert_type == "HIGH_RISK",
                Alert.is_active == True
            ).first()
            
            if not existing_alert:
                alert = Alert(
                    beach_id=beach.id,
                    alert_type="HIGH_RISK",
                    severity=3,
                    message=f"High sargassum risk detected at {beach.name} on {target_date}",
                    is_active=True
                )
                db.add(alert)
                alerts_created += 1
    
    db.commit()
    
    return {
        "date": str(target_date),
        "beaches_updated": updated,
        "alerts_created": alerts_created
    }


def simulate_historical_data(db: Session, days: int = 14) -> dict:
    """
    Generate synthetic historical risk data for the past N days.
    """
    today = date.today()
    total_updated = 0
    total_alerts = 0
    
    for i in range(days):
        target_date = today - timedelta(days=i)
        result = update_beach_risk_for_date(db, target_date)
        total_updated += result["beaches_updated"]
        total_alerts += result["alerts_created"]
    
    return {
        "days_processed": days,
        "total_records_created": total_updated,
        "total_alerts_created": total_alerts
    }

