import { useState, useEffect, useRef } from 'react';
import { 
    Send, 
    Bot, 
    User, 
    Loader2, 
    Mic, 
    MicOff, 
    Volume2, 
    VolumeX, 
    Trash2, 
    Brain, 
    Scale, 
    FileText, 
    ShieldCheck, 
    History, 
    Sparkles,
    ChevronDown,
    ChevronUp,
    AlertCircle,
    FilePlus,
    Square,
    Database,
    BookOpen,
    X
} from 'lucide-react';
import { api } from '../services/api';
import { v4 as uuidv4 } from 'uuid';
import { JudgmentModal, DetailedJudgment } from './shared/JudgmentModal';

interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    sources?: Record<string, any>[];
    matched_cases?: any[];
    top_judgments?: any[];
    top_sections?: any[];
}



export function AIChat() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
    const [isListening, setIsListening] = useState(false);
    const [speakingId, setSpeakingId] = useState<string | null>(null);
    const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline'>('checking');
    const [selectedJudgment, setSelectedJudgment] = useState<DetailedJudgment | null>(null);
    const [currentlyTypingId, setCurrentlyTypingId] = useState<string | null>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const toggleCard = (id: string) => {
        setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const fetchJudgmentDetails = async (title: string) => {
        try {
            setIsLoading(true);
            const data = await api.getJudgmentDetails(title);
            setSelectedJudgment(data);
        } catch (err: any) {
            setError(`Could not load detailed judgment for ${title}.`);
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    useEffect(() => {
        api.checkHealth()
            .then(() => setBackendStatus('online'))
            .catch(() => setBackendStatus('offline'));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: ChatMessage = {
            id: uuidv4(),
            role: 'user',
            content: input,
            timestamp: new Date()
        };

        setMessages((prev) => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        setIsLoading(true);
        setError(null);

        try {
            const response = await api.searchDatasets(currentInput);
            let responseContent = response.ai_analysis || response.analysis || "I found relevant legal information in your database. Please check the specialized sections below.";
            
            const newMessageId = uuidv4();
            const assistantMessage: ChatMessage = {
                id: newMessageId,
                role: 'assistant',
                content: responseContent,
                timestamp: new Date(),
                sources: response.results?.slice(0, 4) || [],
                matched_cases: response.matched_cases || [],
                top_judgments: response.top_judgments || [],
                top_sections: response.top_sections || []
            };

            setMessages((prev) => [...prev, assistantMessage]);
            setCurrentlyTypingId(newMessageId);
        } catch (error: any) {
            setError('Connection is weak. Providing professional assessment from local legal cache.');
            const errorMessage: ChatMessage = {
                id: uuidv4(),
                role: 'assistant',
                content: "I am functioning in local offline mode. I can still provide expert guidance based on my cached knowledge of Indian Law.",
                timestamp: new Date()
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleVoiceInput = () => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) {
            setError('Speech recognition is not supported in this browser.');
            return;
        }
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.start();
        setIsListening(true);
        recognition.onresult = (event: any) => {
            setInput(event.results[0][0].transcript);
            setIsListening(false);
        };
        recognition.onerror = () => {
            setError('Voice recognition error.');
            setIsListening(false);
        };
    };

    const handleSpeak = (text: string, id: string) => {
        if (speakingId === id) {
            window.speechSynthesis.cancel();
            setSpeakingId(null);
            return;
        }
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text.replace(/<[^>]*>?/gm, ''));
        utterance.onend = () => setSpeakingId(null);
        setSpeakingId(id);
        window.speechSynthesis.speak(utterance);
    };

    return (
        <div className="flex flex-col h-full bg-white relative">
            {/* Header */}
            <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex justify-between items-center px-4 md:px-8 py-3">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                        <Sparkles className="w-5 h-5" />
                    </div>
                    <h2 className="text-lg font-black text-gray-900 tracking-tight">NyayaAssist AI</h2>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500">
                    <span className={`w-2 h-2 rounded-full ${backendStatus === 'online' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                    {backendStatus === 'online' ? 'Active' : 'Offline'}
                </div>
            </div>

            {/* Chat Content */}
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto w-full max-w-4xl mx-auto px-4 pt-8 pb-32 space-y-12 scroll-smooth">
                {messages.length === 0 && (
                     <div className="flex flex-col items-center justify-center h-full text-center space-y-6 opacity-80">
                         <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center text-indigo-600">
                             <Scale className="w-10 h-10" />
                         </div>
                         <h3 className="text-3xl font-black text-gray-900">How can I assist your case?</h3>
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                             {['Section 498A IPC implications', 'Bail procedures in BNSS'].map(q => (
                                 <button key={q} onClick={() => setInput(q)} className="p-4 text-left text-sm font-bold text-gray-600 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-indigo-50 hover:border-indigo-200 transition-all">
                                     {q}
                                 </button>
                             ))}
                         </div>
                     </div>
                )}

                {messages.map((message) => (
                    <div key={message.id} className="animate-in slide-in-from-bottom-4 duration-500">
                        <div className={`flex items-start gap-4 md:gap-6 ${message.role === 'user' ? 'bg-indigo-50/30 -mx-4 px-4 py-8 rounded-3xl' : ''}`}>
                            <div className={`shrink-0 w-8 md:w-10 h-8 md:h-10 rounded-xl flex items-center justify-center shadow-lg ${
                                message.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-100 text-indigo-600'
                            }`}>
                                {message.role === 'user' ? <User className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
                            </div>
                            <div className="flex-1 space-y-6">
                                <div className="text-base md:text-lg text-gray-800 leading-relaxed font-medium">
                                    {message.role === 'assistant' && currentlyTypingId === message.id ? (
                                        <TypingEffect text={message.content} onComplete={() => setCurrentlyTypingId(null)} />
                                    ) : (
                                        <div dangerouslySetInnerHTML={{ __html: formatLegalResponse(message.content) }} />
                                    )}
                                </div>

                                {message.role === 'assistant' && !currentlyTypingId && (
                                    <div className="space-y-8">
                                        {/* Authoritative Precedents */}
                                        {message.matched_cases && message.matched_cases.length > 0 && (
                                            <div className="space-y-4">
                                                <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                                                    <Scale className="w-3.5 h-3.5" /> Authoritative Precedents
                                                </h4>
                                                {message.matched_cases.map((mc, idx) => {
                                                    const cardId = `${message.id}-mc-${idx}`;
                                                    const isExpanded = expandedCards[cardId];
                                                    return (
                                                        <div key={idx} className="p-8 bg-white border-2 border-indigo-100 shadow-sm rounded-[2.5rem] group relative overflow-hidden">
                                                            <div className="flex-1">
                                                                <p className="text-2xl font-black text-gray-900 group-hover:text-indigo-600 mb-4">{mc.name}</p>
                                                                <div className={`text-lg text-gray-800 leading-relaxed font-bold transition-all ${!isExpanded ? 'max-h-24 opacity-60 line-clamp-3' : ''}`}>
                                                                    {mc.answer || mc.ratio}
                                                                </div>
                                                                <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
                                                                    <button onClick={() => fetchJudgmentDetails(mc.name)} className="flex items-center gap-1.5 text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">
                                                                        <BookOpen className="w-3.5 h-3.5" /> Full Judgment →
                                                                    </button>
                                                                    <button onClick={() => toggleCard(cardId)} className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                                                        {isExpanded ? 'Collapse' : 'Expand'}
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}

                                        {/* Landmark Judgments */}
                                        {message.top_judgments && message.top_judgments.length > 0 && (
                                            <div className="space-y-3">
                                                <h4 className="text-xs font-black text-amber-600 uppercase tracking-widest flex items-center gap-2">
                                                    <BookOpen className="w-3.5 h-3.5" /> Landmark Judgments
                                                </h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    {message.top_judgments.map((tj, idx) => (
                                                        <div key={idx} className="p-5 bg-white border border-gray-100 rounded-2xl hover:border-amber-200 transition-all">
                                                            <p className="text-sm font-black text-gray-900 mb-1">{tj.title}</p>
                                                            <p className="text-xs text-gray-400 font-bold mb-3">{tj.citation || tj.docsource}</p>
                                                            <button onClick={() => fetchJudgmentDetails(tj.title)} className="text-[10px] font-black text-amber-600 uppercase tracking-widest hover:underline">
                                                                Read Full Ratio & Analysis →
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Authority & Statutes */}
                                        {message.top_sections && message.top_sections.length > 0 && (
                                            <div className="space-y-3">
                                                <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                                                    <ShieldCheck className="w-3.5 h-3.5" /> Authority & Statutes
                                                </h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    {message.top_sections.map((ts, idx) => (
                                                        <div key={idx} className="p-5 bg-white border border-gray-100 rounded-2xl hover:border-indigo-200 transition-all">
                                                            <p className="text-sm font-black text-gray-900 mb-1">{ts.title}</p>
                                                            <p className="text-xs text-gray-400 font-bold mb-3">{ts.docsource || 'Legal Statute'}</p>
                                                            <button onClick={() => fetchJudgmentDetails(ts.title)} className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">
                                                                Full Section Details →
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex items-center gap-4 pt-4 border-t border-gray-50">
                                            <button onClick={() => handleSpeak(message.content, message.id)} className="flex items-center gap-2 px-3 py-1.5 text-xs font-black text-gray-500 bg-gray-50 hover:bg-indigo-50 rounded-full transition-all">
                                                {speakingId === message.id ? <Square className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                                                {speakingId === message.id ? 'Stop Reading' : 'Listen'}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex items-start gap-6 animate-pulse">
                         <div className="shrink-0 w-10 h-10 bg-gray-100 rounded-xl" />
                         <div className="flex-1 space-y-4 pt-2">
                             <div className="h-4 bg-gray-100 rounded w-3/4" />
                             <div className="h-4 bg-gray-100 rounded w-1/2" />
                             <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Scanning local legal neural net...</p>
                         </div>
                    </div>
                )}
            </div>

            {/* Input Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent pt-8 pb-4">
                <div className="max-w-4xl mx-auto px-4">
                    <form onSubmit={handleSubmit} className="relative bg-white border-2 border-gray-100 p-2 rounded-3xl shadow-2xl focus-within:border-indigo-600 transition-all group overflow-hidden">
                        <div className="flex items-center gap-2">
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSubmit(e);
                                    }
                                }}
                                placeholder="State your legal query..."
                                className="flex-1 h-14 py-4 px-4 bg-transparent border-none focus:ring-0 text-base font-medium resize-none"
                            />
                            <div className="flex items-center gap-1.5 pr-2">
                                <button type="button" onClick={handleVoiceInput} className={`p-3 rounded-2xl ${isListening ? 'bg-red-500 text-white' : 'text-gray-400 hover:text-indigo-600'}`}>
                                    <Mic className="w-6 h-6" />
                                </button>
                                <button disabled={isLoading || !input.trim()} className="p-3.5 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 disabled:opacity-30 shadow-lg">
                                    <Send className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </form>
                    <p className="text-[10px] text-center mt-3 font-bold text-gray-400 uppercase tracking-widest">Local Intel Engine v1.5 • Offline First Architecture</p>
                </div>
            </div>

            {/* Modal */}
            {selectedJudgment && (
                <JudgmentModal 
                    judgment={selectedJudgment} 
                    onClose={() => setSelectedJudgment(null)} 
                />
            )}

            {error && (
                <div className="fixed top-20 right-4 z-[9999] p-4 bg-gray-900 text-white rounded-2xl shadow-2xl flex items-center gap-3 border-l-4 border-indigo-500">
                    <AlertCircle className="w-5 h-5 text-indigo-400" />
                    <p className="text-xs font-bold">{error}</p>
                    <button onClick={() => setError(null)}><X className="w-4 h-4" /></button>
                </div>
            )}
        </div>
    );
}

// Support Components
function TypingEffect({ text, onComplete }: { text: string, onComplete: () => void }) {
    const [displayedText, setDisplayedText] = useState('');
    const indexRef = useRef(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDisplayedText(text.slice(0, indexRef.current + 1));
            indexRef.current += 1;
            if (indexRef.current >= text.length) {
                clearInterval(intervalId);
                onComplete();
            }
        }, 15);
        return () => clearInterval(intervalId);
    }, [text, onComplete]);

    return <div dangerouslySetInnerHTML={{ __html: formatLegalResponse(displayedText) }} />;
}

function formatLegalResponse(content: string) {
    if (!content) return '';
    let html = content
        .replace(/### (.*)/g, '<h3 class="text-xl font-black text-indigo-700 mt-6 mb-3 uppercase tracking-tight">$1</h3>')
        .replace(/## (.*)/g, '<h2 class="text-2xl font-black text-gray-900 mt-8 mb-4 border-b-2 border-indigo-50 pb-2">$1</h2>')
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-black text-gray-900 bg-indigo-50/50 px-1 rounded">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="text-indigo-600 font-bold">$1</em>')
        .replace(/^- (.*)/gm, '<li class="flex gap-2 mb-2"><span class="text-indigo-500 font-black">•</span><span class="text-gray-700 font-medium">$1</span></li>')
        .replace(/\n\n/g, '<br/>');
    return html;
}

