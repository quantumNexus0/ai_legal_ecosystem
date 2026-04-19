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

  useEffect(() => { fetchConversations(); }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Append realtime messages to active conversation
  useEffect(() => {
    if (!activeConvo || realtimeMessages.length === 0) return;
    const latest = realtimeMessages[realtimeMessages.length - 1];
    if (Number(latest.sender_id) === activeConvo.id || (latest as any).receiver_id === activeConvo.id) {
      setMessages(prev => [...prev, latest]);
    }
  }, [realtimeMessages, activeConvo]);

  const fetchConversations = async () => {
    try {
      const res = await api.get("/messages/chats");
      setConversations(res.data);
    } catch {
      // silent
    }
  };

  const fetchMessages = async (convo: Conversation) => {
    setActiveConvo(convo);
    setMessagesLoading(true);
    try {
      const res = await api.get(`/messages/conversation/${convo.id}`);
      setMessages(res.data);
      markRead(convo.id);
      fetchConversations(); // refresh unread badge
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

    // Optimistic update
    const optimistic: Message = {
      id: Date.now(),
      sender_id: Number(user.id),
      content,
      created_at: new Date().toISOString(),
      is_read: false,
    };
    setMessages(prev => [...prev, optimistic]);

    try {
      // Send via REST
      await api.post("/messages", {
        receiver_id: activeConvo.id,
        content,
      });
      // Also notify via WS for real-time delivery
      sendMessage({ type: "message", receiver_id: activeConvo.id, content });
      fetchConversations();
    } catch (e) {
      // Roll back optimistic update on failure
      setMessages(prev => prev.filter(m => m.id !== optimistic.id));
    }
  };

  const filtered = conversations.filter(c =>
    !search || c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-5">
      {/* Conversations list */}
      <div className="w-72 flex-shrink-0 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="font-semibold text-gray-900 dark:text-white text-sm mb-3">Messages</h2>
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search…"
              className="w-full pl-8 pr-3 py-2 text-xs border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700/50">
          {filtered.map(c => (
              <button
                key={c.id}
                onClick={() => fetchMessages(c)}
                className={`w-full p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                  activeConvo?.id === c.id ? "bg-blue-50 dark:bg-blue-900/20" : ""
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="relative flex-shrink-0">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 flex items-center justify-center text-xs font-semibold text-blue-700 dark:text-blue-300">
                      {c.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </div>
                  {c.is_online && (
                    <Circle size={8} className="absolute bottom-0 right-0 fill-green-500 text-green-500" />
                  )}
                </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs font-semibold text-gray-900 dark:text-white truncate">{c.name}</span>
                      <span className="text-xs text-gray-400 dark:text-gray-500 flex-shrink-0 ml-1">
                        {c.last_message_time ? new Date(c.last_message_time).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) : ""}
                      </span>
                    </div>
                  <div className="flex justify-between items-center mt-0.5">
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-36">{c.last_message}</p>
                    {c.unread_count > 0 && (
                      <span className="w-4 h-4 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center font-semibold flex-shrink-0">
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

      {/* Chat window */}
      <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col">
        {!activeConvo ? (
          <div className="flex-1 flex items-center justify-center text-gray-400 dark:text-gray-500">
            <div className="text-center">
              <div className="text-4xl mb-3">💬</div>
              <div className="text-sm font-medium">Select a conversation</div>
              <div className="text-xs mt-1">to start messaging</div>
            </div>
          </div>
        ) : (
          <>
            {/* Chat header */}
            <div className="px-5 py-3.5 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 flex items-center justify-center text-xs font-semibold text-blue-700 dark:text-blue-300">
                  {activeConvo.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
              </div>
              <div>
                <div className="font-semibold text-sm text-gray-900 dark:text-white">{activeConvo.name}</div>
                <div className="text-xs text-gray-400 dark:text-gray-500">
                  {activeConvo.role}
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {messagesLoading ? (
                <div className="flex justify-center"><div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" /></div>
              ) : messages.map((m) => {
                const isMine = Number(m.sender_id) === Number(user?.id);
                return (
                  <div key={m.id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2.5 rounded-2xl text-sm ${
                      isMine
                        ? "bg-blue-600 text-white rounded-br-sm"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-sm"
                    }`}>
                      <p className="leading-relaxed">{m.content}</p>
                      <p className={`text-xs mt-1 ${isMine ? "text-blue-200" : "text-gray-400 dark:text-gray-500"}`}>
                        {new Date(m.created_at).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                        {isMine && <span className="ml-1">{m.is_read ? "✓✓" : "✓"}</span>}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-5 py-3.5 border-t border-gray-200 dark:border-gray-700 flex gap-3 items-center">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && !e.shiftKey && handleSend()}
                placeholder="Type a message… (Enter to send)"
                className="flex-1 px-4 py-2.5 text-sm border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="p-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-xl transition-colors"
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
