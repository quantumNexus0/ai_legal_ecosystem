import api from './api';
import { LoginFormData, SignupFormData, User, AuthResponse } from '../types/auth';

export const authService = {
    login: async (data: LoginFormData): Promise<AuthResponse> => {
        const params = new URLSearchParams();
        params.append('username', data.email);
        params.append('password', data.password);

        // FastAPI expects form-data for OAuth2PasswordRequestForm
        const response = await api.post<AuthResponse>('/auth/login', params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data;
    },

    signup: async (data: SignupFormData): Promise<User> => {
        const response = await api.post<User>('/auth/signup', data);
        return response.data;
    },

    getCurrentUser: async (): Promise<User> => {
        const response = await api.get<User>('/users/me');
        return response.data;
    },
};
