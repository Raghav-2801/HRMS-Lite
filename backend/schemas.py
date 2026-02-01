from pydantic import BaseModel, EmailStr
from datetime import date
from typing import List, Optional

# --- Attendance Schemas ---
class AttendanceBase(BaseModel):
    date: date
    status: str

class AttendanceCreate(AttendanceBase):
    employee_id: str # Links to the DB Internal ID

class Attendance(AttendanceBase):
    id: int
    employee_id: str

    class Config:
        from_attributes = True

# --- Employee Schemas ---
class EmployeeBase(BaseModel):
    employee_id: str  # The Custom String ID (e.g., "EMP01")
    full_name: str
    email: EmailStr
    department: str

class EmployeeCreate(EmployeeBase):
    pass 

class Employee(EmployeeBase):
    id: int # The Database PK
    attendance_records: List[Attendance] = []

    class Config:
        from_attributes = True
