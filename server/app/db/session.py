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
            print("\n" + "="*50)
            print("DATABASE: MySQL Connection - [ACTIVE]")
            print("Successfully connected to MySQL database.")
            print("="*50 + "\n")
            return temp_engine
    except Exception as e:
        print("\n" + "!"*50)
        print(f"DATABASE: MySQL Connection - [FAILED]")
        print(f"Error: {e}")
        print("DATABASE: MySQL Connection - [FALLBACK] Using legal_services.db")
        print("!"*50 + "\n")
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
