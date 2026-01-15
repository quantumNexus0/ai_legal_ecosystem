from fastapi import APIRouter, HTTPException, Depends
from app.models.search import SearchRequest, SearchResponse
from app.services.search_service import search_service
import time

router = APIRouter()

@router.get("/health")
async def health_check():
    """Health check endpoint"""
    if not search_service.is_ready:
        return {"status": "initializing"}
    return {"status": "healthy"}

@router.get("/datasets")
async def list_datasets():
    """List all available datasets"""
    datasets_info = []
    for name, data in search_service.datasets.items():
        datasets_info.append({
            "name": name,
            "count": len(data)
        })
    return {"datasets": datasets_info}

@router.post("/search", response_model=SearchResponse)
async def search(request: SearchRequest):
    """Search across legal datasets"""
    if not search_service.is_ready:
        raise HTTPException(status_code=503, detail="Search service is initializing")
    
    start_time = time.time()
    
    try:
        results = search_service.search(
            query=request.query,
            dataset=request.dataset,
            limit=request.limit
        )
        
        return SearchResponse(
            results=results,
            total=len(results),
            time_taken=time.time() - start_time
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
