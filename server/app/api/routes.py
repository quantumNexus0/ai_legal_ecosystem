import json
import random
import re
from fastapi import APIRouter, HTTPException, Depends, UploadFile, File
from app.services.search_service import search_service
import time

router = APIRouter()


import os

@router.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy" if search_service.is_ready else "initializing"}

@router.get("/datasets")
async def list_datasets():
    """List statistics about the Unified Legal Knowledge Base"""
    from app.services.vector_db import vector_service
    return {
        "datasets": [{
            "name": "Unified Knowledge Base",
            "count": vector_service.get_count()
        }]
    }

@router.post("/upload")
async def upload_document(file: UploadFile = File(...)):
    """Upload and ingest a PDF document"""
    try:
        # Create temp file
        file_location = f"temp_{file.filename}"
        with open(file_location, "wb+") as file_object:
            file_object.write(await file.read())
            
        # Process PDF
        from pypdf import PdfReader
        from langchain_text_splitters import RecursiveCharacterTextSplitter
        from app.services.vector_db import vector_service
        import uuid
        
        reader = PdfReader(file_location)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
            
        # Split Text
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200,
            length_function=len,
        )
        chunks = text_splitter.split_text(text)
        
        # Prepare for Vector DB
        documents = []
        metadatas = []
        ids = []
        
        for i, chunk in enumerate(chunks):
            documents.append(chunk)
            metadatas.append({
                "source": file.filename,
                "chunk_index": i,
                "type": "uploaded_pdf"
            })
            ids.append(f"{file.filename}_{i}_{str(uuid.uuid4())[:8]}")
            
        # Index
        vector_service.add_documents(documents, metadatas, ids)
        
        # Cleanup
        os.remove(file_location)
        
        return {"message": f"Successfully processed {file.filename}", "chunks": len(chunks)}
        
    except Exception as e:
        if os.path.exists(file_location):
            os.remove(file_location)
        raise HTTPException(status_code=500, detail=str(e))
