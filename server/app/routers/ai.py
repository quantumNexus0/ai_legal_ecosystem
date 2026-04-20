import os, httpx
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/api/ai", tags=["AI"])

OLLAMA_URL    = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
DEFAULT_MODEL = os.getenv("OLLAMA_MODEL", "deepseek-r1:latest")
ALL_MODELS    = os.getenv("OLLAMA_MODELS", "deepseek-r1:latest,mistral:latest,llama3.2:latest").split(",")
ACTIVE_MODEL  = os.getenv("ACTIVE_AI_MODEL", "ollama")
GEMINI_KEY    = os.getenv("LLM_API_KEY", "")
GEMINI_MODEL  = os.getenv("LLM_MODEL", "gemini-1.5-flash")

SYSTEM_PROMPT = """Tu NyayaAssist hai — India ka AI legal assistant.
Sirf Indian law ke baare mein jawab de.
Relevant Act/Section cite kar. Simple Hindi ya English mein samjha.
Akhir mein likho: 'Apne specific case ke liye ek lawyer se milna zaroori hai.'"""

class ChatRequest(BaseModel):
    message: str
    model: str = DEFAULT_MODEL
    context: str = ""

class ChatResponse(BaseModel):
    reply: str
    model_used: str

# ─── Ollama ─────────────────────────────────────
async def call_ollama(prompt: str, model: str) -> str:
    if model not in ALL_MODELS:
        model = DEFAULT_MODEL
    async with httpx.AsyncClient(timeout=120.0) as client:
        try:
            resp = await client.post(
                f"{OLLAMA_URL}/api/generate",
                json={
                    "model": model,
                    "prompt": f"{SYSTEM_PROMPT}\n\nUser: {prompt}\nAssistant:",
                    "stream": False,
                }
            )
            resp.raise_for_status()
            return resp.json().get("response", "").strip()
        except httpx.ConnectError:
            raise HTTPException(
                status_code=503,
                detail=f"Ollama nahi mila — kya localhost:11434 pe chal raha hai?"
            )

# ─── Gemini ─────────────────────────────────────
async def call_gemini(prompt: str) -> str:
    if not GEMINI_KEY:
        raise HTTPException(status_code=503, detail="LLM_API_KEY .env mein set nahi hai")
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{GEMINI_MODEL}:generateContent?key={GEMINI_KEY}"
    async with httpx.AsyncClient(timeout=60.0) as client:
        resp = await client.post(url, json={
            "contents": [{
                "parts": [{"text": SYSTEM_PROMPT + "\n\nUser: " + prompt}]
            }]
        })
        resp.raise_for_status()
        return resp.json()["candidates"][0]["content"]["parts"][0]["text"]

# ─── Main endpoint ───────────────────────────────
@router.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    full_message = req.message
    if req.context:
        full_message = f"Context:\n{req.context}\n\nQuestion: {req.message}"

    if ACTIVE_MODEL == "gemini":
        reply = await call_gemini(full_message)
        return ChatResponse(reply=reply, model_used=f"gemini/{GEMINI_MODEL}")
    else:
        reply = await call_ollama(full_message, req.model)
        return ChatResponse(reply=reply, model_used=req.model)

# ─── Models list ─────────────────────────────────
@router.get("/models")
async def get_models():
    return {
        "ollama_models": ALL_MODELS,
        "gemini_model": GEMINI_MODEL,
        "active_provider": ACTIVE_MODEL,
        "default_ollama": DEFAULT_MODEL
    }

# ─── Status check ────────────────────────────────
@router.get("/status")
async def status():
    ollama_ok = False
    try:
        async with httpx.AsyncClient(timeout=3.0) as c:
            r = await c.get(f"{OLLAMA_URL}/api/tags")
            ollama_ok = r.status_code == 200
    except Exception:
        pass
    return {
        "active_provider": ACTIVE_MODEL,
        "ollama_reachable": ollama_ok,
        "gemini_key_set": bool(GEMINI_KEY),
        "available_ollama_models": ALL_MODELS
    }