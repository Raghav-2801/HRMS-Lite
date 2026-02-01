from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import crud, schemas
from database import get_db

router = APIRouter(
    prefix="/attendance",
    tags=["attendance"]
)

@router.post("/", response_model=schemas.Attendance)
def create_attendance_record(attendance: schemas.AttendanceCreate, db: Session = Depends(get_db)):
    return crud.create_attendance(db=db, attendance=attendance)

@router.get("/", response_model=List[schemas.Attendance])
def read_attendance_records(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    attendance_records = crud.get_attendance_records(db, skip=skip, limit=limit)
    return attendance_records
