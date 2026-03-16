"""
Seed the SQLite database with all required data so the project
runs without XAMPP/MySQL.
"""
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

# Force SQLite
os.environ["DATABASE_URL"] = "sqlite:///./legal_services.db"

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.db.base_class import Base
from app.models import User, LawyerProfile, Case, Appointment
from app.core import security
from datetime import datetime, timedelta

DB_PATH = os.path.join(os.path.dirname(__file__), "..", "legal_services.db")
engine = create_engine(f"sqlite:///{DB_PATH}", connect_args={"check_same_thread": False})

# Recreate all tables
print("Dropping and recreating all tables in SQLite...")
Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)

Session = sessionmaker(bind=engine)
db = Session()

try:
    # 1. Create Users
    print("Creating users...")
    admin = User(
        email="admin@example.com",
        hashed_password=security.get_password_hash("password123"),
        full_name="Admin User",
        role="admin",
        is_active=True
    )
    lawyer = User(
        email="lawyer@example.com",
        hashed_password=security.get_password_hash("password123"),
        full_name="John Doe",
        role="lawyer",
        is_active=True,
        phone="+91-9876543210"
    )
    lawyer2 = User(
        email="vipulyadav503@gmail.com",
        hashed_password=security.get_password_hash("password123"),
        full_name="Vipul Yadav",
        role="lawyer",
        is_active=True,
        phone="+91-9876543211"
    )
    client = User(
        email="user@example.com",
        hashed_password=security.get_password_hash("password123"),
        full_name="Jane Smith",
        role="user",
        is_active=True
    )
    db.add_all([admin, lawyer, lawyer2, client])
    db.commit()

    # 2. Create Lawyer Profiles
    print("Creating lawyer profiles...")
    profile1 = LawyerProfile(
        user_id=lawyer.id,
        specialization="Corporate Law",
        experience_years=10,
        rating=4.8,
        cases_handled=150,
        office_address="123 Legal Street, Mumbai",
        bio="Experienced corporate lawyer specializing in mergers and acquisitions.",
        is_approved=True
    )
    profile2 = LawyerProfile(
        user_id=lawyer2.id,
        specialization="Criminal Law",
        experience_years=5,
        rating=4.5,
        cases_handled=75,
        office_address="456 Justice Road, Delhi",
        bio="Dedicated criminal defense attorney.",
        is_approved=True
    )
    db.add_all([profile1, profile2])
    db.commit()

    # 3. Create Cases
    print("Creating cases...")
    case1 = Case(
        title="Corporate Merger A",
        case_type="Corporate",
        description="Handling the merger between Tech Solutions and Global Innovations.",
        status="active",
        next_hearing=datetime.now() + timedelta(days=7),
        lawyer_id=lawyer.id,
        client_id=client.id
    )
    case2 = Case(
        title="Property Dispute B",
        case_type="Civil",
        description="Residential property title dispute in downtown area.",
        status="active",
        next_hearing=datetime.now() + timedelta(days=14),
        lawyer_id=lawyer.id,
        client_id=client.id
    )
    db.add_all([case1, case2])
    db.commit()

    # 4. Create Appointments
    print("Creating appointments...")
    app1 = Appointment(
        title="Initial Consultation",
        appointment_type="Consultation",
        lawyer_id=lawyer.id,
        client_id=client.id,
        appointment_time=datetime.now() + timedelta(days=1, hours=10),
        status="scheduled",
        description="Discussing the strategy for the corporate merger."
    )
    db.add(app1)
    db.commit()

    print("\n✅ SQLite database seeded successfully!")
    print(f"   Users: {db.query(User).count()}")
    print(f"   Lawyer Profiles: {db.query(LawyerProfile).count()}")
    print(f"   Cases: {db.query(Case).count()}")
    print(f"   Appointments: {db.query(Appointment).count()}")
    print("\n📋 Login credentials:")
    print("   admin@example.com / password123")
    print("   lawyer@example.com / password123")
    print("   vipulyadav503@gmail.com / password123")
    print("   user@example.com / password123")

except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()
    db.rollback()
finally:
    db.close()
