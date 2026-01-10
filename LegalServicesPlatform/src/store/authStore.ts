import { create } from 'zustand';
import type { AuthState } from '../types/auth';
import { authService } from '../services/authService';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isInitialized: false,
  login: async (email: string, password: string) => {
    try {
      const { access_token } = await authService.login({ email, password });
      localStorage.setItem('token', access_token);

      const user = await authService.getCurrentUser();

      set({
        user: {
          id: String(user.id),
          email: user.email,
          name: user.full_name || user.email,
          role: user.role as 'admin' | 'lawyer' | 'user',
          profile_image_url: user.profile_image_url,
          phone: user.phone,
          office_address: user.office_address,
          specialization: user.specialization,
          experience_years: user.experience_years
        },
        isAuthenticated: true,
        isInitialized: true
      });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ user: null, isAuthenticated: false, isInitialized: true });
      return;
    }
    try {
      const user = await authService.getCurrentUser();
      set({
        user: {
          id: String(user.id),
          email: user.email,
          name: user.full_name || user.email,
          role: user.role as 'admin' | 'lawyer' | 'user',
          profile_image_url: user.profile_image_url,
          phone: user.phone,
          office_address: user.office_address,
          specialization: user.specialization,
          experience_years: user.experience_years
        },
        isAuthenticated: true,
        isInitialized: true
      });
    } catch (error) {
      console.error('Check auth error:', error);
      localStorage.removeItem('token');
      set({ user: null, isAuthenticated: false, isInitialized: true });
    }
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, isAuthenticated: false, isInitialized: false });
  },
}));

export default useAuthStore;