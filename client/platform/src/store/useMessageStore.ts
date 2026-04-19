// ============================================================
// NyayaAssist — useMessageStore.ts  (Zustand)
// ============================================================
import { create } from "zustand";
import api from "../services/api";

interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  content: string;
  created_at: string;
  is_read: boolean;
}

interface MessageState {
  realtimeMessages: Message[];
  unreadCount: number;
  addMessage: (msg: Message) => void;
  markRead: (userId: number) => void;
  setUnreadCount: (count: number) => void;
}

export const useMessageStore = create<MessageState>((set) => ({
  realtimeMessages: [],
  unreadCount: 0,

  addMessage: (msg) =>
    set((state) => ({
      realtimeMessages: [...state.realtimeMessages.slice(-99), msg], // keep last 100
      unreadCount: state.unreadCount + 1,
    })),

  markRead: (_userId) =>
    set((state) => ({
      unreadCount: Math.max(0, state.unreadCount - 1),
    })),

  setUnreadCount: (count) => set({ unreadCount: count }),
}));

// ============================================================
// NyayaAssist — useAppointmentStore.ts  (Zustand)
// ============================================================
import { create as createAppt } from "zustand";

interface Appointment {
  id: number;
  client_name: string;
  client_phone?: string;
  scheduled_at: string;
  meeting_type: string;
  location: string;
  status: "confirmed" | "pending" | "cancelled";
  notes?: string;
}

interface AppointmentState {
  appointments: Appointment[];
  loading: boolean;
  fetchTodayAppointments: () => Promise<void>;
  fetchAppointments: (params?: { limit?: number }) => Promise<void>;
}

export const useAppointmentStore = createAppt<AppointmentState>((set) => ({
  appointments: [],
  loading: false,

  fetchTodayAppointments: async () => {
    set({ loading: true });
    try {
      const today = new Date().toISOString().split("T")[0];
      const res = await api.get("/api/appointments", {
        params: { date: today, limit: 10 },
      });
      set({ appointments: res.data });
    } finally {
      set({ loading: false });
    }
  },

  fetchAppointments: async (params = {}) => {
    set({ loading: true });
    try {
      const res = await api.get("/api/appointments", { params });
      set({ appointments: res.data });
    } finally {
      set({ loading: false });
    }
  },
}));
