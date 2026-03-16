from app.db.session import SessionLocal
from app.models import User

def check_users():
    db = SessionLocal()
    try:
        users = db.query(User).all()
        print(f"Found {len(users)} users in the SQL database:")
        for user in users:
            print(f"- Email: {user.email}, Role: {user.role}, Active: {user.is_active}")
    except Exception as e:
        print(f"Error checking users: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    check_users()
