import React from 'react';
import { X, FileText, Scale, ShieldCheck, Brain, Sparkles, AlertCircle, History as HistoryIcon } from 'lucide-react';

export interface DetailedJudgment {
    id: string;
    title: string;
    citation: string;
    court: string;
    date: string;
    facts: string[];
    issues: string[];
    analysis_of_law: string[];
    precedent_analysis: string[];
    courts_reasoning: string[];
    conclusion: string[];
    full_ratio?: string;
}

interface JudgmentModalProps {
    judgment: DetailedJudgment;
    onClose: () => void;
}

export function JudgmentModal({ judgment, onClose }: JudgmentModalProps) {
    const categories = [
        { id: 'facts', label: 'Facts', color: 'text-amber-600', bg: 'bg-amber-50', icon: <FileText className="w-5 h-5 flex-shrink-0" />, content: judgment.facts },
        { id: 'issues', label: 'Issues', color: 'text-red-600', bg: 'bg-red-50', icon: <Scale className="w-5 h-5 flex-shrink-0" />, content: judgment.issues },
        { id: 'law', label: 'Analysis of the law', color: 'text-blue-600', bg: 'bg-blue-50', icon: <ShieldCheck className="w-5 h-5 flex-shrink-0" />, content: judgment.analysis_of_law },
        { id: 'precedents', label: 'Precedent Analysis', color: 'text-cyan-600', bg: 'bg-cyan-50', icon: <HistoryIcon className="w-5 h-5 flex-shrink-0" />, content: judgment.precedent_analysis },
        { id: 'reasoning', label: "Court's Reasoning", color: 'text-pink-600', bg: 'bg-pink-50', icon: <Brain className="w-5 h-5 flex-shrink-0" />, content: judgment.courts_reasoning },
        { id: 'conclusion', label: 'Conclusion', color: 'text-gray-600', bg: 'bg-gray-100', icon: <Sparkles className="w-5 h-5 flex-shrink-0" />, content: judgment.conclusion }
    ];

    const hasContent = (content: string[]) => content && content.length > 0 && !(content.length === 1 && content[0] === "");

    // Linkify raw URLs in text
    const formatText = (text: string) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        if (!text.match(urlRegex)) return text;
        const parts = text.split(urlRegex);
        return parts.map((part, i) => 
            part.match(urlRegex) ? (
                <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline hover:text-indigo-800 break-all">
                    {part}
                </a>
            ) : part
        );
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 bg-gray-900/60 backdrop-blur-md animate-in fade-in duration-200" onClick={onClose}>
            <div 
                className="bg-white w-full max-w-5xl h-full max-h-[90vh] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col border border-white/20 animate-in zoom-in-95 duration-300"
                onClick={e => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="p-6 md:p-8 border-b border-gray-100 flex justify-between items-start bg-gray-50/80 shrink-0">
                    <div className="pr-4 md:pr-8">
                        <h4 className="text-[10px] md:text-xs font-black text-indigo-600 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                            <Scale className="w-4 h-4" /> Comprehensive Legal Record
                        </h4>
                        <h3 className="text-xl md:text-2xl font-black text-gray-900 leading-tight tracking-tight">{judgment.title}</h3>
                        <p className="text-xs md:text-sm font-bold text-gray-500 mt-2">{judgment.citation} • {judgment.court}</p>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="p-3 bg-white hover:bg-gray-100 text-gray-500 rounded-2xl transition-all shadow-sm flex-shrink-0 border border-gray-200 active:scale-95"
                        aria-label="Close"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Full Document Content */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-12 scroll-smooth">
                    <div className="max-w-4xl mx-auto space-y-12">
                        {categories.some(c => hasContent(c.content)) ? (
                            categories.map((category) => hasContent(category.content) && (
                                <section key={category.id} className="scroll-mt-8">
                                    <div className="flex items-center gap-3 mb-6 pb-2 border-b border-gray-100">
                                        <div className={`p-2 rounded-xl ${category.bg} ${category.color}`}>
                                            {category.icon}
                                        </div>
                                        <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight uppercase">{category.label}</h2>
                                    </div>
                                    <div className="space-y-4 px-2 md:px-4">
                                        {category.content.map((para, i) => (
                                            <p key={i} className="text-base md:text-lg text-gray-700 leading-relaxed font-medium">
                                                {formatText(para)}
                                            </p>
                                        ))}
                                    </div>
                                </section>
                            ))
                        ) : (
                             <div className="flex flex-col items-center justify-center py-20 text-center">
                                <AlertCircle className="w-16 h-16 text-gray-200 mb-6" />
                                <h3 className="text-2xl font-black text-gray-400">Section details currently being processed</h3>
                                <p className="text-gray-400 mt-2 font-bold">Please check the source document link for an immediate view.</p>
                            </div>
                        )}

                        {judgment.full_ratio && (
                            <section className="mt-12 p-6 md:p-8 bg-indigo-50 rounded-[2rem] border border-indigo-100">
                                <h4 className="text-xs md:text-sm font-black text-indigo-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4" /> Authoritative Ratio Decidendi
                                </h4>
                                <p className="italic font-bold text-indigo-900 text-lg md:text-xl leading-relaxed">
                                    &ldquo;{formatText(judgment.full_ratio)}&rdquo;
                                </p>
                            </section>
                        )}
                        
                        {/* End of Document marker */}
                        <div className="pt-8 pb-10 flex justify-center">
                            <div className="h-1 w-12 bg-gray-200 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
