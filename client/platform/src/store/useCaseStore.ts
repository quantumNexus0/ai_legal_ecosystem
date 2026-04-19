// ============================================================
// NyayaAssist — useCaseStore.ts  (Zustand)
// ============================================================
import { create } from "zustand";
import api from "../services/api";

interface Case {
  id: number;
  client_name: string;
  client_phone?: string;
  case_type: string;
  court: string;
  status: "active" | "hearing" | "pending" | "closed";
  urgency: "normal" | "high" | "urgent";
  next_hearing_date?: string;
  summary?: string;
  risk_score?: number;
  created_at: string;
}

interface CaseFetchParams {
  status?: string;
  limit?: number;
  skip?: number;
}

interface CaseState {
  cases: Case[];
  loading: boolean;
  error: string | null;
  fetchCases: (params: CaseFetchParams) => Promise<void>;
  refreshCases: () => Promise<void>;
  _lastParams: CaseFetchParams;
}

export const useCaseStore = create<CaseState>((set, get) => ({
  cases: [],
  loading: false,
  error: null,
  _lastParams: {},

  fetchCases: async (params) => {
    set({ loading: true, error: null, _lastParams: params });
    try {
      const res = await api.get("/api/cases", { params });
      set({ cases: res.data, loading: false });
    } catch (e: any) {
      set({ error: e.message ?? "Failed to load cases", loading: false });
    }
  },

  refreshCases: async () => {
    const { _lastParams, fetchCases } = get();
    await fetchCases(_lastParams);
  },
}));
