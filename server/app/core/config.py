from pathlib import Path
import os
from dotenv import load_dotenv

# Load .env file explicitly
load_dotenv()

class Settings:
    PROJECT_NAME: str = "Legal Intelligence API"
    VERSION: str = "2.0.0"

    # Paths
    BASE_DIR: Path = Path(__file__).resolve().parent.parent.parent
    DATA_DIR: Path = BASE_DIR / "data"

    # Model Settings
    EMBEDDING_MODEL: str = "sentence-transformers/all-MiniLM-L6-v2"

    # Database
    SQLALCHEMY_DATABASE_URI: str = os.getenv(
        "DATABASE_URL",
        "mysql+pymysql://root:@127.0.0.1:3306/legal_services"
    )

    # Fallback to SQLite if MySQL is not available
    SQLITE_DATABASE_URI: str = "sqlite:///./legal_services.db"

    # MongoDB Setup
    MONGODB_URL: str = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
    MONGODB_NAME: str = os.getenv("MONGODB_NAME", "legal_services")

    # Security
    SECRET_KEY: str = os.getenv("SECRET_KEY", "dev-secret-key")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

settings = Settings()
