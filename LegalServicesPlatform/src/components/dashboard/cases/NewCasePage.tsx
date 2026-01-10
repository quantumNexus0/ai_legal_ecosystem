import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Save } from 'lucide-react';
import { dashboardService } from '../../../services/dashboardService';

interface NewCaseForm {
    title: string;
    case_type: string;
    description: string;
    client_id: number;
}

const NewCasePage = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<NewCaseForm>();
    const [submitError, setSubmitError] = React.useState<string | null>(null);

    const onSubmit = async (data: NewCaseForm) => {
        try {
            await dashboardService.createCase(data);
            navigate('/dashboard?tab=cases');
        } catch (error: any) {
            console.error('Failed to create case:', error);
            setSubmitError(error.response?.data?.detail || 'Failed to create case');
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
                    <h1 className="text-xl font-bold text-gray-900">Create New Case</h1>
                    <p className="text-sm text-gray-500 mt-1">Enter the details for the new legal case.</p>
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
                                Case Title
                            </label>
                            <input
                                {...register('title', { required: 'Title is required' })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="e.g., Corporate Merger A"
                            />
                            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Case Type
                            </label>
                            <select
                                {...register('case_type', { required: 'Type is required' })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Select Type</option>
                                <option value="Civil">Civil</option>
                                <option value="Criminal">Criminal</option>
                                <option value="Corporate">Corporate</option>
                                <option value="Family">Family</option>
                                <option value="Property">Property</option>
                                <option value="Intellectual Property">Intellectual Property</option>
                            </select>
                            {errors.case_type && <p className="text-red-500 text-xs mt-1">{errors.case_type.message}</p>}
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
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Detailed description of the case..."
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
                            {isSubmitting ? 'Creating...' : 'Create Case'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewCasePage;
