import { useState } from 'react';
import axios from 'axios';
import { Bot, FileText, AlertCircle, CheckCircle } from 'lucide-react';

const AIAnalysisPage = () => {
    const [formData, setFormData] = useState({
        facts: '',
        parties: '',
        stage: '',
        issues: '',
        sections: '',
        additional_info: ''
    });

    const [loading, setLoading] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResult(null);

        try {
            // Replace with your actual API URL
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
            const response = await axios.post(`${apiUrl}/api/analysis/analyze`, {
                facts: formData.facts,
                parties: formData.parties,
                stage: formData.stage,
                issues: formData.issues,
                sections: formData.sections,
                additional_info: formData.additional_info
            });
            setResult(response.data);
        } catch (err: any) {
            console.error('Detailed Error:', err);
            const errorMsg = err.response?.data?.detail || err.message || 'Failed to fetch analysis. Please try again.';
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="md:grid md:grid-cols-2 md:gap-6">

                {/* Check: Animation/Intro Section */}
                <div className="md:col-span-2 mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                        AI Legal Case Analysis ⚖️
                    </h1>
                    <p className="mt-4 text-lg text-gray-500">
                        Leverage advanced AI, NLP, and LLMs to analyze your case facts, identify legal issues, and get actionable strategies.
                    </p>
                </div>

                {/* Left Column: Input Form */}
                <div className="mt-5 md:mt-0 md:col-span-1">
                    <div className="shadow overflow-hidden sm:rounded-md bg-white">
                        <div className="px-4 py-5 sm:p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">

                                <div>
                                    <label htmlFor="parties" className="block text-sm font-medium text-gray-700">
                                        Parties Involved *
                                    </label>
                                    <input
                                        type="text"
                                        name="parties"
                                        id="parties"
                                        required
                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                                        placeholder="e.g., State vs. John Doe"
                                        value={formData.parties}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="stage" className="block text-sm font-medium text-gray-700">
                                        Stage of Case *
                                    </label>
                                    <select
                                        id="stage"
                                        name="stage"
                                        required
                                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={formData.stage}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Stage</option>
                                        <option value="Pre-Litigation">Pre-Litigation</option>
                                        <option value="Filing">Filing / Admission</option>
                                        <option value="Evidence">Evidence / Trial</option>
                                        <option value="Arguments">Final Arguments</option>
                                        <option value="Judgment">Judgment / Appeal</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="facts" className="block text-sm font-medium text-gray-700">
                                        Facts of the Case *
                                    </label>
                                    <div className="mt-1">
                                        <textarea
                                            id="facts"
                                            name="facts"
                                            rows={4}
                                            required
                                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                            placeholder="Chronological sequence of events..."
                                            value={formData.facts}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <p className="mt-2 text-sm text-gray-500">Provide detailed facts for accurate analysis.</p>
                                </div>

                                <div>
                                    <label htmlFor="issues" className="block text-sm font-medium text-gray-700">
                                        Legal Issues / Questions *
                                    </label>
                                    <div className="mt-1">
                                        <textarea
                                            id="issues"
                                            name="issues"
                                            rows={2}
                                            required
                                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                            placeholder="What specific legal questions do you have?"
                                            value={formData.issues}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="sections" className="block text-sm font-medium text-gray-700">
                                        Relevant Sections (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        name="sections"
                                        id="sections"
                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                                        placeholder="e.g., IPC 302, CrPC 160"
                                        value={formData.sections}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="additional_info" className="block text-sm font-medium text-gray-700">
                                        Additional Information
                                    </label>
                                    <div className="mt-1">
                                        <textarea
                                            id="additional_info"
                                            name="additional_info"
                                            rows={2}
                                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                            placeholder="Any other relevant details or documents..."
                                            value={formData.additional_info}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="px-4 py-3 text-right">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                                    >
                                        {loading ? (
                                            <>
                                                Analyzing...
                                                <svg className="animate-spin ml-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            </>
                                        ) : (
                                            <>
                                                Run AI Analysis <Bot className="ml-2 h-5 w-5" />
                                            </>
                                        )}
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>

                {/* Right Column: Output / Dashboard Dashboard */}
                <div className="mt-5 md:mt-0 md:col-span-1 h-full">
                    {result ? (
                        <div className="flex flex-col h-full space-y-4">
                            {/* Top Stats Row */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-indigo-100 flex flex-col items-center justify-center">
                                    <span className="text-gray-500 text-xs uppercase font-bold tracking-wider">Case Strength</span>
                                    <div className="mt-2 relative">
                                        <svg className="w-20 h-20 transform -rotate-90">
                                            <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-100" />
                                            <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" className={result.risk_score > 70 ? "text-green-500" : result.risk_score > 40 ? "text-yellow-500" : "text-red-500"} strokeDasharray={226} strokeDashoffset={226 - (226 * result.risk_score) / 100} />
                                        </svg>
                                        <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-gray-800">{result.risk_score}%</span>
                                    </div>
                                    <span className="mt-1 text-xs text-gray-400">Probability of Success</span>
                                </div>

                                <div className="bg-white p-4 rounded-xl shadow-sm border border-indigo-100 flex flex-col justify-between">
                                    <div>
                                        <span className="text-gray-500 text-xs uppercase font-bold tracking-wider">Analysis Status</span>
                                        <div className="flex items-center mt-2">
                                            <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                                            <span className="font-semibold text-gray-700">Complete</span>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <span className="text-xs text-gray-400 block">AI Model: GPT-4o</span>
                                        <span className="text-xs text-gray-400 block">Sources: Local & Web</span>
                                    </div>
                                </div>
                            </div>

                            {/* Main Analysis Tab */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex-1 flex flex-col">
                                <div className="border-b border-gray-100 bg-gray-50 px-4 py-2 flex items-center justify-between">
                                    <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-indigo-500" /> Analysis Report
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <a
                                            href={`${import.meta.env.VITE_ASSISTANT_URL || 'http://localhost:5174'}?prompt=${encodeURIComponent(`Analyze this case based on the following facts and issues:\n\nFacts: ${formData.facts}\n\nIssues: ${formData.issues}`)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded hover:bg-indigo-700 flex items-center gap-1 transition-colors"
                                        >
                                            <Bot className="w-3 h-3" /> Consult NyayaAssist
                                        </a>
                                        <button className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">Download PDF</button>
                                    </div>
                                </div>
                                <div className="p-6 overflow-y-auto max-h-[500px] prose prose-sm max-w-none text-gray-600">
                                    <div dangerouslySetInnerHTML={{
                                        __html: result.analysis
                                            .replace(/^# (.*$)/gim, '<h1 class="text-xl font-bold text-gray-900 mt-4 mb-3">$1</h1>')
                                            .replace(/^## (.*$)/gim, '<h2 class="text-lg font-bold text-indigo-700 mt-4 mb-2 pb-1 border-b">$1</h2>')
                                            .replace(/^### (.*$)/gim, '<h3 class="text-md font-semibold text-gray-800 mt-3 mb-1">$1</h3>')
                                            .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>')
                                            .replace(/^\* (.*$)/gim, '<li class="ml-4 list-disc">$1</li>')
                                            .replace(/^\d\. (.*$)/gim, '<li class="ml-4 list-decimal">$1</li>')
                                            .replace(/\n/g, '<br />')
                                    }} />
                                </div>
                            </div>

                            {/* Actions & Precedents Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                                    <h4 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-500" /> Action Plan
                                    </h4>
                                    <ul className="space-y-2">
                                        {result.recommended_actions.map((action: any, idx: any) => (
                                            <li key={idx} className="flex items-start text-sm text-gray-600 bg-gray-50 p-2 rounded-md">
                                                <span className="mr-2 mt-0.5 text-indigo-400">•</span>
                                                {action}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                                    <h4 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                                        <AlertCircle className="w-4 h-4 text-yellow-500" /> Citations
                                    </h4>
                                    <div className="space-y-2 max-h-[150px] overflow-y-auto pr-1">
                                        {result.matched_cases && result.matched_cases.length > 0 ? (
                                            result.matched_cases.map((cs: any, idx: any) => (
                                                <div key={idx} className="text-xs p-2 bg-indigo-50 rounded border border-indigo-100">
                                                    <p className="font-semibold text-indigo-900 mb-1">Ref {idx + 1}: {cs.dataset}</p>
                                                    <p className="line-clamp-2 text-indigo-700">{cs.question}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-xs text-gray-400 italic">No direct citations found.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border-2 border-dashed border-gray-300">
                            <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                                <Bot className="h-12 w-12 text-indigo-500" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">AI Legal Analyst</h3>
                            <p className="text-center text-gray-500 mt-2 max-w-xs text-sm">
                                Enter your case details to generate a comprehensive legal risk assessment, strategy plan, and precedent search.
                            </p>
                            {error && (
                                <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center text-sm w-full">
                                    <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                                    {error}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AIAnalysisPage;
