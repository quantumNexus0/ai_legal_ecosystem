
from sqlalchemy import create_engine, text
import os
from dotenv import load_dotenv

load_dotenv(r"c:\Users\ASUS\Desktop\aiLegalEcosystem\server\.env")

# Primary MySQL URI
db_uri = "mysql+pymysql://root:@127.0.0.1:3306/legal_services"

print(f"Checking data in: {db_uri}")

try:
    engine = create_engine(db_uri)
    with engine.connect() as conn:
        print("Connected to MySQL!")
        
        # Check users
        result = conn.execute(text("SELECT email, role FROM user")).fetchall()
        print(f"\nUsers found: {len(result)}")
        for row in result:
            print(f"- {row.email} ({row.role})")
            
        # Check lawyer profiles
        result = conn.execute(text("SELECT user_id, specialization FROM lawyer_profile")).fetchall()
        print(f"\nLawyer Profiles found: {len(result)}")
        for row in result:
            print(f"- UserID: {row.user_id}, Specialization: {row.specialization}")

except Exception as e:
    print(f"Error checking MySQL: {e}")
