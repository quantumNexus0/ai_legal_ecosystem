from typing import List, Dict, Any
from app.models.search import SearchResult

class SearchService:
    def __init__(self):
        self.is_ready = True # Initialized via VectorService

    def initialize(self):
        """No-op: VectorService handles initialization"""
        print("Search Service aligned with Vector DB.")
        pass

    def search(self, query: str, limit: int = 5) -> List[SearchResult]:
        """Perform semantic search using ChromaDB (VectorService)"""
        from app.services.vector_db import vector_service
        
        results = []
        try:
            vector_results = vector_service.search(query, limit=limit)
            
            if vector_results and vector_results['documents']:
                for i, doc in enumerate(vector_results['documents'][0]):
                    meta = vector_results['metadatas'][0][i]
                    results.append(SearchResult(
                        question=f"Relevant excerpt from {meta.get('source', 'Legal Knowledge Base')}",
                        answer=doc,
                        score=1.0 - (i * 0.05), # Approximation for display
                        dataset=meta.get('category', 'general')
                    ))
        except Exception as e:
            print(f"RAG Search failed: {e}")
            
        return results[:limit]

# Global instance
search_service = SearchService()
