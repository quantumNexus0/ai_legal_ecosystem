from pydantic import BaseModel
from typing import List, Optional

class SearchRequest(BaseModel):
    query: str
    dataset: str = "all"
    limit: int = 5

class SearchResult(BaseModel):
    question: str
    answer: str
    score: float
    dataset: str

class SearchResponse(BaseModel):
    results: List[SearchResult]
    total: int
    time_taken: float
