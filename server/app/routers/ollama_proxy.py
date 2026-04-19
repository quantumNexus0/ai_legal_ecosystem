import os
import httpx
import asyncio
from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import Optional, List

router = APIRouter(prefix="/api/v1/ai", tags=["AI - Ollama"])

OLLAMA_BASE = os.getenv("OLLAMA_HOST_URL", "http://localhost:11434")
OLLAMA_TIMEOUT = 120.0

class ChatMessage(BaseModel):
    role: str  # "user" | "assistant" | "system"
    content: str

class OllamaChatRequest(BaseModel):
    model: str = "llama3.2"
    messages: List[ChatMessage]
    stream: bool = False
    temperature: Optional[float] = 0.7
    system_prompt: Optional[str] = None  # override system prompt

class OllamaGenerateRequest(BaseModel):
    model: str = "llama3.2"
    prompt: str
    stream: bool = False

# ── Health check ──────────────────────────────────────────────────────────────
@router.get("/health")
async def ollama_health():
    """Ping Ollama. Frontend uses this to show Connected/Disconnected badge."""
    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            r = await client.get(f"{OLLAMA_BASE}/api/tags")
            if r.status_code == 200:
                data = r.json()
                models = [m["name"] for m in data.get("models", [])]
                return {
                    "status": "connected",
                    "ollama_url": OLLAMA_BASE,
                    "available_models": models,
                }
    except Exception as e:
        pass
    return {
        "status": "disconnected",
        "message": "Ollama is not reachable. Start it with: ollama serve",
        "ollama_url": OLLAMA_BASE,
        "available_models": [],
    }

# ── List available models ─────────────────────────────────────────────────────
@router.get("/models")
async def list_models():
    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            r = await client.get(f"{OLLAMA_BASE}/api/tags")
            r.raise_for_status()
            return r.json()
    except Exception:
        raise HTTPException(503, "Ollama unavailable. Run: ollama serve")

# ── Non-streaming chat (simple Q&A) ──────────────────────────────────────────
@router.post("/chat")
async def chat(req: OllamaChatRequest):
    messages = [m.dict() for m in req.messages]
    if req.system_prompt:
        messages.insert(0, {"role": "system", "content": req.system_prompt})

    payload = {
        "model": req.model,
        "messages": messages,
        "stream": False,
        "options": {"temperature": req.temperature},
    }
    try:
        async with httpx.AsyncClient(timeout=OLLAMA_TIMEOUT) as client:
            r = await client.post(f"{OLLAMA_BASE}/api/chat", json=payload)
            r.raise_for_status()
            return r.json()
    except httpx.ConnectError:
        raise HTTPException(503, detail={
            "error": "backend_not_connected",
            "message": "Ollama service is offline. Please start it with: ollama serve",
        })
    except httpx.TimeoutException:
        raise HTTPException(504, detail={"error": "timeout", "message": "Model took too long."})

# ── Streaming chat (token-by-token for real-time feel) ───────────────────────
@router.post("/chat/stream")
async def chat_stream(req: OllamaChatRequest):
    messages = [m.dict() for m in req.messages]
    if req.system_prompt:
        messages.insert(0, {"role": "system", "content": req.system_prompt})

    payload = {
        "model": req.model,
        "messages": messages,
        "stream": True,
        "options": {"temperature": req.temperature},
    }

    async def token_generator():
        try:
            async with httpx.AsyncClient(timeout=OLLAMA_TIMEOUT) as client:
                async with client.stream("POST", f"{OLLAMA_BASE}/api/chat", json=payload) as response:
                    async for chunk in response.aiter_bytes():
                        yield chunk
        except Exception as e:
            yield f'{{"error": "disconnected", "message": "{str(e)}"}}\n'.encode()

    return StreamingResponse(token_generator(), media_type="application/x-ndjson")

# ── Legal case analysis with NyayaAI prompt ──────────────────────────────────
NYAYA_SYSTEM_PROMPT = """You are NyayaAI, an expert Indian legal assistant trained on Indian law, 
IPC, CrPC, Constitution of India, and landmark Supreme Court and High Court judgments.

When analysing a legal case, always respond in this EXACT JSON format:
{
  "case_summary": "Brief 2-3 sentence summary of the case facts",
  "legal_issues": ["issue 1", "issue 2"],
  "applicable_laws": [
    {"section": "IPC 302", "description": "Punishment for murder", "relevance": "..."}
  ],
  "precedents": [
    {"case_name": "State vs X (2020)", "court": "Supreme Court", "relevance": "..."}
  ],
  "legal_strategy": ["step 1", "step 2"],
  "risk_assessment": {
    "score": 65,
    "level": "medium",
    "factors": ["factor 1"]
  },
  "recommended_actions": ["action 1"],
  "jurisdiction": "High Court / Supreme Court / District Court",
  "estimated_timeline": "6-12 months"
}

Always cite specific Indian laws. Never give vague answers. If facts are unclear, state assumptions.
Language: Respond in the same language the user writes in (Hindi or English)."""

@router.post("/analyze-case")
async def analyze_case(req: OllamaChatRequest):
    """NyayaAI legal case analysis with structured JSON output."""
    req.system_prompt = NYAYA_SYSTEM_PROMPT
    req.stream = False
    return await chat(req)
