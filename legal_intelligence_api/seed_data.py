import sys
import os

# Add the current directory to sys.path to import app
sys.path.append(os.getcwd())

from sqlalchemy.orm import Session
from app.db.session import engine, SessionLocal
from app.db.base_class import Base
from datetime import datetime, timedelta
from app.models import User, LawyerProfile, Case, Appointment
from app.core import security

def seed_users():
    # Ensure tables exist
    print("Ensuring tables exist...")
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        users_data = [
            {
                "email": "admin@example.com",
                "full_name": "Admin User",
                "role": "admin",
                "password": "password123"
            },
            {
                "email": "lawyer@example.com",
                "full_name": "John Doe",
                "role": "lawyer",
                "password": "password123",
                "specialization": "Corporate Law",
                "experience_years": 10,
                "rating": 4.8,
                "cases_handled": 150
            },
            {
                "email": "user@example.com",
                "full_name": "Jane Smith",
                "role": "user",
                "password": "password123"
            }
        ]

        created_users = {}
        for user_data in users_data:
            user = db.query(User).filter(User.email == user_data["email"]).first()
            if not user:
                print(f"Creating user: {user_data['email']}")
                hashed_password = security.get_password_hash(user_data["password"])
                user = User(
                    email=user_data["email"],
                    hashed_password=hashed_password,
                    full_name=user_data["full_name"],
                    role=user_data["role"],
                    is_active=True
                )
                db.add(user)
                db.commit()
                db.refresh(user)

                if user_data["role"] == "lawyer":
                    profile = LawyerProfile(
                        user_id=user.id,
                        specialization=user_data.get("specialization"),
                        experience_years=user_data.get("experience_years"),
                        rating=user_data.get("rating", 0.0),
                        cases_handled=user_data.get("cases_handled", 0)
                    )
                    db.add(profile)
                    db.commit()
            created_users[user_data["role"]] = user

        # Seed Cases
        print("Seeding cases...")
        lawyer = created_users.get("lawyer")
        client = created_users.get("user")
        
        if lawyer and client:
            case1 = db.query(Case).filter(Case.title == "Corporate Merger A").first()
            if not case1:
                case1 = Case(
                    title="Corporate Merger A",
                    case_type="Corporate",
                    description="Handling the merger between Tech Solutions and Global Innovations.",
                    status="active",
                    next_hearing=datetime.now() + timedelta(days=7),
                    lawyer_id=lawyer.id,
                    client_id=client.id
                )
                db.add(case1)
            
            case2 = db.query(Case).filter(Case.title == "Property Dispute B").first()
            if not case2:
                case2 = Case(
                    title="Property Dispute B",
                    case_type="Civil",
                    description="Residential property title dispute in downtown area.",
                    status="active",
                    next_hearing=datetime.now() + timedelta(days=14),
                    lawyer_id=lawyer.id,
                    client_id=client.id
                )
                db.add(case2)
            
            # Seed Appointments
            print("Seeding appointments...")
            app1 = db.query(Appointment).filter(Appointment.title == "Initial Consultation").first()
            if not app1:
                app1 = Appointment(
                    title="Initial Consultation",
                    appointment_type="Consultation",
                    lawyer_id=lawyer.id,
                    client_id=client.id,
                    appointment_time=datetime.now() + timedelta(days=1, hours=10),
                    status="scheduled",
                    description="Discussing the strategy for property dispute."
                )
                db.add(app1)
            
            db.commit()

        print("Seeding completed successfully!")

    except Exception as e:
        print(f"Error seeding data: {e}")
        import traceback
        traceback.print_exc()
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_users()
