import api from './api';

export interface Lawyer {
    id: number;
    full_name: string;
    email: string;
    specialization: string | null;
    experience_years: number | null;
    rating: number;
    cases_handled: number;
    profile_image_url: string | null;
    office_address: string | null;
    phone: string | null;
}

export interface LawyerProfileUpdate {
    specialization?: string;
    experience_years?: number;
    profile_image_url?: string;
    office_address?: string;
}

export const lawyerService = {
    fetchLawyers: async (): Promise<Lawyer[]> => {
        const response = await api.get<Lawyer[]>('/lawyers');
        return response.data;
    },

    updateProfile: async (data: LawyerProfileUpdate) => {
        const response = await api.put('/users/me/lawyer-profile', data);
        return response.data;
    },
};
