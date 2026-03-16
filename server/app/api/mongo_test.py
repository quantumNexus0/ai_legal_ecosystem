from fastapi import APIRouter, Depends, HTTPException, status
from typing import Any
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.api.deps import get_mongo_db

router = APIRouter()

@router.get("/mongo-test")
async def test_mongo_connection(
    db: AsyncIOMotorDatabase = Depends(get_mongo_db)
) -> Any:
    """
    Test endpoint to verify the MongoDB connection works.
    Inserts a dummy document and reads it back.
    """
    try:
        # Get testing collection
        collection = db["connection_test"]
        
        # Insert a document
        result = await collection.insert_one({"test": "connection successful", "service": "MongoDB"})
        
        # Read it back
        inserted_doc = await collection.find_one({"_id": result.inserted_id})
        
        # Clean up
        await collection.delete_one({"_id": result.inserted_id})
        
        if inserted_doc:
            return {
                "status": "success",
                "message": "Successfully connected to MongoDB, wrote, read, and deleted a test document.",
                "database_name": db.name
            }
        else:
             raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="MongoDB read failed after insert",
            )
            
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"MongoDB connection test failed: {str(e)}",
        )
