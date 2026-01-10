
import React, { useState, useEffect } from 'react';
import { FileText, Download, PenTool, Loader2, Search, FileType, ChevronRight, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { jsPDF } from 'jspdf';
import api from '../../../services/api';

interface Template {
    id: string;
    name: string;
    category: string;
    filename: string;
    path: string;
    content?: string;
}

const DocumentDrafting = () => {
    const [templates, setTemplates] = useState<Template[]>([]);
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
    const [docContent, setDocContent] = useState('');
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isFetchingTemplates, setIsFetchingTemplates] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [analysis, setAnalysis] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const response = await api.get('/templates');
                setTemplates(response.data);
            } catch (err) {
                console.error("Failed to fetch templates", err);
            } finally {
                setIsFetchingTemplates(false);
            }
        };
        fetchTemplates();
    }, []);

    const handleSelectTemplate = async (template: Template) => {
        setIsLoading(true);
        setSelectedTemplate(template);
        setAnalysis(null);

        try {
            const res = await api.get(`/templates/${template.filename}`);
            setDocContent(res.data.content || "Error: Empty content");
        } catch (err: any) {
            console.error(err);
            setDocContent(`Error loading template: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAiDraft = async () => {
        if (!selectedTemplate) return;
        setIsLoading(true);
        // Simulate AI Drafting
        setTimeout(() => {
            const drafted = `
# ${selectedTemplate.name}
        
This document is drafted based on the provided details:
${userInput}

${docContent}
        `;
            setDocContent(drafted);
            setIsLoading(false);
        }, 1500);
    };

    const handleAnalyze = async () => {
        setIsAnalyzing(true);
        try {
            // Use the search endpoint as a mock "analyzer" to find related cases
            const response = await api.post('/search', {
                query: docContent.substring(0, 500),
                dataset: 'all',
                limit: 3
            });

            const results = response.data.results;
            let analysisText = "## AI Legal Analysis\n\n";
            if (results && results.length > 0) {
                analysisText += "Based on common legal precedents found in our database:\n\n";
                results.forEach((r: any, i: number) => {
                    analysisText += `### Relevant Point ${i + 1}: ${r.question}\n${r.answer}\n\n`;
                });
            } else {
                analysisText += "No specific precedents found. This document appears to be standard.";
            }
            setAnalysis(analysisText);
        } catch (err) {
            console.error("Analysis failed", err);
            setAnalysis("Failed to perform AI analysis. Please try again later.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        const splitText = doc.splitTextToSize(docContent.replace(/[*#]/g, ''), 180);
        doc.text(splitText, 10, 10);
        doc.save(`${selectedTemplate?.name || 'document'}.pdf`);
    };

    const filteredTemplates = templates.filter(t =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="h-full flex flex-col gap-6">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <PenTool className="w-6 h-6 text-blue-600" />
                        AI Document Drafter
                    </h2>
                    <p className="text-gray-600 mt-1">Select a template and let AI help you draft.</p>
                </div>
                {selectedTemplate && (
                    <button onClick={() => setSelectedTemplate(null)} className="text-sm text-blue-600 hover:underline">
                        Back to Templates
                    </button>
                )}
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[600px]">
                {/* Left Panel */}
                <div className="lg:col-span-4 flex flex-col gap-4">
                    {!selectedTemplate ? (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex-1 flex flex-col overflow-hidden">
                            <div className="p-4 border-b">
                                <div className="relative">
                                    <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search templates..."
                                        value={searchTerm}
                                        onChange={e => setSearchTerm(e.target.value)}
                                        className="w-full pl-9 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                            </div>
                            <div className="flex-1 overflow-y-auto p-2 space-y-1">
                                {isFetchingTemplates ? (
                                    <div className="flex justify-center p-8"><Loader2 className="animate-spin text-gray-400" /></div>
                                ) : filteredTemplates.map(t => (
                                    <button
                                        key={t.id}
                                        onClick={() => handleSelectTemplate(t)}
                                        className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 flex items-center justify-between group transition-colors"
                                    >
                                        <div>
                                            <h4 className="font-medium text-gray-900 group-hover:text-blue-600">{t.name}</h4>
                                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{t.category}</span>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex-1 flex flex-col gap-4">
                            <h3 className="font-semibold text-lg border-b pb-2">Drafting Details</h3>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Enter specific details
                                </label>
                                <textarea
                                    className="w-full h-48 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                                    placeholder="Names, dates, addresses..."
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                />
                            </div>
                            <button
                                onClick={handleAiDraft}
                                disabled={isLoading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2"
                            >
                                {isLoading ? <Loader2 className="animate-spin" /> : <PenTool className="w-4 h-4" />}
                                Generate Draft
                            </button>

                            {docContent && (
                                <button
                                    onClick={handleAnalyze}
                                    disabled={isAnalyzing || isLoading}
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2"
                                >
                                    {isAnalyzing ? <Loader2 className="animate-spin" /> : <AlertCircle className="w-4 h-4" />}
                                    Analyze with AILegalAnalyzer
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Right Panel */}
                <div className="lg:col-span-8 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
                    <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                        <div className="flex gap-4">
                            <button
                                onClick={() => setAnalysis(null)}
                                className={`pb-4 px-2 text-sm font-medium ${!analysis ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
                            >
                                Document
                            </button>
                            {analysis && (
                                <button
                                    className="pb-4 px-2 text-sm font-medium border-b-2 border-indigo-600 text-indigo-600"
                                >
                                    AI Analysis
                                </button>
                            )}
                        </div>
                        <div className="flex gap-2">
                            <button onClick={handleDownloadPDF} disabled={!docContent} className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50">
                                <Download className="w-4 h-4" /> PDF
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
                        <div className="bg-white shadow-sm border border-gray-200 min-h-[600px] p-8 max-w-3xl mx-auto rounded-lg">
                            {analysis ? (
                                <div className="prose max-w-none">
                                    <ReactMarkdown>{analysis}</ReactMarkdown>
                                </div>
                            ) : docContent ? (
                                <div className="prose max-w-none font-serif">
                                    <ReactMarkdown>{docContent}</ReactMarkdown>
                                </div>
                            ) : (
                                <div className="text-center text-gray-400 mt-32">
                                    <FileText className="w-16 h-16 mx-auto mb-4 opacity-20" />
                                    <p>Select a template to begin</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocumentDrafting;
