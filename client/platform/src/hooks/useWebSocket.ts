// client/platform/src/hooks/useWebSocket.ts
// WebSocket hook with auto-reconnect and secure first-message auth flow.
import { useEffect, useRef, useCallback, useState } from 'react';

interface Message {
  id: number;
  sender_id: number;
  content: string;
  timestamp: string;
}

export function useWebSocket(roomId: number | null) {
  const wsRef = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const reconnectTimer = useRef<ReturnType<typeof setTimeout>>();

  const connect = useCallback(() => {
    if (!roomId) return;
    const token = localStorage.getItem('access_token');
    if (!token) return;

    const BASE_WS = (import.meta.env.VITE_API_URL || 'http://localhost:8000')
      .replace('http', 'ws');

    // ── Issue 7 fix: NO token in the URL ──────────────────────────────────
    const ws = new WebSocket(`${BASE_WS}/ws/chat/${roomId}`);
    wsRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
      console.log(`✅ WebSocket connected to room ${roomId}`);
      // Send token as the first message (not in URL) to avoid access-log leaks
      ws.send(JSON.stringify({ type: 'auth', token }));
    };

    ws.onmessage = (event) => {
      try {
        const msg: Message = JSON.parse(event.data);
        setMessages((prev) => [...prev, msg]);
      } catch (e) {
        console.error('WS message parse error:', e);
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
      // Auto-reconnect after 3 seconds
      reconnectTimer.current = setTimeout(connect, 3000);
    };

    ws.onerror = (e) => {
      console.error('WebSocket error:', e);
      ws.close();
    };
  }, [roomId]);

  const sendMessage = useCallback((content: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ content }));
    }
  }, []);

  useEffect(() => {
    connect();
    return () => {
      clearTimeout(reconnectTimer.current);
      wsRef.current?.close();
    };
  }, [connect]);

  return { messages, sendMessage, isConnected };
}
