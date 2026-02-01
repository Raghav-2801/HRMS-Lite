# HRMS Lite - Employee Management System

A full-stack Human Resource Management System designed to streamline employee tracking and attendance management. Built with **FastAPI** for high-performance backend processing and **React** for a responsive, modern user interface.

## 🚀 Live Demo
- **Frontend:** [https://kapilraghav.info/HRMS-Lite](https://kapilraghav.info/HRMS-Lite)
- **Backend API:** [https://hrms-lite-api.onrender.com/docs](https://hrms-lite-api.onrender.com/docs)

---

## 🛠 Tech Stack

| Component | Technology | Reasoning |
|-----------|------------|-----------|
| **Backend** | Python (FastAPI) | Chosen for async capabilities, automatic Swagger documentation, and high performance compared to Django/Flask. |
| **Frontend** | React.js (Vite) | Utilized for component-based architecture and fast rendering speed. |
| **Database** | PostgreSQL | Robust relational database for structured employee and attendance data. |
| **ORM** | SQLAlchemy | Ensures secure SQL injection prevention and clean Pythonic database interactions. |
| **Deployment** | Render & GitHub Pages | CI/CD pipeline set up for automated deployment. |

---

## ✨ Key Features

### 1. Employee Management
- **Add Employees:** Validates unique Employee IDs (e.g., `EMP001`) and Email addresses to prevent duplicates.
- **View Directory:** Renders a clean, paginated list of all staff members.
- **Delete Records:** Secure deletion with confirmation prompts.

### 2. Attendance System
- **Daily Logging:** Mark employees as 'Present' or 'Absent' with date selection.
- **History Tracking:** Visual log of attendance records with status indicators (Green for Present, Red for Absent).
- **Data Integrity:** Dropdowns linked directly to the database ensure valid Employee selections.

---

## ⚙️ Installation & Setup

### Prerequisites
- Python 3.9+
- Node.js & npm
- PostgreSQL

### 1. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn main:app --reload
