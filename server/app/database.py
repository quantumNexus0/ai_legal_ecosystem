"""
database.py — Robust database connection with MySQL → SQLite fallback.
Used as a standalone alternative entry point; the main db logic lives
in app/db/session.py (which already has this pattern).
"""
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from dotenv import load_dotenv

load_dotenv()


def get_database_url() -> str:
    """Try MySQL first, fall back to SQLite."""
    mysql_host = os.getenv("MYSQL_HOST")
    mysql_user = os.getenv("MYSQL_USER")
    mysql_password = os.getenv("MYSQL_PASSWORD", "")
    mysql_db = os.getenv("MYSQL_DATABASE")

    if all([mysql_host, mysql_user, mysql_db]):
        url = f"mysql+pymysql://{mysql_user}:{mysql_password}@{mysql_host}/{mysql_db}"
        try:
            engine = create_engine(url, pool_pre_ping=True)
            with engine.connect():
                print("CONNECTED: MySQL Connection - [OK]")
                return url
        except Exception as e:
            print(f"WARNING: MySQL unavailable ({e}), falling back to SQLite")

    sqlite_url = os.getenv("DATABASE_URL", "sqlite:///./legal_services.db")
    print(f"CONNECTED: Using SQLite: {sqlite_url}")
    return sqlite_url


DATABASE_URL = get_database_url()

connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
engine = create_engine(DATABASE_URL, connect_args=connect_args, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    pass


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
