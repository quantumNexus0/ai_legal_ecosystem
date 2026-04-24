// ============================================================
// NyayaAssist — MessagesPanel.tsx
// Real-time WebSocket messaging between lawyer and clients
// ============================================================

import { useState, useEffect, useRef } from "react";
import { useMessageStore } from "../../store/useMessageStore";
import api from "../../services/api";
import { Send, Search, Circle } from "lucide-react";

interface Conversation {
  id: number;
  name: string;
  role: string;
  last_message: string;
  last_message_time: string;
  unread_count: number;
  profile_image_url?: string;
  is_online?: boolean; // ✅ FIXED HERE
}

interface Message {
  id: number;
  sender_id: number;
  content: string;
  created_at: string;
  is_read: boolean;
}

export default function MessagesPanel({ user, sendMessage }: any) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvo, setActiveConvo] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [messagesLoading, setMessagesLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { realtimeMessages, markRead } = useMessageStore();

  useEffect(() => {
    fetchConversations();
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Append realtime messages
  useEffect(() => {
    if (!activeConvo || realtimeMessages.length === 0) return;

    const latest = realtimeMessages[realtimeMessages.length - 1];

    if (
      Number(latest.sender_id) === activeConvo.id ||
      (latest as any).receiver_id === activeConvo.id
    ) {
      setMessages((prev) => [...prev, latest]);
    }
  }, [realtimeMessages, activeConvo]);

  const fetchConversations = async () => {
    try {
      const res = await api.get("/messages/chats");
      setConversations(res.data);
    } catch {
      console.error("Failed to fetch conversations");
    }
  };

  const fetchMessages = async (convo: Conversation) => {
    setActiveConvo(convo);
    setMessagesLoading(true);

    try {
      const res = await api.get(`/messages/conversation/${convo.id}`);
      setMessages(res.data);
      markRead(convo.id);
      fetchConversations();
    } catch {
      setMessages([]);
    } finally {
      setMessagesLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || !activeConvo) return;

    const content = input.trim();
    setInput("");

    // Optimistic UI
    const optimistic: Message = {
      id: Date.now(),
      sender_id: Number(user.id),
      content,
      created_at: new Date().toISOString(),
      is_read: false,
    };

    setMessages((prev) => [...prev, optimistic]);
    try {
      await api.post("/messages", {
        receiver_id: activeConvo.id,
        content,
      });

      sendMessage({
        type: "message",
        receiver_id: activeConvo.id,
        content,
      });

      fetchConversations();
    } catch {
      // rollback
      setMessages((prev) => prev.filter((m) => m.id !== optimistic.id));
    }
  };

  const filtered = conversations.filter(
    (c) => !search || c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-5">
      {/* Conversations */}
      <div className="w-72 bg-white dark:bg-gray-800 rounded-xl border flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-sm font-semibold mb-3">Messages</h2>

          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search…"
              className="w-full pl-8 pr-3 py-2 text-xs border rounded-lg"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y">
          {filtered.map((c) => (
            <button
              key={c.id}
              onClick={() => fetchMessages(c)}
              className={`w-full p-3 text-left ${activeConvo?.id === c.id ? "bg-blue-50" : ""
                }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-blue-200 flex items-center justify-center text-xs font-semibold">
                    {c.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>

                  {/* ✅ Online indicator */}
                  {c.is_online && (
                    <Circle
                      size={8}
                      className="absolute bottom-0 right-0 fill-green-500 text-green-500"
                    />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="text-xs font-semibold truncate">
                      {c.name}
                    </span>

                    <span className="text-xs text-gray-400">
                      {c.last_message_time
                        ? new Date(c.last_message_time).toLocaleTimeString(
                          "en-IN",
                          { hour: "2-digit", minute: "2-digit" }
                        )
                        : ""}
                    </span>
                  </div>

                  <div className="flex justify-between mt-1">
                    <p className="text-xs truncate">{c.last_message}</p>

                    {c.unread_count > 0 && (
                      <span className="w-4 h-4 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                        {c.unread_count}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl border flex flex-col">
        {!activeConvo ? (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            Select a conversation
          </div>
        ) : (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m) => {
                const isMine = Number(m.sender_id) === Number(user?.id);

                return (
                  <div
                    key={m.id}
                    className={`flex ${isMine ? "justify-end" : "justify-start"
                      }`}
                  >
                    <div
                      className={`px-4 py-2 rounded-xl text-sm ${isMine ? "bg-blue-600 text-white" : "bg-gray-200"
                        }`}
                    >
                      {m.content}
                    </div>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleSend()
                }
                className="flex-1 border rounded px-3 py-2"
              />

              <button
                onClick={handleSend}
                className="bg-blue-600 text-white px-3 rounded"
              >
                <Send size={16} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}