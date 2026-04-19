// ============================================================
// NyayaAssist — useWebSocket.ts
// Auto-reconnecting WebSocket hook with exponential backoff
// ============================================================
import { useEffect, useRef, useState, useCallback } from "react";

type WsStatus = "connected" | "connecting" | "disconnected";

interface UseWebSocketOptions {
  userId: number | string;
  token: string;
  onMessage?: (msg: any) => void;
  onCaseUpdate?: () => void;
}

interface UseWebSocketReturn {
  wsStatus: WsStatus;
  sendMessage: (payload: object) => void;
}

const WS_BASE = (import.meta as any).env.VITE_WS_URL ?? "ws://localhost:8000";
const MAX_RECONNECT_DELAY = 30_000;

export function useWebSocket({
  userId,
  token,
  onMessage,
  onCaseUpdate,
}: UseWebSocketOptions): UseWebSocketReturn {
  const ws = useRef<WebSocket | null>(null);
  const reconnectDelay = useRef(1000);
  const reconnectTimer = useRef<ReturnType<typeof setTimeout>>();
  const isMounted = useRef(true);
  const [wsStatus, setWsStatus] = useState<WsStatus>("connecting");

  const connect = useCallback(() => {
    if (!userId || !token || !isMounted.current) return;

    setWsStatus("connecting");
    const url = `${WS_BASE}/ws/chat/${userId}`;
    const socket = new WebSocket(url);
    ws.current = socket;

    socket.onopen = () => {
      if (!isMounted.current) return;
      
      // Step 1: Send Auth Frame (required by target backend)
      socket.send(JSON.stringify({ type: "auth", token }));

      setWsStatus("connected");
      reconnectDelay.current = 1000;
      clearTimeout(reconnectTimer.current);

      // Heartbeat
      const heartbeat = setInterval(() => {
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify({ type: "ping" }));
        } else {
          clearInterval(heartbeat);
        }
      }, 25_000);
    };

    socket.onmessage = (event) => {
      if (!isMounted.current) return;
      try {
        const data = JSON.parse(event.data);
        switch (data.type) {
          case "message":
            onMessage?.(data.payload);
            break;
          case "case_update":
            onCaseUpdate?.();
            break;
          case "pong":
            break; // heartbeat ack
          default:
            console.log("[WS] Unknown event:", data.type);
        }
      } catch (e) {
        console.error("[WS] Parse error:", e);
      }
    };

    socket.onclose = (event) => {
      if (!isMounted.current) return;
      setWsStatus("disconnected");
      ws.current = null;

      if (event.code !== 1000) {
        // Abnormal close — reconnect with exponential backoff
        console.warn(`[WS] Closed (${event.code}). Reconnecting in ${reconnectDelay.current}ms`);
        reconnectTimer.current = setTimeout(() => {
          reconnectDelay.current = Math.min(reconnectDelay.current * 2, MAX_RECONNECT_DELAY);
          connect();
        }, reconnectDelay.current);
      }
    };

    socket.onerror = () => {
      console.error("[WS] Error encountered");
      socket.close();
    };
  }, [userId, token, onMessage, onCaseUpdate]);

  useEffect(() => {
    isMounted.current = true;
    connect();
    return () => {
      isMounted.current = false;
      clearTimeout(reconnectTimer.current);
      ws.current?.close(1000, "Component unmounted");
    };
  }, [connect]);

  const sendMessage = useCallback((payload: object) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(payload));
    } else {
      console.warn("[WS] Cannot send — socket not open");
    }
  }, []);

  return { wsStatus, sendMessage };
}
