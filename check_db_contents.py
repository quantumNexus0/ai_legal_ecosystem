import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

# Load server/.env
load_dotenv('server/.env')

db_url = os.getenv('DATABASE_URL')
if not db_url:
    db_url = 'sqlite:///server/legal_services.db'

print(f"Connecting to: {db_url}")
engine = create_engine(db_url)

with engine.connect() as conn:
    print("\n--- USERS ---")
    users = conn.execute(text("SELECT id, email, full_name, role, is_active FROM user")).fetchall()
    for u in users:
        print(u)
        
    print("\n--- LAWYER PROFILES ---")
    profiles = conn.execute(text("SELECT id, user_id, specialization, is_approved FROM lawyer_profile")).fetchall()
    for p in profiles:
        print(p)
