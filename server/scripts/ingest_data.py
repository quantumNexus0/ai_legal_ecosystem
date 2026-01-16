import os
import sys
import uuid
import json
from typing import List, Dict, Any

# Add parent dir to path to import app modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.services.vector_db import vector_service
from langchain_text_splitters import RecursiveCharacterTextSplitter
from pypdf import PdfReader

# Configuration
RAW_DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data")

def extract_text_from_pdf(file_path: str) -> str:
    try:
        reader = PdfReader(file_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        return text
    except Exception as e:
        print(f"Error reading PDF {file_path}: {e}")
        return ""

def extract_text_from_json(file_path: str) -> str:
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        # Flatten simple JSON structure to string
        return json.dumps(data, indent=2)
    except Exception as e:
        print(f"Error reading JSON {file_path}: {e}")
        return ""

def extract_text_from_txt(file_path: str) -> str:
    encodings = ['utf-8', 'utf-16', 'latin-1', 'cp1252']
    for enc in encodings:
        try:
            with open(file_path, 'r', encoding=enc) as f:
                return f.read()
        except UnicodeDecodeError:
            continue
        except Exception as e:
            print(f"Error reading Text file {file_path} with {enc}: {e}")
            break
            
    print(f"Failed to read {file_path} with any supported encoding.")
    return ""

def extract_text_from_csv(file_path: str) -> str:
    import csv
    text = ""
    encodings = ['utf-8', 'latin-1', 'cp1252']
    for enc in encodings:
        try:
            with open(file_path, 'r', encoding=enc) as f:
                reader = csv.reader(f)
                for row in reader:
                    text += " | ".join(row) + "\n"
                return text
        except UnicodeDecodeError:
            continue
        except Exception as e:
            print(f"Error reading CSV {file_path} with {enc}: {e}")
            break
    return ""

def ingest_directory():
    print(f"Scanning directory: {RAW_DATA_DIR}")
    
    if not os.path.exists(RAW_DATA_DIR):
        os.makedirs(RAW_DATA_DIR)
        print(f"Created directory {RAW_DATA_DIR}. Please place your files there.")
        return

    files_to_process = []
    for root, dirs, files in os.walk(RAW_DATA_DIR):
        # Determine category based on parent folder name
        category = os.path.basename(root) if root != RAW_DATA_DIR else "general"
        for file in files:
            files_to_process.append((os.path.join(root, file), category))
    
    if not files_to_process:
        print("No files found. Please add .pdf, .json, .csv or .txt files.")
        return

    # Scratch Reconstruction: Wipe Existing Data
    print("\n--- SCRATCH RECONSTRUCTION: Wiping Existing Knowledge Base ---")
    vector_service.initialize()
    vector_service.wipe_collection()
    
    all_documents = []
    all_metadatas = []
    all_ids = []
    
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1200,
        chunk_overlap=200,
        length_function=len,
    )

    CHUNK_COMMIT_THRESHOLD = 500
    total_chunks = 0

    print(f"\nStarting Fresh Ingestion of {len(files_to_process)} sorted files...")

    for i, (file_path, category) in enumerate(files_to_process):
        filename = os.path.basename(file_path)
        if filename.startswith(".") or ".git" in file_path:
            continue
            
        print(f"[{i+1}/{len(files_to_process)}] Processing [{category}]: {filename}")
        
        text = ""
        # ... [Extraction logic]
        if filename.lower().endswith(".pdf"):
            text = extract_text_from_pdf(file_path)
        elif filename.lower().endswith(".json"):
            text = extract_text_from_json(file_path)
        elif filename.lower().endswith(".csv"):
            text = extract_text_from_csv(file_path)
        elif filename.lower().endswith(".txt"):
            text = extract_text_from_txt(file_path)
        else:
            continue

        if not text:
            continue
            
        chunks = text_splitter.split_text(text)
        
        for j, chunk in enumerate(chunks):
            all_documents.append(chunk)
            all_metadatas.append({
                "source": filename,
                "path": file_path,
                "type": filename.split('.')[-1],
                "category": category,
                "chunk_index": j
            })
            all_ids.append(f"{filename}_{j}_{str(uuid.uuid4())[:8]}")
            
            # Commit by chunk threshold
            if len(all_documents) >= CHUNK_COMMIT_THRESHOLD:
                print(f"-> Committing {len(all_documents)} chunks to Disk...")
                vector_service.add_documents(all_documents, all_metadatas, all_ids)
                total_chunks += len(all_documents)
                all_documents, all_metadatas, all_ids = [], [], []

    # Final Commit
    if all_documents:
        print(f"-> Committing final {len(all_documents)} chunks...")
        vector_service.add_documents(all_documents, all_metadatas, all_ids)
        total_chunks += len(all_documents)
        
    print(f"\n✅ RECONSTRUCTION COMPLETE!")
    print(f"Total Files processed: {len(files_to_process)}")
    print(f"Total Chunks added: {total_chunks}")

if __name__ == "__main__":
    ingest_directory()
