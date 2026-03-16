"""Check MySQL lawyer profiles"""
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from sqlalchemy import create_engine, text

e = create_engine("mysql+pymysql://root:@127.0.0.1:3306/legal_services")
conn = e.connect()

print("=== ALL USERS ===")
r = conn.execute(text("SELECT id, email, full_name, role, is_active FROM user"))
for row in r:
    print(dict(row._mapping))

print("\n=== LAWYER PROFILES ===")
r = conn.execute(text("SELECT * FROM lawyer_profile"))
for row in r:
    print(dict(row._mapping))

print("\n=== LAWYERS WITH PROFILES (JOIN) ===")
r = conn.execute(text("""
    SELECT u.id, u.email, u.full_name, u.role, u.is_active,
           lp.specialization, lp.experience_years, lp.rating, lp.cases_handled
    FROM user u
    INNER JOIN lawyer_profile lp ON u.id = lp.user_id
    WHERE u.role = 'lawyer' AND u.is_active = 1
"""))
rows = [dict(row._mapping) for row in r]
print(f"Found {len(rows)} lawyers with profiles:")
for row in rows:
    print(f"  {row}")

conn.close()
