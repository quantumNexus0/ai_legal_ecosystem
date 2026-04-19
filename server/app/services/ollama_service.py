import httpx
import json
import asyncio
from typing import AsyncGenerator, List, Dict, Any
from app.core.config import settings

class OllamaService:
    def __init__(self, base_url: str = None):
        self.base_url = base_url or settings.OLLAMA_BASE_URL

    async def check_connection(self) -> bool:
        """Check if Ollama server is reachable."""
        try:
            async with httpx.AsyncClient(timeout=2.0) as client:
                response = await client.get(f"{self.base_url}/api/tags")
                return response.status_code == 200
        except Exception:
            return False

    async def chat_stream(self, model: str, messages: List[Dict[str, str]]) -> AsyncGenerator[str, None]:
        """Stream chat responses from Ollama."""
        async with httpx.AsyncClient(timeout=None) as client:
            async with client.stream(
                "POST",
                f"{self.base_url}/api/chat",
                json={"model": model, "messages": messages, "stream": True}
            ) as response:
                if response.status_code != 200:
                    yield f"Error: Ollama returned status {response.status_code}"
                    return

                async for line in response.aiter_lines():
                    if not line:
                        continue
                    try:
                        data = json.loads(line)
                        if "message" in data and "content" in data["message"]:
                            yield data["message"]["content"]
                        if data.get("done"):
                            break
                    except json.JSONDecodeError:
                        continue

    async def query_simple(self, model: str, messages: List[Dict[str, str]]) -> str:
        """Get a non-streaming response from Ollama."""
        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.post(
                f"{self.base_url}/api/chat",
                json={"model": model, "messages": messages, "stream": False}
            )
            if response.status_code != 200:
                return f"Error: Ollama returned status {response.status_code}"
            
            data = response.json()
            return data.get("message", {}).get("content", "")

ollama_service = OllamaService()
