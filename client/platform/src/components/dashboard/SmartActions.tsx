
import React from 'react';
import { Plus, Search, FileText, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SmartActions: React.FC = () => {
    const navigate = useNavigate();

    const actions = [
        { label: 'New Case', icon: Plus, path: '/dashboard/cases/new', color: 'bg-blue-600' },
        { label: 'Find Lawyer', icon: Search, path: '/dashboard/lawyers', color: 'bg-indigo-600' },
        { label: 'Draft Document', icon: FileText, path: '/dashboard/draft', color: 'bg-purple-600' },
        { label: 'Edit Profile', icon: User, path: '/dashboard/profile', color: 'bg-gray-600' },
    ];

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {actions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                        <button
                            key={index}
                            onClick={() => navigate(action.path)}
                            className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200 group"
                        >
                            <div className={`p-3 rounded-full ${action.color} text-white mb-3 shadow-sm group-hover:scale-110 transition-transform duration-200`}>
                                <Icon className="w-5 h-5" />
                            </div>
                            <span className="text-sm font-medium text-gray-700">{action.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default SmartActions;
