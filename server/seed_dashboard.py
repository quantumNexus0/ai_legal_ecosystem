import sys
import os
from datetime import datetime, timedelta

# Add the current directory to sys.path to import app
sys.path.append(os.getcwd())

from app.db.session import SessionLocal
from app.db.base import Base
from app.models import User
from app.models import Case
from app.models import Appointment
from app.models import LawyerRequest

def seed_dashboard_data():
    db = SessionLocal()
    try:
        # Find our seeded users
        lawyer = db.query(User).filter(User.email == "lawyer@example.com").first()
        user = db.query(User).filter(User.email == "user@example.com").first()
        admin = db.query(User).filter(User.email == "admin@example.com").first()

        if not lawyer or not user:
            print("Seeded users not found. Run seed_data.py first.")
            return

        # Add Cases
        cases = [
            {"title": "Corporate Restructuring", "description": "Helping XYZ Corp with merger.", "status": "active"},
            {"title": "Property Dispute", "description": "Residential property case in Mumbai.", "status": "active"},
            {"title": "Service Agreement", "description": "Drafting contracts for a tech startup.", "status": "closed"},
        ]

        for case_data in cases:
            existing = db.query(Case).filter(Case.title == case_data["title"]).first()
            if not existing:
                case = Case(
                    title=case_data["title"],
                    description=case_data["description"],
                    status=case_data["status"],
                    lawyer_id=lawyer.id,
                    client_id=user.id
                )
                db.add(case)
        
        # Add Appointments
        appointments = [
            {"time": datetime.now() + timedelta(hours=2), "description": "Initial consultation"},
            {"time": datetime.now() + timedelta(days=1, hours=10), "description": "Case review"},
        ]

        for appt_data in appointments:
            appt = Appointment(
                lawyer_id=lawyer.id,
                client_id=user.id,
                appointment_time=appt_data["time"],
                description=appt_data["description"]
            )
            db.add(appt)

        # Add Lawyer Requests
        requests = [
            {"message": "I need help with a divorce case.", "status": "pending"},
            {"message": "Can you review my business contract?", "status": "pending"},
        ]

        for req_data in requests:
            req = LawyerRequest(
                user_id=user.id,
                lawyer_id=lawyer.id,
                message=req_data["message"],
                status=req_data["status"]
            )
            db.add(req)

        db.commit()
        print("Dashboard data seeded successfully!")

    except Exception as e:
        print(f"Error seeding dashboard data: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_dashboard_data()
