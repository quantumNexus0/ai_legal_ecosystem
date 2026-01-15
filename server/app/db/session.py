from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

def get_engine():
    try:
        # Try MySQL first
        temp_engine = create_engine(
            settings.SQLALCHEMY_DATABASE_URI,
            pool_pre_ping=True
        )
        # Test connection
        with temp_engine.connect() as conn:
            print("Connected to MySQL database.")
            return temp_engine
    except Exception as e:
        print(f"MySQL connection failed: {e}")
        print("Falling back to SQLite database.")
        return create_engine(
            settings.SQLITE_DATABASE_URI,
            connect_args={"check_same_thread": False},
        )

engine = get_engine()

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)
