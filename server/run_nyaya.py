import uvicorn
from fastapi import FastAPI, Body, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import httpx
import json
import asyncio
from typing import AsyncGenerator, List, Dict, Any

app = FastAPI(title="Nyaya AI Minimal Backend")

# Enable CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

OLLAMA_BASE = "http://localhost:11434"

async def check_ollama_alive() -> bool:
    try:
        async with httpx.AsyncClient(timeout=2.0) as client:
            response = await client.get(f"{OLLAMA_BASE}/api/tags")
            return response.status_code == 200
    except Exception:
        return False

async def ollama_chat_stream(model: str, messages: List[Dict[str, str]]) -> AsyncGenerator[str, None]:
    async with httpx.AsyncClient(timeout=None) as client:
        try:
            async with client.stream(
                "POST",
                f"{OLLAMA_BASE}/api/chat",
                json={"model": model, "messages": messages, "stream": True}
            ) as response:
                if response.status_code != 200:
                    yield f"Error: Ollama (11434) returned {response.status_code}"
                    return
                async for line in response.aiter_lines():
                    if not line: continue
                    data = json.loads(line)
                    if "message" in data and "content" in data["message"]:
                        yield data["message"]["content"]
                    if data.get("done"): break
        except Exception as e:
            yield f"Error connecting to Ollama: {str(e)}"

@app.get("/api/nyaya/status")
async def get_status():
    connected = await check_ollama_alive()
    return {"connected": connected}

@app.post("/api/nyaya/chat")
async def chat(payload: Dict[str, Any] = Body(...)):
    model = payload.get("model", "llama3.2")
    messages = payload.get("messages", [])
    stream = payload.get("stream", True)
    
    if stream:
        return StreamingResponse(ollama_chat_stream(model, messages), media_type="text/plain")
    else:
        async with httpx.AsyncClient(timeout=60.0) as client:
            res = await client.post(f"{OLLAMA_BASE}/api/chat", json={"model": model, "messages": messages, "stream": False})
            return res.json()

@app.post("/api/nyaya/analyze")
async def analyze(payload: Dict[str, Any] = Body(...)):
    model = payload.get("model", "llama3.2")
    prompt = payload.get("prompt", "")
    system = payload.get("system", "")
    messages = [{"role": "system", "content": system}, {"role": "user", "content": prompt}]
    async with httpx.AsyncClient(timeout=120.0) as client:
        res = await client.post(f"{OLLAMA_BASE}/api/chat", json={"model": model, "messages": messages, "stream": False})
        data = res.json()
        return {"analysis": data.get("message", {}).get("content", "")}

@app.post("/api/nyaya/draft")
async def draft(payload: Dict[str, Any] = Body(...)):
    model = payload.get("model", "llama3.2")
    prompt = payload.get("prompt", "")
    system = payload.get("system", "")
    messages = [{"role": "system", "content": system}, {"role": "user", "content": prompt}]
    async with httpx.AsyncClient(timeout=120.0) as client:
        res = await client.post(f"{OLLAMA_BASE}/api/chat", json={"model": model, "messages": messages, "stream": False})
        data = res.json()
        return {"draft": data.get("message", {}).get("content", "")}

if __name__ == "__main__":
    print("Starting Nyaya AI Minimal Backend on http://localhost:8080")
    uvicorn.run(app, host="0.0.0.0", port=8080)
