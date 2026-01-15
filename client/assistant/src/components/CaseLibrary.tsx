import React, { useState, useEffect } from 'react';
import { Search, BookOpen, Bookmark, ExternalLink, Loader2 } from 'lucide-react';
import { courtListener, Docket } from '../services/courtListener';

export default function CaseLibrary() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Docket[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedCase, setSelectedCase] = useState<Docket | null>(null);
    const [savedCases, setSavedCases] = useState<Docket[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem('savedCases');
        if (saved) {
            setSavedCases(JSON.parse(saved));
        }
    }, []);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        try {
            const data = await courtListener.searchDockets(query);
            setResults(data.results);
        } catch (error) {
            console.error('Search failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleSaveCase = (docket: Docket) => {
        const isSaved = savedCases.some(c => c.id === docket.id);
        let newSaved;
        if (isSaved) {
            newSaved = savedCases.filter(c => c.id !== docket.id);
        } else {
            newSaved = [...savedCases, docket];
        }
        setSavedCases(newSaved);
        localStorage.setItem('savedCases', JSON.stringify(newSaved));
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-[calc(100vh-12rem)] flex overflow-hidden">
            {/* Sidebar - Search & Results */}
            <div className="w-1/3 border-r border-gray-200 flex flex-col">
                <div className="p-4 border-b border-gray-200">
                    <form onSubmit={handleSearch} className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search cases..."
                            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                    </form>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {loading ? (
                        <div className="flex justify-center items-center h-32">
                            <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {results.map((docket) => (
                                <div
                                    key={docket.id}
                                    onClick={() => setSelectedCase(docket)}
                                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${selectedCase?.id === docket.id ? 'bg-indigo-50' : ''
                                        }`}
                                >
                                    <h4 className="font-medium text-gray-900 line-clamp-2">{docket.case_name || 'Untitled Case'}</h4>
                                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                                        <span>{docket.court}</span>
                                        <span>•</span>
                                        <span>{docket.date_filed}</span>
                                    </div>
                                </div>
                            ))}
                            {results.length === 0 && !loading && (
                                <div className="p-8 text-center text-gray-500">
                                    <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                    <p>Search for cases to get started</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content - Case Details */}
            <div className="flex-1 overflow-y-auto bg-gray-50">
                {selectedCase ? (
                    <div className="p-8">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedCase.case_name}</h2>
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <span className="bg-gray-100 px-2 py-1 rounded">Docket: {selectedCase.docket_number}</span>
                                        <span>Filed: {selectedCase.date_filed}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => toggleSaveCase(selectedCase)}
                                    className={`p-2 rounded-lg transition-colors ${savedCases.some(c => c.id === selectedCase.id)
                                            ? 'text-indigo-600 bg-indigo-50'
                                            : 'text-gray-400 hover:bg-gray-100'
                                        }`}
                                >
                                    <Bookmark className="w-5 h-5" fill={savedCases.some(c => c.id === selectedCase.id) ? "currentColor" : "none"} />
                                </button>
                            </div>

                            <div className="prose max-w-none">
                                <h3 className="text-lg font-semibold mb-3">Case Information</h3>
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <span className="text-sm text-gray-500 block mb-1">Court</span>
                                        <span className="font-medium">{selectedCase.court}</span>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <span className="text-sm text-gray-500 block mb-1">Source</span>
                                        <a
                                            href={selectedCase.absolute_url.startsWith('http') ? selectedCase.absolute_url : `https://www.courtlistener.com${selectedCase.absolute_url}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-indigo-600 hover:underline flex items-center gap-1"
                                        >
                                            View on Indian Kanoon
                                            <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400">
                        <BookOpen className="w-16 h-16 mb-4 opacity-20" />
                        <p>Select a case to view details</p>
                    </div>
                )}
            </div>
        </div>
    );
}
