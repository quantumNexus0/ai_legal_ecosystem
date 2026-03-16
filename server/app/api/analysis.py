from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import os
import requests
import json
from datetime import datetime
from app.services.search_service import search_service
from app.api.deps import get_mongo_db

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

    # Combine both contexts
    full_context = f"--- EXTERNAL WEB SEARCH (n8n) ---\n{n8n_context}\n\n--- LOCAL DATABASE (RAG) ---\n{rag_context}"
    
    from app.services.llm_service import llm_service
    
    system_prompt = """
    You are NyayaAssist, an advanced Legal AI for Indian Law. 
    Analyze the provided case facts using the Context provided (External Web Results + Local Database).
    
    DYNAMIC SYNTHESIS RULE: 
    1. If the [Context] provides specific case names or statutes, PRIORITIZE them and CITE them.
    2. If the [Context] is sparse or does not contain direct matches, use your pre-trained expert knowledge of the Indian Penal Code (IPC), CrPC, and Indian Constitutional Law to provide a "Calculated Assessment" and "Strategic Advice". 
    Never say "I don't know" in the analysis report; provide the best possible legal guidance based on the facts.
    
    Output JSON with these exact keys:
    1. **analysis_report**: Detailed markdown report citing specific laws/principles.
    2. **recommended_actions**: List of 3-5 specific next steps.
    3. **risk_score**: Integer 0-100 (Success Probability).
    4. **strong_points**: List of 3-4 key legal strengths/arguments for the user.
    5. **weak_points**: List of 3-4 key risks/weaknesses.
    6. **expected_direction**: 1-2 sentence executive summary.
    7. **comparison_rows**: List of objects for the "Precedent Comparison Matrix". 
       Each object: {"parameter": "...", "user_case": "...", "court_case": "...", "similarity": 0-100}.
       Parameters should include: "Facts", "Legal Issue", "Stage", "Parties", "Applicable Law".
    
    Return JSON format exactly as:
    {
        "analysis_report": "markdown string...",
        "recommended_actions": ["action 1", "action 2"],
        "risk_score": 75,
        "strong_points": ["Strength A", "Strength B"],
        "weak_points": ["Weakness A", "Weakness B"],
        "expected_direction": "The case leans in favor of...",
        "comparison_rows": [
            {"parameter": "Facts", "user_case": "...", "court_case": "...", "similarity": 80},
            {"parameter": "Legal Issue", "user_case": "...", "court_case": "...", "similarity": 90}
        ]
    }
    """
    
    user_prompt = f"""
    CASE DETAILS:
    Facts: {request.facts}
    Parties: {request.parties}
    Stage: {request.stage}
    Issues: {request.issues}
    
    LEGAL CONTEXT (Use this to build the 'court_case' side of the comparison):
    {full_context}
    """
    
    # Call the LLM (OpenAI / Gemini / Ollama)
    llm_response = llm_service.generate_analysis(system_prompt, user_prompt)
    
    if "error" in llm_response:
        # Graceful error handling
        risk_score = 0
        analysis_report = f"## Analysis Failed\n\nAI Service Error: {llm_response['error']}. Please check your API keys."
        recommended_actions = ["Retry analysis"]
        strong_points = []
        weak_points = []
        expected_direction = "Analysis could not be generated."
        comparison_rows = []
    else:
        analysis_report = llm_response.get("analysis_report", "Analysis generation returned empty.")
        recommended_actions = llm_response.get("recommended_actions", [])
        risk_score = llm_response.get("risk_score", 50)
        strong_points = llm_response.get("strong_points", [])
        weak_points = llm_response.get("weak_points", [])
        expected_direction = llm_response.get("expected_direction", "No summary available.")
        comparison_rows = llm_response.get("comparison_rows", [])
    
    # Combine precedents for display
    all_matched_cases = external_precedents + local_precedents

    # Save analysis to MongoDB (fire-and-forget, don't break if MongoDB is down)
    try:
        from app.db.mongo import get_database
        mongo_db = get_database()
        if mongo_db is not None:
            await mongo_db.analysis_logs.insert_one({
                "facts": request.facts,
                "parties": request.parties,
                "issues": request.issues,
                "stage": request.stage,
                "analysis": analysis_report,
                "risk_score": risk_score,
                "strong_points": strong_points,
                "weak_points": weak_points,
                "expected_direction": expected_direction,
                "recommended_actions": recommended_actions,
                "timestamp": datetime.utcnow()
            })
    except Exception as log_err:
        print(f"MongoDB log failed (non-critical): {log_err}")

    return CaseAnalysisResponse(
        analysis=analysis_report,
        recommended_actions=recommended_actions,
        risk_score=risk_score,
        strong_points=strong_points,
        weak_points=weak_points,
        expected_direction=expected_direction,
        comparison_rows=comparison_rows,
        matched_cases=all_matched_cases,
        web_references=web_refs if web_refs else None
    )


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
