import json
import random
import re
from fastapi import APIRouter, HTTPException, Depends, UploadFile, File
import os
from app.models.search import SearchRequest, SearchResponse
from app.services.search_service import search_service
import time

router = APIRouter()

# Absolute base path for data, resolved relative to THIS file's location:
# routes.py -> app/api/routes.py -> server/app/api/routes.py
# So DATA_DIR = server/data
_THIS_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.normpath(os.path.join(_THIS_DIR, "..", "..", "data"))

def clean_text(text: str) -> str:
    """Normalize text for better matching by removing punctuation, extra spaces, and special chars."""
    if not text: return ""
    text = text.lower()
    # Remove dots (vs. -> vs, Maj. -> maj), commas, and other punctuation
    text = re.sub(r'[^\w\s]', '', text)
    # Collapse multiple spaces
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def search_json_directory(directory_path, query_clean):
    """Scan all JSON files in a directory for matches."""
    matches = []
    if not os.path.exists(directory_path):
        return matches
    
    for filename in os.listdir(directory_path):
        if filename.endswith(".json"):
            try:
                with open(os.path.join(directory_path, filename), 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    for entry in data:
                        # Check case_name, question, or text fields
                        # For statutes files with only question/answer, derive name from question
                        raw_name = entry.get('case_name', entry.get('title', ''))
                        question = entry.get('question', '')
                        if not raw_name and question:
                            # Use the question itself as the card title (truncated)
                            raw_name = question[:90] + '...' if len(question) > 90 else question
                        name = raw_name or 'Legal Reference'
                        answer = entry.get('answer', '')
                        
                        clean_name = clean_text(name)
                        clean_q = clean_text(question)
                        
                        match_found = False
                        
                        # 1. Exact Substring Match
                        if query_clean in clean_name or clean_name in query_clean or query_clean in clean_q or clean_q in query_clean:
                            match_found = True
                        else:
                            # 2. Advanced Fuzzy Token Match (50% conceptual overlap)
                            query_tokens = set(query_clean.split())
                            name_tokens = set(clean_name.split())
                            q_tokens = set(clean_q.split())
                            
                            if len(query_tokens) > 0:
                                name_overlap = len(query_tokens.intersection(name_tokens))
                                q_overlap = len(query_tokens.intersection(q_tokens))
                                
                                # For multi-word queries, if 50%+ of keywords match, consider it an authoritative hit
                                if len(query_tokens) >= 2 and (name_overlap / len(query_tokens) >= 0.5 or q_overlap / len(query_tokens) >= 0.5):
                                    match_found = True

                        if match_found:
                            matches.append({
                                "name": name,
                                "answer": answer,
                                "question": question,
                                "judgment_date": entry.get('judgment_date', 'Statute/Precedent'),
                                "source": filename
                            })
            except Exception as e:
                print(f"Error reading {filename}: {e}")
    return matches

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

@router.post("/search", response_model=SearchResponse)
async def search(request: SearchRequest):
    """Search across legal datasets and provide AI analysis with unified intelligence"""
    start_time = time.time()
    query_raw = request.query
    query_clean = clean_text(query_raw)
    
    try:
        # 1. INTELLIGENCE INTEGRATION: Check for high-confidence local matches FIRST
        matched_cases = []
        top_judgments = []
        is_local_match = False
        
        # Scan MatchedCase and statutes directories using absolute DATA_DIR path
        matched_cases.extend(search_json_directory(os.path.join(DATA_DIR, "MatchedCase"), query_clean))
        matched_cases.extend(search_json_directory(os.path.join(DATA_DIR, "statutes"), query_clean))
        
        if matched_cases:
            is_local_match = True
            # Randomize and limit for better variety
            random.shuffle(matched_cases)
            matched_cases = matched_cases[:8]

        # Search TopJudgments CSV
        try:
            csv_path = os.path.join(DATA_DIR, "TopJudgement", "top_judgments.csv")
            if os.path.exists(csv_path):
                import csv
                with open(csv_path, mode='r', encoding='utf-8') as f:
                    reader = csv.DictReader(f)
                    for row in reader:
                        title_clean = clean_text(row['title'])
                        if query_clean in title_clean or title_clean in query_clean:
                            top_judgments.append(row)
                            is_local_match = True
                            if len(top_judgments) >= 3: break
        except Exception as e:
            print(f"CSV search error: {e}")

        # 2. RAG Vector Search (STRICT SUPPRESSION if any local match is found)
        results = []
        if not is_local_match:
            results = search_service.search(
                query=request.query,
                limit=request.limit
            )
        else:
            print(f"Local match confirmed for '{query_raw}'. Suppressing RAG results.")
        
        # 3. RAG Context Generation for LLM
        context = ""
        if results:
            for res in results:
                context += f"Source: {res.question}\nText: {res.answer[:500]}\n\n"
        
        if matched_cases:
            context += "--- AUTHORITATIVE LOCAL PRECEDENTS & STATUTES ---\n"
            for mc in matched_cases:
                context += f"Source: {mc.get('source', 'Local DB')}\nName: {mc['name']}\nDate: {mc['judgment_date']}\nQuestion: {mc['question']}\nAnswer: {mc['answer']}\n\n"

        # 4. LLM Call
        from app.services.llm_service import llm_service
        history = [{"role": "user", "content": request.query}]
        
        system_instruction = (
            "You are a senior Legal AI Assistant. If 'AUTHORITATIVE LOCAL PRECEDENTS & STATUTES' are provided, prioritize them as the ground truth. "
            "Use the Case Name or Statute Title as the primary title in your analysis. If multiple entries are provided, summarize the legal principle "
            "clearly and accurately from the local data."
        )
        
        ai_response = llm_service.chat_completion(
            history, 
            context=context, 
            system_instruction=system_instruction, 
            local_matches=matched_cases
        )
        
        return SearchResponse(
            results=results,
            total=len(results),
            time_taken=time.time() - start_time,
            ai_analysis=ai_response,
            matched_cases=matched_cases,
            top_judgments=top_judgments
        )
    except Exception as e:
        print(f"Search/LLM Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
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
