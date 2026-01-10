import api from './api';

export interface ProfileUpdate {
    full_name?: string;
    email?: string;
    phone?: string;
}

export interface ImageUpdate {
    profile_image_url: string;
}

export const profileService = {
    updateProfile: async (data: ProfileUpdate) => {
        const response = await api.put('/users/me/profile', data);
        return response.data;
    },

    updateProfileImage: async (imageUrl: string) => {
        const response = await api.put('/users/me/profile/image', {
            profile_image_url: imageUrl,
        });
        return response.data;
    },
};
