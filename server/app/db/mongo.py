from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)

class MongoDBManager:
    client: AsyncIOMotorClient = None
    db = None

db_manager = MongoDBManager()

async def connect_to_mongo():
    print("\n" + "="*50)
    try:
        # Add serverSelectionTimeoutMS to prevent long hangs if Atlas is unreachable
        db_manager.client = AsyncIOMotorClient(
            settings.MONGODB_URL, 
            serverSelectionTimeoutMS=5000
        )
        # Verify connection
        await db_manager.client.admin.command('ping')
        db_manager.db = db_manager.client[settings.MONGODB_NAME]
        print("DATABASE: MongoDB Connection - [ACTIVE]")
        print("="*50 + "\n")
    except Exception as e:
        print(f"DATABASE: MongoDB Connection - [FAILED]")
        print(f"Error: {e}")
        print("="*50 + "\n")

async def close_mongo_connection():
    logger.info("Closing MongoDB connection...")
    if db_manager.client:
        db_manager.client.close()
    logger.info("MongoDB connection closed.")

def get_database():
    """
    Returns the MongoDB database instance.
    Will be used mainly as a dependency.
    """
    return db_manager.db
