import api from './api';

export interface AdminStats {
    total_users: number;
    active_lawyers: number;
    total_cases: number;
    pending_approvals: number;
}

export interface LawyerStats {
    active_cases: number;
    total_clients: number;
    appointments_today: number;
    hours_worked: number;
}

export const dashboardService = {
    getAdminStats: async (): Promise<AdminStats> => {
        const response = await api.get<AdminStats>('/admin/stats');
        return response.data;
    },

    getRecentUsers: async () => {
        const response = await api.get('/admin/users/recent');
        return response.data;
    },

    getActiveLawyers: async () => {
        const response = await api.get('/admin/lawyers/active');
        return response.data;
    },

    getLawyerStats: async (): Promise<LawyerStats> => {
        const response = await api.get<LawyerStats>('/lawyers/me/stats');
        return response.data;
    },

    getLawyerCases: async () => {
        const response = await api.get('/lawyers/me/cases');
        return response.data;
    },

    getLawyerAppointments: async () => {
        const response = await api.get('/lawyers/me/appointments');
        return response.data;
    },

    sendLawyerRequest: async (lawyerId: number, message: string) => {
        const response = await api.post(`/lawyers/${lawyerId}/request`, null, {
            params: { message }
        });
        return response.data;
    },

    createCase: async (caseData: any) => {
        const response = await api.post('/lawyers/me/cases', caseData);
        return response.data;
    },

    createAppointment: async (appointmentData: any) => {
        const response = await api.post('/lawyers/me/appointments', appointmentData);
        return response.data;
    },

    deleteCase: async (caseId: number) => {
        const response = await api.delete(`/lawyers/me/cases/${caseId}`);
        return response.data;
    },

    deleteAppointment: async (appointmentId: number) => {
        const response = await api.delete(`/lawyers/me/appointments/${appointmentId}`);
        return response.data;
    }
};
