import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '../../store/authStore';
import { profileService } from '../../services/profileService';
import { lawyerService } from '../../services/lawyerService';

const profileSchema = z.object({
    full_name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    profile_image_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
    // Lawyer-specific fields
    specialization: z.string().optional(),
    experience_years: z.number().min(0).optional(),
    phone: z.string().optional().or(z.literal('')),
    office_address: z.string().optional().or(z.literal('')),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const ProfileEdit = () => {
    const { user, checkAuth } = useAuthStore();
    const [successMessage, setSuccessMessage] = useState('');
    const [imagePreview, setImagePreview] = useState(user?.profile_image_url || '');

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        watch,
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            full_name: user?.full_name || user?.name || '',
            email: user?.email || '',
            profile_image_url: user?.profile_image_url || '',
            specialization: user?.specialization || '',
            experience_years: user?.experience_years || 0,
            phone: user?.phone || '',
            office_address: user?.office_address || '',
        },
    });

    const imageUrl = watch('profile_image_url');

    React.useEffect(() => {
        if (imageUrl && imageUrl.startsWith('http')) {
            setImagePreview(imageUrl);
        }
    }, [imageUrl]);

    const onSubmit = async (data: ProfileFormData) => {
        try {
            setSuccessMessage('');

            // Update basic profile
            await profileService.updateProfile({
                full_name: data.full_name,
                email: data.email,
                phone: data.phone,
            });

            // Update profile image if provided
            if (data.profile_image_url) {
                await profileService.updateProfileImage(data.profile_image_url);
            }

            // Update lawyer profile if lawyer
            if (user?.role === 'lawyer' && (data.specialization || data.experience_years)) {
                await lawyerService.updateProfile({
                    specialization: data.specialization,
                    experience_years: data.experience_years,
                    profile_image_url: data.profile_image_url,
                    office_address: data.office_address,
                });
            }

            // Refresh user data
            await checkAuth();
            setSuccessMessage('Profile updated successfully!');
        } catch (error: any) {
            console.error('Profile update failed:', error);
            setError('root', {
                type: 'manual',
                message: error.response?.data?.detail || 'Profile update failed',
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Profile</h1>

            {successMessage && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-green-800">{successMessage}</p>
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white shadow-md rounded-lg p-6">
                {/* Basic Information */}
                <div className="border-b pb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <input
                                {...register('full_name')}
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            {errors.full_name && (
                                <p className="mt-1 text-sm text-red-600">{errors.full_name.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                {...register('email')}
                                type="email"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                Phone Number
                            </label>
                            <input
                                {...register('phone')}
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
                        </div>
                    </div>
                </div>

                {/* Profile Image */}
                <div className="border-b pb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile Image</h2>

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="profile_image_url" className="block text-sm font-medium text-gray-700">
                                Image URL
                            </label>
                            <input
                                {...register('profile_image_url')}
                                type="text"
                                placeholder="https://example.com/image.jpg"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            {errors.profile_image_url && (
                                <p className="mt-1 text-sm text-red-600">{errors.profile_image_url.message}</p>
                            )}
                            <p className="mt-1 text-xs text-gray-500">
                                Paste an image URL from Imgur, Cloudinary, or any public image host
                            </p>
                        </div>

                        {imagePreview && (
                            <div>
                                <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                                <img
                                    src={imagePreview}
                                    alt="Profile preview"
                                    className="w-32 h-32 rounded-full object-cover border-2 border-gray-200"
                                    onError={() => setImagePreview('')}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Lawyer-specific fields */}
                {user?.role === 'lawyer' && (
                    <div className="border-b pb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Lawyer Information</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">
                                    Specialization
                                </label>
                                <input
                                    {...register('specialization')}
                                    type="text"
                                    placeholder="e.g., Corporate Law"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                                {errors.specialization && (
                                    <p className="mt-1 text-sm text-red-600">{errors.specialization.message}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="experience_years" className="block text-sm font-medium text-gray-700">
                                    Years of Experience
                                </label>
                                <input
                                    {...register('experience_years', { valueAsNumber: true })}
                                    type="number"
                                    min="0"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                                {errors.experience_years && (
                                    <p className="mt-1 text-sm text-red-600">{errors.experience_years.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="mt-4">
                            <label htmlFor="office_address" className="block text-sm font-medium text-gray-700">
                                Office Address
                            </label>
                            <textarea
                                {...register('office_address')}
                                rows={3}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            {errors.office_address && (
                                <p className="mt-1 text-sm text-red-600">{errors.office_address.message}</p>
                            )}
                        </div>
                    </div>
                )}

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>

                {errors.root && (
                    <p className="mt-2 text-sm text-red-600 text-center">{errors.root.message}</p>
                )}
            </form>
        </div>
    );
};

export default ProfileEdit;
