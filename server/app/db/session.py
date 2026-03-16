from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

def get_engine():
    try:
        # Try MySQL first (with a short timeout so we fail fast if XAMPP is off)
        mysql_uri = settings.SQLALCHEMY_DATABASE_URI
        if "?" not in mysql_uri:
            mysql_uri += "?connect_timeout=3"
        else:
            mysql_uri += "&connect_timeout=3"

        temp_engine = create_engine(
            mysql_uri,
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
