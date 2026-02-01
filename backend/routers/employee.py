from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import crud, models, schemas
from database import get_db

router = APIRouter(
    prefix="/employees",
    tags=["employees"]
)

@router.post("/", response_model=schemas.Employee)
def create_employee(employee: schemas.EmployeeCreate, db: Session = Depends(get_db)):
    # Check 1: Duplicate Email
    if crud.get_employee_by_email(db, email=employee.email):
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Check 2: Duplicate Employee ID (EMP001)
    if crud.get_employee_by_emp_id(db, emp_id=employee.employee_id):
        raise HTTPException(status_code=400, detail="Employee ID already exists")

    return crud.create_employee(db=db, employee=employee)

@router.get("/", response_model=List[schemas.Employee])
def read_employees(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_employees(db, skip=skip, limit=limit)

@router.get("/{employee_id}", response_model=schemas.Employee)
def read_employee(employee_id: int, db: Session = Depends(get_db)):
    db_employee = crud.get_employee(db, employee_id=employee_id)
    if db_employee is None:
        raise HTTPException(status_code=404, detail="Employee not found")
    return db_employee

@router.delete("/{employee_id}", response_model=schemas.Employee)
def delete_employee(employee_id: int, db: Session = Depends(get_db)):
    db_employee = crud.get_employee(db, employee_id=employee_id)
    if db_employee is None:
        raise HTTPException(status_code=404, detail="Employee not found")
    return crud.delete_employee(db=db, employee_id=employee_id)
