from typing import List, Dict, Any
from app.models.search import SearchResult

def normalize_title(source: str) -> str:
    """Converts technical filenames into proper professional titles."""
    if not source:
        return "Legal Precedent"
    
    # 1. Clean extensions
    title = source.replace(".pdf", "").replace(".csv", "").replace(".json", "")
    
    # 2. Known Mapping for technical codes
    mapping = {
        "I_LB105_2023": "Family Law Regulation (2023)",
        "Crime_Articles": "National Crime Database",
        "7k Unique crime articles": "Criminal Jurisprudence Analysis",
        "IndicLegalQA Dataset_10K": "Supreme Court Q&A Database",
        "top_judgments": "Landmark Supreme Court Judgments"
    }
    
    for key, val in mapping.items():
        if key in title:
            return val
            
    # 3. Generic Clean Up (Dashes to Spaces, Title Case)
    title = title.replace("-", " ").replace("_", " ").title()
    return title

class SearchService:
    def __init__(self):
        self.is_ready = True # Initialized via VectorService

    def initialize(self):
        """No-op: VectorService handles initialization"""
        print("Search Service aligned with Vector DB.")
        pass

    def search(self, query: str, limit: int = 5) -> List[SearchResult]:
        """Perform semantic search using ChromaDB (VectorService) with Filtering"""
        from app.services.vector_db import vector_service
        
        # Blacklisted sources
        blacklist = [
            "7k unique crime articles",
            "7k_unique_crime_articles",
            "crime_articles",
            "crime articles",
            "family law- i_lb105_2023",
            "i_lb105_2023"
        ]
        
        results = []
        try:
            # Fetch more than needed to allow for filtering
            vector_results = vector_service.search(query, limit=limit * 2)
            
            if vector_results and vector_results['documents']:
                for i, doc in enumerate(vector_results['documents'][0]):
                    meta = vector_results['metadatas'][0][i]
                    source_name = meta.get('source', '').lower()
                    
                    # STRICT FILTERING LOGIC
                    is_blacklisted = False
                    for b in blacklist:
                        if b in source_name:
                            is_blacklisted = True
                            break
                    
                    if is_blacklisted:
                        continue
                        
                    results.append(SearchResult(
                        question=f"Excerpt from {normalize_title(source_name)}",
                        answer=doc,
                        score=1.0 - (len(results) * 0.05), # Consistent scoring
                        dataset=meta.get('category', 'general')
                    ))
                    
                    if len(results) >= limit:
                        break
        except Exception as e:
            print(f"RAG Search failed: {e}")
            
        return results

# Global instance
search_service = SearchService()
