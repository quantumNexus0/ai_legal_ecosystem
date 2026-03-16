"""
Document Upload to MongoDB (GridFS) — store legal documents.
"""
from fastapi import APIRouter, HTTPException, Depends, UploadFile, File
from typing import Optional
from datetime import datetime
from sqlalchemy.orm import Session
from bson import ObjectId

from app.api.deps import get_db, get_current_user
from app.models import User

router = APIRouter()


@router.post("/api/documents/upload")
async def upload_document(
    file: UploadFile = File(...),
    case_id: Optional[int] = None,
    description: Optional[str] = None,
    current_user: User = Depends(get_current_user),
):
    """Upload a legal document to MongoDB GridFS."""
    try:
        from app.db.mongo import get_database
        import motor.motor_asyncio
        mongo_db = get_database()
        if mongo_db is None:
            raise HTTPException(status_code=503, detail="MongoDB not available")

        # Read file content
        content = await file.read()
        if len(content) > 50 * 1024 * 1024:  # 50MB limit
            raise HTTPException(status_code=413, detail="File too large (max 50MB)")

        # Store using GridFS
        fs = motor.motor_asyncio.AsyncIOMotorGridFSBucket(mongo_db)
        file_id = await fs.upload_from_stream(
            file.filename,
            content,
            metadata={
                "uploader_id": current_user.id,
                "uploader_name": current_user.full_name or current_user.email,
                "case_id": case_id,
                "description": description,
                "content_type": file.content_type,
                "size_bytes": len(content),
                "uploaded_at": datetime.utcnow()
            }
        )

        return {
            "status": "success",
            "file_id": str(file_id),
            "filename": file.filename,
            "size_bytes": len(content),
            "message": f"Document '{file.filename}' uploaded successfully"
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/api/documents")
async def list_documents(
    current_user: User = Depends(get_current_user),
):
    """List all documents uploaded by the current user."""
    try:
        from app.db.mongo import get_database
        mongo_db = get_database()
        if mongo_db is None:
            return {"documents": []}

        cursor = mongo_db.fs.files.find(
            {"metadata.uploader_id": current_user.id}
        ).sort("uploadDate", -1)

        docs = []
        async for doc in cursor:
            docs.append({
                "id": str(doc["_id"]),
                "filename": doc["filename"],
                "size_bytes": doc.get("length", 0),
                "content_type": doc.get("metadata", {}).get("content_type", "unknown"),
                "description": doc.get("metadata", {}).get("description"),
                "case_id": doc.get("metadata", {}).get("case_id"),
                "uploaded_at": doc.get("uploadDate", "").isoformat() if doc.get("uploadDate") else None
            })

        return {"documents": docs, "total": len(docs)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/api/documents/{file_id}")
async def download_document(
    file_id: str,
    current_user: User = Depends(get_current_user),
):
    """Download a document from MongoDB GridFS."""
    from fastapi.responses import StreamingResponse
    import io

    try:
        from app.db.mongo import get_database
        import motor.motor_asyncio
        mongo_db = get_database()
        if mongo_db is None:
            raise HTTPException(status_code=503, detail="MongoDB not available")

        fs = motor.motor_asyncio.AsyncIOMotorGridFSBucket(mongo_db)

        # Get file info
        file_doc = await mongo_db.fs.files.find_one({"_id": ObjectId(file_id)})
        if not file_doc:
            raise HTTPException(status_code=404, detail="Document not found")

        # Download from GridFS
        grid_out = await fs.open_download_stream(ObjectId(file_id))
        content = await grid_out.read()

        content_type = file_doc.get("metadata", {}).get("content_type", "application/octet-stream")

        return StreamingResponse(
            io.BytesIO(content),
            media_type=content_type,
            headers={"Content-Disposition": f"attachment; filename={file_doc['filename']}"}
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/api/documents/{file_id}")
async def delete_document(
    file_id: str,
    current_user: User = Depends(get_current_user),
):
    """Delete a document from MongoDB GridFS."""
    try:
        from app.db.mongo import get_database
        import motor.motor_asyncio
        mongo_db = get_database()
        if mongo_db is None:
            raise HTTPException(status_code=503, detail="MongoDB not available")

        # Verify ownership
        file_doc = await mongo_db.fs.files.find_one({"_id": ObjectId(file_id)})
        if not file_doc:
            raise HTTPException(status_code=404, detail="Document not found")

        if file_doc.get("metadata", {}).get("uploader_id") != current_user.id:
            raise HTTPException(status_code=403, detail="Not authorized to delete this document")

        fs = motor.motor_asyncio.AsyncIOMotorGridFSBucket(mongo_db)
        await fs.delete(ObjectId(file_id))

        return {"status": "success", "message": "Document deleted"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
