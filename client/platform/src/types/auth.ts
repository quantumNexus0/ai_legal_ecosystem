export interface User {
  id: string;
  email: string;
  name: string;
  full_name?: string;
  role: 'admin' | 'lawyer' | 'user';
  profile_image_url?: string;
  phone?: string;
  office_address?: string;
  specialization?: string;
  experience_years?: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  login: (email: string, password: string) => Promise<void>;
  checkAuth: () => Promise<void>;
  logout: () => void;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData extends LoginFormData {
  name: string;
  confirmPassword: string;
  role: 'lawyer' | 'user';
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}