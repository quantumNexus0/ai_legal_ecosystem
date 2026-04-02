from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import os
import requests
import json
import random
import csv
from datetime import datetime
from app.services.search_service import search_service
from app.api.deps import get_mongo_db
from app.api.analysis_constants import STRONG_ARGUMENTS, WEAK_POINTS

router = APIRouter()

class CaseAnalysisRequest(BaseModel):
    facts: str
    parties: str
    stage: str
    issues: str
    sections: Optional[str] = None
    additional_info: Optional[str] = None

class WebReference(BaseModel):
    title: str
    url: str
    snippet: str
    source: Optional[str] = "Google Web"

class CaseAnalysisResponse(BaseModel):
    analysis: str
    recommended_actions: List[str]
    risk_score: int
    strong_points: List[str] = []
    weak_points: List[str] = []
    expected_direction: str = "Analysis pending..."
    comparison_rows: List[Dict[str, Any]] = []
    matched_cases: Optional[List[Dict[str, Any]]] = None
    web_references: Optional[List[WebReference]] = None

@router.post("/analyze", response_model=CaseAnalysisResponse)
async def analyze_case(request: CaseAnalysisRequest):
    """
    Analyzes a legal case using Local RAG (SearchService) and optionally n8n/LLM.
    """
    
    # 1. Fetch External Legal Precedents via n8n (if configured)
    n8n_webhook = os.getenv("N8N_ANALYSIS_WEBHOOK")
    n8n_context = ""
    external_precedents = []
    web_refs = []

    if n8n_webhook:
        try:
            # We ask n8n to perform a "Legal Search" and return list of cases/articles
            payload = {
                "action": "search_precedents", 
                "facts": request.facts,
                "issues": request.issues,
                "search_queries": [
                    f"{request.issues} supreme court india judgments",
                    f"consumer protection rulings {request.facts[:20]}",
                    f"{request.sections or 'IPC'} recent case law"
                ]
            }
            # Set a shorter timeout for search to keep UI snappy
            response = requests.post(n8n_webhook, json=payload, timeout=10)
            
            if response.status_code == 200:
                n8n_data = response.json()
                
                # Assume n8n returns 'web_references' or 'cases'
                if 'web_references' in n8n_data:
                    web_refs = [WebReference(**ref) for ref in n8n_data['web_references']]
                    for ref in web_refs:
                        n8n_context += f"External Precedent: {ref.title}\nSource: {ref.source}\nSummary: {ref.snippet}\nLink: {ref.url}\n\n"
                        external_precedents.append({
                            "question": ref.title,
                            "answer": ref.snippet,
                            "dataset": "External Web",
                            "score": 0.90 # High confidence if fresh from web
                        })
                
                # Check if n8n returned a full analysis (optional override)
                if 'analysis' in n8n_data:
                    # If n8n did the heavy lifting, we can use it, but user asked for "calculated analysis"
                    # We will prefer passing this analysis as "Expert Opinion" to our final LLM synthesizer
                    n8n_context += f"Preliminary AI Analysis: {n8n_data['analysis']}\n\n"

        except Exception as e:
            print(f"n8n Search Skipped: {e}")

    # 2. LOCAL RAG Analysis
    # Search for relevant legal sections in ChromaDB
    query = f"{request.issues} {request.facts}"
    rag_context = ""
    local_precedents = []
    
    try:
        from app.services.vector_db import vector_service
        vector_results = vector_service.search(query, limit=10)
        
        if vector_results and vector_results['documents']:
             for i, doc in enumerate(vector_results['documents'][0]):
                 meta = vector_results['metadatas'][0][i]
                 source = meta.get('source', 'Local DB')
                 
                 local_precedents.append({
                     "question": f"Result from {source}",
                     "answer": doc,
                     "dataset": meta.get('type', 'document'),
                     "score": 0.85 
                 })
                 rag_context += f"Local Source: {source}\nContent: {doc}\n\n"
                 
    except Exception as e:
        print(f"Vector DB Error: {e}")
        # Continue without RAG if DB fails

    # 3. Generate "Calculated" Analysis using LLM Service
    from app.services.llm_service import llm_service
    
    # 3.1 Randomly pick 5-6 strong/weak points if LLM is not perfect or user wants variety
    # The user specifically asked to show 5-6 points and rotate them next time
    selected_strong = random.sample(STRONG_ARGUMENTS, min(len(STRONG_ARGUMENTS), random.randint(5, 6)))
    selected_weak = random.sample(WEAK_POINTS, min(len(WEAK_POINTS), random.randint(5, 6)))

    # Combine both contexts for LLM
    full_context = f"--- EXTERNAL WEB SEARCH (n8n) ---\n{n8n_context}\n\n--- LOCAL DATABASE (RAG) ---\n{rag_context}"
    
    system_prompt = """
    You are NyayaAssist, an advanced Legal AI for Indian Law. 
    Analyze the provided case facts and issues. 
    
    Return JSON format exactly as:
    {
        "analysis_report": "markdown string...",
        "recommended_actions": ["action 1", "action 2"],
        "risk_score": 75,
        "expected_direction": "The case leans in favor of...",
        "comparison_rows": [
            {"parameter": "Facts", "user_case": "...", "court_case": "...", "similarity": 80}
        ]
    }
    """
    
    user_prompt = f"""
    CASE DETAILS:
    Facts: {request.facts}
    Parties: {request.parties}
    Stage: {request.stage}
    Issues: {request.issues}
    
    LEGAL CONTEXT:
    {full_context}
    """
    
    # Call the LLM
    llm_response = llm_service.generate_analysis(system_prompt, user_prompt)
    
    if "error" in llm_response:
        analysis_report = f"## Analysis Failed\n\nAI Service Error: {llm_response['error']}. Please check your API keys."
        recommended_actions = ["Retry analysis"]
        risk_score = 0
        expected_direction = "Analysis could not be generated."
        comparison_rows = []
    else:
        analysis_report = llm_response.get("analysis_report", "Analysis generation returned empty.")
        recommended_actions = llm_response.get("recommended_actions", [])
        risk_score = llm_response.get("risk_score", 50)
        expected_direction = llm_response.get("expected_direction", "No summary available.")
        comparison_rows = llm_response.get("comparison_rows", [])
    
    # 4. FETCH LOCAL MATCHED CASES from JSON
    matched_json_cases = []
    try:
        json_path = os.path.join("server", "data", "MatchedCase", "IndicLegalQA Dataset_10K.json")
        if not os.path.exists(json_path):
             json_path = os.path.join("data", "MatchedCase", "IndicLegalQA Dataset_10K.json")
             
        if os.path.exists(json_path):
            with open(json_path, 'r', encoding='utf-8') as f:
                dataset = json.load(f)
                # Simple keyword matching on issues/facts
                search_keywords = (request.issues + " " + request.facts).lower().split()
                matches = []
                for entry in dataset:
                    score = 0
                    q_text = entry.get('question', '').lower()
                    for word in search_keywords:
                        if len(word) > 3 and word in q_text:
                            score += 10
                    
                    if score > 0:
                        matches.append((score, entry))
                
                # Sort and take top 3
                matches.sort(key=lambda x: x[0], reverse=True)
                for score, entry in matches[:3]:
                    matched_json_cases.append({
                        "id": f"json_{random.randint(1000, 9999)}",
                        "name": entry.get('case_name', 'Notable Precedent'),
                        "citation": "Source: IndicLegalQA",
                        "court": "Indian Courts",
                        "year": "N/A",
                        "matchScore": min(95, 70 + score),
                        "whyMatches": entry.get('question', 'Similar legal question addressed.'),
                        "ratio": entry.get('answer', 'Ratio decidendi details from the case.')
                    })
    except Exception as e:
        print(f"JSON matching error: {e}")

    # Fallback/Merge with RAG precedents if any
    all_matched = matched_json_cases if matched_json_cases else []
    if not all_matched:
        for i, p in enumerate(local_precedents[:3]):
             all_matched.append({
                 "id": f"p_{i}",
                 "name": p['question'],
                 "citation": "Local DB",
                 "court": "Various",
                 "year": "N/A",
                 "matchScore": 85,
                 "whyMatches": "Matches facts/issues in local analysis.",
                 "ratio": p['answer']
             })

    return CaseAnalysisResponse(
        analysis=analysis_report,
        recommended_actions=recommended_actions,
        risk_score=risk_score,
        strong_points=selected_strong,
        weak_points=selected_weak,
        expected_direction=expected_direction,
        comparison_rows=comparison_rows,
        matched_cases=all_matched,
        web_references=web_refs if web_refs else None
    )


@router.get("/top-judgments")
async def get_top_judgments():
    """Reads and returns cases from top_judgments.csv."""
    judgments = []
    try:
        csv_path = os.path.join("server", "data", "TopJudgement", "top_judgments.csv")
        if not os.path.exists(csv_path):
             csv_path = os.path.join("data", "TopJudgement", "top_judgments.csv")
        
        if os.path.exists(csv_path):
            with open(csv_path, mode='r', encoding='utf-8') as f:
                reader = csv.DictReader(f)
                for row in reader:
                    judgments.append(row)
                    if len(judgments) >= 50: # Limit for performance
                        break
        return {"results": judgments, "total": len(judgments)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/history")
async def get_analysis_history(limit: int = 20):
    """Retrieve past AI analysis logs from MongoDB."""
    try:
        from app.db.mongo import get_database
        mongo_db = get_database()
        if mongo_db is None:
            return {"logs": [], "message": "MongoDB not available"}
        cursor = mongo_db.analysis_logs.find(
            {}, {"_id": 0}
        ).sort("timestamp", -1).limit(limit)
        logs = await cursor.to_list(length=limit)
        return {"logs": logs, "total": len(logs)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
