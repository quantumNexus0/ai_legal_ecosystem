
import sys
import os
import asyncio
from datetime import datetime, timedelta
from motor.motor_asyncio import AsyncIOMotorClient
from sqlalchemy.orm import Session
from sqlalchemy import text

# Add the current directory to sys.path to import app
sys.path.append(os.getcwd())

from app.db.session import SessionLocal, engine
from app.db.base import Base
from app.models import User, LawyerProfile, Case, Appointment
from app.core import security
from app.core.config import settings

LAWYERS_DATA = [
    {
        "email": "amit.sharma@example.com",
        "full_name": "Amit Sharma",
        "role": "lawyer",
        "password": "password123",
        "specialization": "Criminal Law",
        "experience_years": 12,
        "rating": 4.9,
        "cases_handled": 240,
        "phone": "+91 98765 43210",
        "office_address": "Chamber 42, High Court, New Delhi"
    },
    {
        "email": "priya.patel@example.com",
        "full_name": "Priya Patel",
        "role": "lawyer",
        "password": "password123",
        "specialization": "Corporate Law",
        "experience_years": 8,
        "rating": 4.7,
        "cases_handled": 110,
        "phone": "+91 91234 56789",
        "office_address": "Bandra Kurla Complex, Mumbai"
    },
    {
        "email": "rajesh.iyer@example.com",
        "full_name": "Rajesh Iyer",
        "role": "lawyer",
        "password": "password123",
        "specialization": "Family Law",
        "experience_years": 15,
        "rating": 4.8,
        "cases_handled": 300,
        "phone": "+91 99887 76655",
        "office_address": "Anna Salai, Chennai"
    },
    {
        "email": "sneha.reddy@example.com",
        "full_name": "Sneha Reddy",
        "role": "lawyer",
        "password": "password123",
        "specialization": "Intellectual Property",
        "experience_years": 6,
        "rating": 4.6,
        "cases_handled": 85,
        "phone": "+91 95555 44444",
        "office_address": "Jubilee Hills, Hyderabad"
    },
    {
        "email": "vikram.singh@example.com",
        "full_name": "Vikram Singh",
        "role": "lawyer",
        "password": "password123",
        "specialization": "Real Estate Law",
        "experience_years": 20,
        "rating": 5.0,
        "cases_handled": 500,
        "phone": "+91 90000 11111",
        "office_address": "MG Road, Bangalore"
    }
]

async def seed_mongodb():
    print("\n--- Seeding MongoDB Atlas ---")
    try:
        client = AsyncIOMotorClient(settings.MONGODB_URL, serverSelectionTimeoutMS=5000)
        db = client[settings.MONGODB_NAME]
        collection = db["lawyers"]
        
        # Clear existing
        await collection.delete_many({})
        
        # Insert
        mongo_data = []
        for l in LAWYERS_DATA:
            mongo_data.append({
                "full_name": l["full_name"],
                "email": l["email"],
                "specialization": l["specialization"],
                "experience_years": l["experience_years"],
                "rating": l["rating"],
                "cases_handled": l["cases_handled"],
                "office_address": l["office_address"],
                "phone": l["phone"],
                "created_at": datetime.utcnow()
            })
        
        if mongo_data:
            await collection.insert_many(mongo_data)
            print(f"Successfully seeded {len(mongo_data)} lawyers into MongoDB Atlas!")
    except Exception as e:
        print(f"Error seeding MongoDB: {e}")

def seed_sql():
    print("\n--- Seeding SQL Database (MySQL/SQLite) ---")
    db = SessionLocal()
    try:
        # Ensure tables exist
        Base.metadata.create_all(bind=engine)
        
        for l_data in LAWYERS_DATA:
            user = db.query(User).filter(User.email == l_data["email"]).first()
            if not user:
                print(f"Creating lawyer: {l_data['email']}")
                hashed_password = security.get_password_hash(l_data["password"])
                user = User(
                    email=l_data["email"],
                    hashed_password=hashed_password,
                    full_name=l_data["full_name"],
                    role="lawyer",
                    is_active=True,
                    phone=l_data["phone"]
                )
                db.add(user)
                db.commit()
                db.refresh(user)

                profile = db.query(LawyerProfile).filter(LawyerProfile.user_id == user.id).first()
                if not profile:
                    profile = LawyerProfile(
                        user_id=user.id,
                        specialization=l_data["specialization"],
                        experience_years=l_data["experience_years"],
                        rating=l_data["rating"],
                        cases_handled=l_data["cases_handled"],
                        office_address=l_data["office_address"],
                        is_approved=True
                    )
                    db.add(profile)
                    db.commit()
            else:
                print(f"Lawyer already exists: {l_data['email']}")
        
        print("SQL seeding completed successfully!")
    except Exception as e:
        print(f"Error seeding SQL: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    # Seed SQL synchronously
    seed_sql()
    
    # Seed MongoDB asynchronously
    asyncio.run(seed_mongodb())
