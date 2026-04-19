// client/src/lib/ollamaClient.ts

const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export type OllamaStatus = "checking" | "connected" | "disconnected";

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface OllamaHealthResponse {
  status: "connected" | "disconnected";
  available_models: string[];
  message?: string;
}

// ── Health check ─────────────────────────────────────────────────────────────
export async function checkOllamaHealth(): Promise<OllamaHealthResponse> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/v1/ai/health`, {
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) throw new Error("Backend returned error");
    return await res.json();
  } catch {
    return {
      status: "disconnected",
      available_models: [],
      message: "Backend not reachable",
    };
  }
}

// ── List models ───────────────────────────────────────────────────────────────
export async function fetchAvailableModels(): Promise<string[]> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/v1/ai/models`);
    if (!res.ok) return [];
    const data = await res.json();
    return (data.models || []).map((m: { name: string }) => m.name);
  } catch {
    return [];
  }
}

// ── Chat (non-streaming) ──────────────────────────────────────────────────────
export async function chatWithOllama(
  messages: ChatMessage[],
  model = "llama3.2",
  temperature = 0.7
): Promise<string> {
  const res = await fetch(`${BACKEND_URL}/api/v1/ai/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model, messages, stream: false, temperature }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    if (err?.detail?.error === "backend_not_connected") {
      throw new Error("OLLAMA_OFFLINE");
    }
    throw new Error(err?.detail?.message || "Chat failed");
  }

  const data = await res.json();
  return data?.message?.content ?? "";
}

// ── Streaming chat ────────────────────────────────────────────────────────────
export async function* streamChatWithOllama(
  messages: ChatMessage[],
  model = "llama3.2",
  onToken?: (token: string) => void
): AsyncGenerator<string> {
  const res = await fetch(`${BACKEND_URL}/api/v1/ai/chat/stream`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model, messages, stream: true }),
  });

  if (!res.body) throw new Error("No stream body");

  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const lines = decoder.decode(value).split("\n").filter(Boolean);
    for (const line of lines) {
      try {
        const parsed = JSON.parse(line);
        if (parsed.error) throw new Error(parsed.message || "Stream error");
        const token = parsed?.message?.content ?? "";
        if (token) {
          onToken?.(token);
          yield token;
        }
      } catch {
        // skip malformed chunks
      }
    }
  }
}

// ── Legal case analysis (NyayaAI) ─────────────────────────────────────────────
export async function analyzeCase(
  caseDescription: string,
  model = "llama3.2"
): Promise<object> {
  const res = await fetch(`${BACKEND_URL}/api/v1/ai/analyze-case`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: caseDescription }],
      stream: false,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.detail?.message || "Analysis failed");
  }

  const data = await res.json();
  const raw = data?.message?.content ?? "{}";

  // Strip markdown code fences if model wraps JSON in ```json ... ```
  const cleaned = raw.replace(/```json\n?/g, "").replace(/```/g, "").trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    return { raw_response: raw };
  }
}
