import os
import sys
import uuid
from typing import List

# Add parent dir to path to import app modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.services.vector_db import vector_service
from langchain_text_splitters import RecursiveCharacterTextSplitter
from pypdf import PdfReader

def ingest_pdf(file_path: str):
    print(f"Processing PDF: {file_path}")
    
    # 1. Extract Text
    try:
        reader = PdfReader(file_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
            
        print(f"Extracted {len(text)} characters.")
    except Exception as e:
        print(f"Failed to read PDF: {e}")
        return

    # 2. Split Text
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len,
    )
    chunks = text_splitter.split_text(text)
    print(f"Split into {len(chunks)} chunks.")

    # 3. Prepare for Vector DB
    documents = []
    metadatas = []
    ids = []
    
    filename = os.path.basename(file_path)
    
    for i, chunk in enumerate(chunks):
        documents.append(chunk)
        metadatas.append({
            "source": filename,
            "chunk_index": i,
            "type": "pdf_book"
        })
        ids.append(f"{filename}_{i}_{str(uuid.uuid4())[:8]}")

    # 4. Add to ChromaDB
    print("Adding to Vector Database...")
    vector_service.initialize()
    vector_service.add_documents(documents, metadatas, ids)
    print("Done!")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python ingest_pdf.py <path_to_pdf_or_directory>")
    else:
        path = sys.argv[1]
        if os.path.isdir(path):
            print(f"Scanning directory: {path}")
            pdf_files = []
            for root, dirs, files in os.walk(path):
                for file in files:
                    if file.lower().endswith(".pdf"):
                        pdf_files.append(os.path.join(root, file))
            
            print(f"Found {len(pdf_files)} PDF files.")
            for pdf_file in pdf_files:
                try:
                    ingest_pdf(pdf_file)
                except Exception as e:
                    print(f"Error ingesting {pdf_file}: {e}")
                    
        elif os.path.exists(path):
            ingest_pdf(path)
        else:
            print("File or directory not found.")
