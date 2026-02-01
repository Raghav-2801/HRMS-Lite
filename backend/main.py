import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import models
from database import engine
from routers import employee, attendance

# Create the database tables automatically when the app starts
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="HRMS Lite API", version="1.0.0")

# --- CORS Configuration (Your Specific Setup) ---
frontend_url = os.getenv("FRONTEND_URL", "http://localhost:5173")

allowed_origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    frontend_url,
    "https://kapilraghav.info",
    "https://kapilraghav.info/HRMS-Lite",
    "https://hrms-lite-wf8i.onrender.com",  # Keep for testing
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, DELETE, etc.)
    allow_headers=["*"],  # Allows all headers
)

# --- Register Routers ---
app.include_router(employee.router)
app.include_router(attendance.router)

# --- Root Endpoint ---
@app.get("/")
def read_root():
    return {"message": "Welcome to HRMS Lite API. Visit /docs for Swagger UI."}
