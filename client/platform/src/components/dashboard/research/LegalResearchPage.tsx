import React, { useState } from 'react';
import { Search, ExternalLink, BookOpen, Scale, Database, Globe, Shield } from 'lucide-react';
import GovernmentServices from '../../home/GovernmentServices';

const LegalResearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const resources = [
        {
            id: 'indiacode',
            name: 'India Code',
            icon: <BookOpen className="w-8 h-8 text-orange-600" />,
            description: 'Official repository of all Central and State Acts.',
            action: 'Search Acts',
            url: 'https://www.indiacode.nic.in/handle/123456789/1362/simple-search?query=',
            color: 'bg-orange-50 border-orange-200'
        },
        {
            id: 'ecourts',
            name: 'e-Courts Services',
            icon: <Scale className="w-8 h-8 text-blue-600" />,
            description: 'Check case status, orders, and cause lists across India.',
            action: 'Go to Portal',
            url: 'https://ecourts.gov.in/ecourts_home/',
            directLink: true,
            color: 'bg-blue-50 border-blue-200'
        },
        {
            id: 'openjustice',
            name: 'Open Justice India',
            icon: <Database className="w-8 h-8 text-green-600" />,
            description: 'Open data repository for High Court judgments (1950-2025).',
            action: 'Browse Datasets',
            url: 'https://openjusticeindia.org/',
            directLink: true,
            color: 'bg-green-50 border-green-200'
        },
        {
            id: 'kanoon',
            name: 'Indian Kanoon',
            icon: <Globe className="w-8 h-8 text-indigo-600" />,
            description: 'Search engine for Indian laws and court judgments.',
            action: 'Search Case Laws',
            url: 'https://indiankanoon.org/search/?formInput=',
            color: 'bg-indigo-50 border-indigo-200'
        }
    ];

    const handleSearch = (resource: any) => {
        if (resource.directLink) {
            window.open(resource.url, '_blank');
        } else {
            if (!searchTerm) {
                alert('Please enter a search term first');
                return;
            }
            window.open(`${resource.url}${encodeURIComponent(searchTerm)}`, '_blank');
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Legal Research Hub</h1>
                <p className="text-gray-600 mt-2">Access official government repositories and legal databases directly.</p>
            </div>

            <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-600" />
                    Quick Access: Judiciary Services
                </h2>
                <GovernmentServices compact={true} />
            </div>

            {/* Global Search Bar */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">Refine your search term</label>
                <div className="flex gap-4">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Enter Act name, Case number, or Keywords (e.g., 'Dowry Prohibition', 'Article 21')..."
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        />
                        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                    </div>
                </div>
            </div>

            {/* Resource Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {resources.map((resource) => (
                    <div
                        key={resource.id}
                        className={`p-6 rounded-xl border ${resource.color} hover:shadow-md transition-shadow relative overflow-hidden group`}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-white rounded-lg shadow-sm">
                                {resource.icon}
                            </div>
                            <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-2">{resource.name}</h3>
                        <p className="text-gray-600 text-sm mb-6 h-10">{resource.description}</p>

                        <button
                            onClick={() => handleSearch(resource)}
                            className="w-full py-2.5 bg-white border border-gray-300 hover:border-gray-400 text-gray-700 font-medium rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
                        >
                            {resource.action}
                            {!resource.directLink && searchTerm && <span className="text-xs text-indigo-600 font-normal">for "{searchTerm}"</span>}
                        </button>
                    </div>
                ))}
            </div>

            {/* Verified Badge */}
            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500">
                <span className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                    OFFICIAL
                </span>
                <span>Connected to verified government portals</span>
            </div>
        </div>
    );
};

export default LegalResearchPage;
