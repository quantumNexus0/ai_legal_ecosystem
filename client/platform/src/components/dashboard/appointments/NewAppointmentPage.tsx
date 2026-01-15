import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Save } from 'lucide-react';
import { dashboardService } from '../../../services/dashboardService';

interface NewAppointmentForm {
    title: string;
    appointment_type: string;
    date: string;
    time: string;
    client_id: number;
    description: string;
}

const NewAppointmentPage = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<NewAppointmentForm>();
    const [submitError, setSubmitError] = React.useState<string | null>(null);

    const onSubmit = async (data: NewAppointmentForm) => {
        try {
            // Combine date and time to ISO string
            const dateTime = new Date(`${data.date}T${data.time}`);

            await dashboardService.createAppointment({
                ...data,
                appointment_time: dateTime.toISOString()
            });
            navigate('/dashboard?tab=appointments');
        } catch (error: any) {
            console.error('Failed to create appointment:', error);
            setSubmitError(error.response?.data?.detail || 'Failed to create appointment');
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4 md:p-6">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
            </button>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h1 className="text-xl font-bold text-gray-900">Schedule Appointment</h1>
                    <p className="text-sm text-gray-500 mt-1">Set up a new appointment with a client.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                    {submitError && (
                        <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm">
                            {submitError}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Title
                            </label>
                            <input
                                {...register('title', { required: 'Title is required' })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="e.g., Initial Consultation"
                            />
                            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Type
                            </label>
                            <select
                                {...register('appointment_type', { required: 'Type is required' })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Select Type</option>
                                <option value="Consultation">Consultation</option>
                                <option value="Hearing">Hearing</option>
                                <option value="Review">Review</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.appointment_type && <p className="text-red-500 text-xs mt-1">{errors.appointment_type.message}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Date
                                </label>
                                <input
                                    type="date"
                                    {...register('date', { required: 'Date is required' })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Time
                                </label>
                                <input
                                    type="time"
                                    {...register('time', { required: 'Time is required' })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Client ID
                            </label>
                            <input
                                type="number"
                                {...register('client_id', { required: 'Client ID is required', valueAsNumber: true })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter Client User ID"
                            />
                            {errors.client_id && <p className="text-red-500 text-xs mt-1">{errors.client_id.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                {...register('description')}
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Additional notes..."
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            {isSubmitting ? 'Scheduling...' : 'Schedule Appointment'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewAppointmentPage;
