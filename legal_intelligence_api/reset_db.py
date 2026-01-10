import sys
import os

# Add the current directory to sys.path to import app
sys.path.append(os.getcwd())

from app.db.session import engine
from app.db.base_class import Base
from app.models import User
from app.models import LawyerProfile

def reset_db():
    print("Dropping all tables...")
    Base.metadata.drop_all(bind=engine)
    print("Creating all tables...")
    Base.metadata.create_all(bind=engine)
    print("Success!")

if __name__ == "__main__":
    reset_db()
