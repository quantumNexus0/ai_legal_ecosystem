import chromadb
from chromadb.config import Settings
from typing import List, Dict, Any
import os
from app.core.config import settings

class VectorService:
    def __init__(self):
        self.client = None
        self.collection = None
        self.is_ready = False

    def initialize(self):
        """Initialize ChromaDB Client"""
        try:
            # Persistent storage in /server/chroma_db - Absolute Path required
            db_path = os.path.join(str(settings.BASE_DIR), "server", "chroma_db")
            if not os.path.exists(os.path.dirname(db_path)):
                os.makedirs(os.path.dirname(db_path), exist_ok=True)
            
            print(f"Initializing Vector DB (ChromaDB) at: {db_path}")
            
            # Using standard PersistentClient
            self.client = chromadb.PersistentClient(path=db_path)
            
            # Get or Create Collection
            self.collection = self.client.get_or_create_collection(
                name="legal_knowledge_base",
                metadata={"hnsw:space": "cosine"}
            )
            
            self.is_ready = True
            print(f"Vector DB Ready! Items indexed: {self.collection.count()}")
            
        except Exception as e:
            print(f"Error initializing Vector DB: {e}")
            self.is_ready = False

    def wipe_collection(self):
        """Wipes the collection for a fresh start"""
        try:
            if self.client:
                self.client.delete_collection("legal_knowledge_base")
                self.initialize()
                print("Vector Collection Wiped and Re-initialized.")
        except Exception as e:
            print(f"Wipe failed: {e}")

    def add_documents(self, documents: List[str], metadatas: List[Dict[str, Any]], ids: List[str]):
        """Add documents to the vector database"""
        if not self.is_ready or not self.collection:
            self.initialize()
            
        try:
            # Safety check: if backend process still thinks collection exists but it was wiped
            try:
                self.collection.count()
            except:
                print("Collection missing. Re-initializing...")
                self.initialize()

            self.collection.add(
                documents=documents,
                metadatas=metadatas,
                ids=ids
            )
            print(f"Successfully added {len(documents)} documents to Vector DB.")
        except Exception as e:
            print(f"Error adding documents: {e}")
            # Final attempt: re-init and retry ONE more time
            try:
                self.initialize()
                self.collection.add(documents=documents, metadatas=metadatas, ids=ids)
                print("Retry successful after re-initialization.")
            except:
                print("Critical: Could not add documents even after re-initialization.")

    def get_count(self):
        """Get total item count in collection"""
        if not self.is_ready:
            self.initialize()
        try:
            return self.collection.count()
        except:
            return 0

    def search(self, query: str, limit: int = 5):
        """Semantic search"""
        if not self.is_ready:
            self.initialize()
            
        try:
            results = self.collection.query(
                query_texts=[query],
                n_results=limit
            )
            return results
        except Exception as e:
            print(f"Error searching Vector DB: {e}")
            return None

# Global Instance
vector_service = VectorService()
