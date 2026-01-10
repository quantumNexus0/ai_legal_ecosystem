import json
import time
from typing import List, Dict, Any
import numpy as np
import torch
from sentence_transformers import SentenceTransformer, util
from app.core.config import settings
from app.models.search import SearchResult

class SearchService:
    def __init__(self):
        self.model = None
        self.datasets: Dict[str, List[Dict[str, Any]]] = {}
        self.embeddings: Dict[str, Any] = {}
        self.is_ready = False

    def initialize(self):
        """Initialize in background"""
        import threading
        print("Starting Search Service initialization in background...")
        thread = threading.Thread(target=self._initialize_sync)
        thread.daemon = True
        thread.start()

    def _initialize_sync(self):
        """Synchronous initialization for background thread"""
        try:
            print("Initializing Search Service...")
            
            # Load Model
            try:
                print(f"Loading model: {settings.EMBEDDING_MODEL}")
                self.model = SentenceTransformer(settings.EMBEDDING_MODEL)
            except Exception as e:
                print(f"Error loading model: {e}")
                return

            # Load Datasets
            self._load_datasets()
            
            # Generate Embeddings
            self._generate_embeddings()
            
            self.is_ready = True
            print("Search Service Ready!")
        except Exception as e:
            print(f"Unexpected error in Search Service initialization: {e}")

    def _load_datasets(self):
        """Load all JSON datasets from data directory"""
        if not settings.DATA_DIR.exists():
            print(f"Warning: Data directory not found at {settings.DATA_DIR}")
            return

        for json_file in settings.DATA_DIR.glob("*.json"):
            dataset_name = json_file.stem
            try:
                with open(json_file, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    self.datasets[dataset_name] = data
                    print(f"Loaded dataset: {dataset_name} with {len(data)} entries")
            except Exception as e:
                print(f"Error loading {json_file}: {e}")

    def _generate_embeddings(self):
        """Generate embeddings for all datasets"""
        print("Generating embeddings... This may take a moment.")
        for name, data in self.datasets.items():
            # We'll embed the questions for search
            questions = [item.get('question', '') for item in data]
            
            # Encode
            embeddings = self.model.encode(questions, convert_to_tensor=True)
            self.embeddings[name] = embeddings
            print(f"Generated embeddings for {name}")

    def search(self, query: str, dataset: str = "all", limit: int = 5) -> List[SearchResult]:
        """Perform semantic search"""
        if not self.is_ready:
            raise RuntimeError("Search service is not initialized")

        query_embedding = self.model.encode(query, convert_to_tensor=True)
        results = []

        target_datasets = self.datasets.keys() if dataset == "all" else [dataset]

        for ds_name in target_datasets:
            if ds_name not in self.datasets:
                continue

            # Calculate cosine similarity
            cos_scores = util.cos_sim(query_embedding, self.embeddings[ds_name])[0]
            
            # Get top k results
            top_results = torch.topk(cos_scores, k=min(limit, len(cos_scores)))
            
            for score, idx in zip(top_results.values, top_results.indices):
                item = self.datasets[ds_name][idx]
                results.append(SearchResult(
                    question=item.get('question', ''),
                    answer=item.get('answer', ''),
                    score=float(score),
                    dataset=ds_name
                ))

        # Sort combined results by score
        results.sort(key=lambda x: x.score, reverse=True)
        return results[:limit]

# Global instance
search_service = SearchService()
