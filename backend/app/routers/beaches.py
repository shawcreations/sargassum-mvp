from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..database import get_db
from ..schemas.beach import BeachCreate, BeachUpdate, BeachResponse
from ..models.beach import Beach

router = APIRouter(prefix="/beaches", tags=["Beaches"])


@router.get("/", response_model=List[BeachResponse])
def get_beaches(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    beaches = db.query(Beach).offset(skip).limit(limit).all()
    return beaches


@router.get("/{beach_id}", response_model=BeachResponse)
def get_beach(beach_id: int, db: Session = Depends(get_db)):
    beach = db.query(Beach).filter(Beach.id == beach_id).first()
    if not beach:
        raise HTTPException(status_code=404, detail="Beach not found")
    return beach


@router.post("/", response_model=BeachResponse, status_code=status.HTTP_201_CREATED)
def create_beach(beach: BeachCreate, db: Session = Depends(get_db)):
    db_beach = Beach(**beach.model_dump())
    db.add(db_beach)
    db.commit()
    db.refresh(db_beach)
    return db_beach


@router.put("/{beach_id}", response_model=BeachResponse)
def update_beach(beach_id: int, beach: BeachUpdate, db: Session = Depends(get_db)):
    db_beach = db.query(Beach).filter(Beach.id == beach_id).first()
    if not db_beach:
        raise HTTPException(status_code=404, detail="Beach not found")
    
    update_data = beach.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_beach, key, value)
    
    db.commit()
    db.refresh(db_beach)
    return db_beach


@router.delete("/{beach_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_beach(beach_id: int, db: Session = Depends(get_db)):
    db_beach = db.query(Beach).filter(Beach.id == beach_id).first()
    if not db_beach:
        raise HTTPException(status_code=404, detail="Beach not found")
    
    db.delete(db_beach)
    db.commit()
    return None

