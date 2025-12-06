from typing import List, Optional
from datetime import date, timedelta
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from ..database import get_db
from ..schemas.beach_risk import BeachRiskHistory, RiskDataPoint, HighRiskBeach
from ..schemas.alert import AlertRead
from ..services.risk_helpers import (
    get_high_risk_beaches_for_date,
    get_beach_risk_timeseries,
    get_recent_alerts,
    get_risk_summary
)
from ..services.risk_ingestion import update_beach_risk_for_date, simulate_historical_data

router = APIRouter(tags=["Risk"])


@router.get("/risk/beach/{beach_id}", response_model=BeachRiskHistory)
def get_beach_risk_history(
    beach_id: int,
    start_date: Optional[date] = Query(None, description="Start date for history"),
    end_date: Optional[date] = Query(None, description="End date for history"),
    db: Session = Depends(get_db)
):
    """
    Get risk history for a specific beach.
    Defaults to last 14 days if no dates provided.
    """
    if not end_date:
        end_date = date.today()
    if not start_date:
        start_date = end_date - timedelta(days=14)
    
    data = get_beach_risk_timeseries(db, beach_id, start_date, end_date)
    
    return BeachRiskHistory(
        beach_id=beach_id,
        data=[RiskDataPoint(**d) for d in data]
    )


@router.get("/risk/high")
def get_high_risk_beaches(
    target_date: Optional[date] = Query(None, description="Date to check (defaults to today)"),
    min_risk_level: int = Query(2, description="Minimum risk level (0-3)"),
    db: Session = Depends(get_db)
):
    """
    Get beaches with risk level >= threshold for a given date.
    """
    if not target_date:
        target_date = date.today()
    
    beaches = get_high_risk_beaches_for_date(db, target_date, min_risk_level)
    
    return {
        "date": str(target_date),
        "min_risk_level": min_risk_level,
        "count": len(beaches),
        "beaches": beaches
    }


@router.get("/risk/summary")
def get_risk_overview(
    target_date: Optional[date] = Query(None),
    db: Session = Depends(get_db)
):
    """
    Get summary of risk levels across all beaches.
    """
    return get_risk_summary(db, target_date)


@router.get("/alerts")
def list_alerts(
    limit: int = Query(20, le=100),
    active_only: bool = Query(True),
    db: Session = Depends(get_db)
):
    """
    Get recent alerts.
    """
    alerts = get_recent_alerts(db, limit, active_only)
    return {
        "count": len(alerts),
        "alerts": alerts
    }


@router.post("/risk/simulate-ingestion")
def simulate_risk_ingestion(
    days: int = Query(14, le=30, description="Number of days to simulate"),
    db: Session = Depends(get_db)
):
    """
    DEV ONLY: Generate synthetic risk data for testing.
    Simulates satellite data ingestion for the past N days.
    """
    result = simulate_historical_data(db, days)
    return {
        "status": "success",
        "message": f"Simulated {days} days of risk data",
        **result
    }


@router.post("/risk/update-today")
def update_today_risk(db: Session = Depends(get_db)):
    """
    DEV ONLY: Update risk data for today.
    """
    result = update_beach_risk_for_date(db, date.today())
    return {
        "status": "success",
        **result
    }

