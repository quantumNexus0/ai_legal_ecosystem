import { useState, useEffect } from 'react';
import { Search, BookOpen, Bookmark, ExternalLink, Loader2, Award } from 'lucide-react';

interface Judgment {
    rank: string;
    citedby: string;
    docsource: string;
    url: string;
    title: string;
}

export default function CaseLibrary() {
    const [query, setQuery] = useState('');
    const [allJudgments, setAllJudgments] = useState<Judgment[]>([]);
    const [filteredJudgments, setFilteredJudgments] = useState<Judgment[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedCase, setSelectedCase] = useState<Judgment | null>(null);
    const [savedCases, setSavedCases] = useState<Judgment[]>([]);

    useEffect(() => {
        const fetchJudgments = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:8000/api/analysis/top-judgments');
                const data = await response.json();
                setAllJudgments(data.results || []);
                setFilteredJudgments(data.results || []);
            } catch (error) {
                console.error('Failed to fetch judgments:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchJudgments();

        const saved = localStorage.getItem('savedCases');
        if (saved) {
            setSavedCases(JSON.parse(saved));
        }
    }, []);

    useEffect(() => {
        if (!query.trim()) {
            setFilteredJudgments(allJudgments);
        } else {
            const filtered = allJudgments.filter(j => 
                j.title.toLowerCase().includes(query.toLowerCase()) || 
                j.docsource.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredJudgments(filtered);
        }
    }, [query, allJudgments]);

    const toggleSaveCase = (judgment: Judgment) => {
        const isSaved = savedCases.some(c => c.url === judgment.url);
        let newSaved;
        if (isSaved) {
            newSaved = savedCases.filter(c => c.url !== judgment.url);
        } else {
            newSaved = [...savedCases, judgment];
        }
        setSavedCases(newSaved);
        localStorage.setItem('savedCases', JSON.stringify(newSaved));
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-[calc(100vh-12rem)] flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar - Search & Results */}
            <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col h-1/2 md:h-full">
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search judgments..."
                            className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {loading ? (
                        <div className="flex justify-center items-center h-32">
                            <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {filteredJudgments.map((j, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setSelectedCase(j)}
                                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${selectedCase?.url === j.url ? 'bg-indigo-50 border-l-4 border-indigo-500' : 'border-l-4 border-transparent'
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full mt-0.5">#{j.rank}</span>
                                        <h4 className="font-medium text-gray-900 text-sm line-clamp-2">{j.title}</h4>
                                    </div>
                                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 ml-9">
                                        <span className="truncate">{j.docsource}</span>
                                        <span>•</span>
                                        <span>{j.citedby} citations</span>
                                    </div>
                                </div>
                            ))}
                            {filteredJudgments.length === 0 && !loading && (
                                <div className="p-8 text-center text-gray-500">
                                    <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-30" />
                                    <p className="text-sm">No judgments found matching your search</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content - Case Details */}
            <div className="flex-1 overflow-y-auto bg-gray-50 h-1/2 md:h-full">
                {selectedCase ? (
                    <div className="p-4 md:p-8">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Award className="w-5 h-5 text-amber-500" />
                                        <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Top Rated Judgment</span>
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 leading-tight">{selectedCase.title}</h2>
                                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                                        <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-medium">Rank #{selectedCase.rank}</span>
                                        <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-medium">{selectedCase.citedby} Citations</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => toggleSaveCase(selectedCase)}
                                    className={`p-2 rounded-lg transition-colors ml-4 ${savedCases.some(c => c.url === selectedCase.url)
                                            ? 'text-indigo-600 bg-indigo-50 border border-indigo-100'
                                            : 'text-gray-400 hover:bg-gray-100 border border-transparent'
                                        }`}
                                >
                                    <Bookmark className="w-5 h-5" fill={savedCases.some(c => c.url === selectedCase.url) ? "currentColor" : "none"} />
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                        <span className="text-xs text-gray-500 font-semibold uppercase block mb-1">Source</span>
                                        <span className="font-medium text-gray-900">{selectedCase.docsource}</span>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                        <span className="text-xs text-gray-500 font-semibold uppercase block mb-1">External Link</span>
                                        <a
                                            href={selectedCase.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-indigo-600 font-semibold hover:underline flex items-center gap-1"
                                        >
                                            View on Indian Kanoon
                                            <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </div>
                                </div>
                                
                                <div className="border-t border-gray-100 pt-6">
                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Case Summary</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        This judgment from the {selectedCase.docsource} has been cited {selectedCase.citedby} times, 
                                        making it one of the most influential precedents in its category. 
                                        Click the external link above to read the full text and understand the detailed rationale 
                                        and legal principles established in this case.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-4">
                            <BookOpen className="w-12 h-12 text-indigo-100" />
                        </div>
                        <h3 className="text-gray-900 font-bold mb-1">Select a Judgment</h3>
                        <p className="text-sm max-w-xs">Pick a case from the list to view its full details and citation analysis.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
