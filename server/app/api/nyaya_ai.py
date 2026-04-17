from fastapi import APIRouter, HTTPException, Body
from fastapi.responses import StreamingResponse
from app.services.ollama_service import ollama_service
from typing import List, Dict, Any

router = APIRouter()

@router.get("/status")
async def get_status():
    """Check if Ollama is connected."""
    connected = await ollama_service.check_connection()
    return {"connected": connected}

@router.post("/chat")
async def chat(
    payload: Dict[str, Any] = Body(...)
):
    """
    Proxy chat request to Ollama.
    Expects: { "model": "...", "messages": [...], "stream": bool }
    """
    model = payload.get("model", "llama3.2")
    messages = payload.get("messages", [])
    stream = payload.get("stream", True)

    if stream:
        return StreamingResponse(
            ollama_service.chat_stream(model, messages),
            media_type="text/event-stream"
        )
    else:
        content = await ollama_service.query_simple(model, messages)
        return {"message": {"content": content}}

@router.post("/analyze")
async def analyze(
    payload: Dict[str, Any] = Body(...)
):
    """
    Dedicated endpoint for case analysis.
    """
    model = payload.get("model", "llama3.2")
    prompt = payload.get("prompt", "")
    system = payload.get("system", "")

    messages = []
    if system:
        messages.append({"role": "system", "content": system})
    messages.append({"role": "user", "content": prompt})

    content = await ollama_service.query_simple(model, messages)
    return {"analysis": content}

@router.post("/draft")
async def draft(
    payload: Dict[str, Any] = Body(...)
):
    """
    Dedicated endpoint for document drafting.
    """
    model = payload.get("model", "llama3.2")
    prompt = payload.get("prompt", "")
    system = payload.get("system", "")

    messages = []
    if system:
        messages.append({"role": "system", "content": system})
    messages.append({"role": "user", "content": prompt})

    content = await ollama_service.query_simple(model, messages)
    return {"draft": content}
