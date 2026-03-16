"""
Seed the MySQL database with proper lawyer profile data.
Run this while XAMPP is ON.
"""
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from app.db.base_class import Base
from app.models import User, LawyerProfile, Case, Appointment
from app.core import security
from datetime import datetime, timedelta

engine = create_engine("mysql+pymysql://root:@127.0.0.1:3306/legal_services")
Session = sessionmaker(bind=engine)
db = Session()

try:
    # 1. Update existing lawyer profiles with proper data
    print("Updating lawyer profiles in MySQL...")

    # Get all lawyers
    lawyers = db.query(User).filter(User.role == "lawyer").all()
    print(f"Found {len(lawyers)} lawyers")

    specializations = [
        ("Corporate Law", 10, 4.8, 150, "Expert in M&A and corporate governance."),
        ("Criminal Law", 8, 4.5, 120, "Skilled criminal defense attorney."),
        ("Family Law", 6, 4.6, 90, "Compassionate family law specialist."),
        ("Real Estate Law", 12, 4.7, 200, "Seasoned property law professional."),
        ("Tax Law", 15, 4.9, 180, "Certified tax law advisor."),
    ]

    for i, lawyer in enumerate(lawyers):
        spec = specializations[i % len(specializations)]
        profile = db.query(LawyerProfile).filter(LawyerProfile.user_id == lawyer.id).first()

        if not profile:
            print(f"  Creating profile for {lawyer.email}")
            profile = LawyerProfile(user_id=lawyer.id)
            db.add(profile)

        profile.specialization = spec[0]
        profile.experience_years = spec[1]
        profile.rating = spec[2]
        profile.cases_handled = spec[3]
        profile.bio = spec[4]
        profile.is_approved = True
        print(f"  Updated {lawyer.email}: {spec[0]}")

    db.commit()

    # 2. Verify
    print("\n=== Verification ===")
    results = db.query(User, LawyerProfile).join(
        LawyerProfile, User.id == LawyerProfile.user_id
    ).filter(User.role == "lawyer", User.is_active == True).all()

    print(f"Lawyers with profiles: {len(results)}")
    for user, profile in results:
        print(f"  - {user.full_name or user.email}: {profile.specialization} ({profile.experience_years} yrs, rating {profile.rating})")

    print("\n✅ MySQL lawyer profiles updated!")

except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()
    db.rollback()
finally:
    db.close()
