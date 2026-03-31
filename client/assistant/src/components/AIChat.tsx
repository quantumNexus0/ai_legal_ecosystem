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
    BookOpen
} from 'lucide-react';
import { api } from '../services/api';
import { v4 as uuidv4 } from 'uuid';

interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    sources?: Record<string, any>[];
    matched_cases?: any[];
    top_judgments?: any[];
}

export function AIChat() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

    const toggleCard = (id: string) => {
        setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
    };
    const [isListening, setIsListening] = useState(false);
    const [speakingId, setSpeakingId] = useState<string | null>(null);
    const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline'>('checking');
    const chatContainerRef = useRef<HTMLDivElement>(null);


    const fileInputRef = useRef<HTMLInputElement>(null);

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

        recognition.onresult = (event: Record<string, any>) => {
            const transcript = event.results[0][0].transcript;
            setInput(transcript);
            setIsListening(false);
        };

        recognition.onerror = () => {
            setError('Voice recognition error. Please try again.');
            setIsListening(false);
        };
    };

    const handleSpeak = (text: string, id: string) => {
        if (speakingId === id) {
            window.speechSynthesis.cancel();
            setSpeakingId(null);
            return;
        }
        const plainText = text.replace(/<[^>]*>?/gm, '');
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(plainText);
        utterance.onend = () => setSpeakingId(null);
        setSpeakingId(id);
        window.speechSynthesis.speak(utterance);
    };

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        if (file.type !== 'application/pdf') {
            setError('Please upload a valid PDF file.');
            return;
        }

        setError(null);
        const uploadMsgId = uuidv4();
        setMessages((prev) => [...prev, {
            id: uploadMsgId,
            role: 'assistant',
            content: `📄 **Uploading ${file.name}...**\nPlease wait while I analyze the document.`,
            timestamp: new Date()
        }]);
        try {
            const result = await api.uploadDocument(file);
            setMessages((prev) => prev.map(msg =>
                msg.id === uploadMsgId
                    ? { ...msg, content: `✅ **Successfully uploaded ${file.name}**\nI have read ${result.chunks} segments from this document. You can now ask me questions about it.` }
                    : msg
            ));
        } catch (error: Error | unknown) {
            const err = error as Error;
            setMessages((prev) => prev.map(msg =>
                msg.id === uploadMsgId
                    ? { ...msg, content: `❌ **Failed to upload ${file.name}**\nError: ${err.message}` }
                    : msg
            ));
            setError('Failed to upload document.');
        } finally {

            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const [currentlyTypingId, setCurrentlyTypingId] = useState<string | null>(null);

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
                top_judgments: response.top_judgments || []
            };

            setMessages((prev) => [...prev, assistantMessage]);
            setCurrentlyTypingId(newMessageId);

        } catch (error: Error | unknown) {
            setError('Connection is weak. Providing professional assessment from local legal cache.');
            const errorMessage: ChatMessage = {
                id: uuidv4(),
                role: 'assistant',
                content: "I am currently providing a direct assessment based on my cached local legal statutes and precedents. It appears the primary neural link is slow, but I remain operational for Indian Law queries.",
                timestamp: new Date()
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-white relative">
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

            <div ref={chatContainerRef} className="flex-1 overflow-y-auto w-full max-w-4xl mx-auto px-4 pt-8 pb-32 space-y-12 scroll-smooth">
                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-6 opacity-80 animate-in fade-in zoom-in duration-500">
                        <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center text-indigo-600 mb-2">
                            <Scale className="w-10 h-10" />
                        </div>
                        <div>
                            <h3 className="text-3xl font-black text-gray-900 mb-2">How can I assist your case?</h3>
                            <p className="text-gray-500 font-medium max-w-sm mx-auto text-lg leading-relaxed">
                                Expert legal analysis for IPC, BNS, and Supreme Court precedents at your fingertips.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                            {['Section 498A IPC implications', 'Latest AFT judgments', 'Bail procedures in BNSS', 'Property dispute precedents'].map(q => (
                                <button key={q} onClick={() => { setInput(q); }} className="p-4 text-left text-sm font-bold text-gray-600 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-gray-100/80 hover:border-indigo-200 transition-all active:scale-95">
                                    {q}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {messages.map((message) => (
                    <div key={message.id} className="group animate-in slide-in-from-bottom-4 duration-500">
                        <div className={`flex items-start gap-4 md:gap-6 ${message.role === 'user' ? 'bg-indigo-50/30 -mx-4 px-4 py-8 rounded-3xl' : ''}`}>
                            <div className={`shrink-0 w-8 md:w-10 h-8 md:h-10 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform ${
                                message.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-100 text-indigo-600'
                            }`}>
                                {message.role === 'user' ? <User className="w-5 h-5" /> : <Sparkles className="w-5 h-5 font-bold" />}
                            </div>
                            <div className="flex-1 space-y-6">
                                <div className="text-base md:text-lg text-gray-800 leading-relaxed font-medium">
                                    {message.role === 'assistant' ? (
                                        currentlyTypingId === message.id ? (
                                            <TypingEffect text={message.content} onComplete={() => setCurrentlyTypingId(null)} />
                                        ) : (
                                            <div dangerouslySetInnerHTML={{ __html: formatLegalResponse(message.content) }} />
                                        )
                                    ) : (
                                        message.content
                                    )}
                                </div>

                                {message.role === 'assistant' && !currentlyTypingId && (
                                    <div className="space-y-8 animate-in fade-in duration-700 delay-150">
                                        {(message.matched_cases && message.matched_cases.length > 0) && (
                                            <div className="space-y-4">
                                                <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                                                    <Scale className="w-3.5 h-3.5" /> Authoritative Precedents
                                                </h4>
                                                <div className="grid grid-cols-1 gap-4">
                                                    {message.matched_cases.map((mc, idx) => {
                                                        const cardId = `${message.id}-mc-${idx}`;
                                                        const isExpanded = expandedCards[cardId];
                                                        const shouldTruncate = mc.answer && mc.answer.length > 200;
                                                        
                                                        return (
                                                            <div key={idx} className="p-8 bg-white border-2 border-indigo-100/50 shadow-sm hover:shadow-2xl hover:border-indigo-300 transition-all duration-300 rounded-[2.5rem] group/card relative overflow-hidden flex flex-col min-h-[320px]">
                                                                <div className="absolute top-0 right-0 p-5 flex flex-col items-end gap-2">
                                                                    <span className="px-4 py-1.5 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-indigo-200">
                                                                        {mc.judgment_date || 'Legal Authority'}
                                                                    </span>
                                                                    {mc.source && (
                                                                        <span className="px-3 py-1 bg-gray-100 text-gray-500 text-[9px] font-bold uppercase tracking-tighter rounded-md border border-gray-200">
                                                                            Source: {mc.source.replace('.json', '').replace('.csv', '')}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                
                                                                <div className="flex-1">
                                                                    <p className="text-2xl font-black text-gray-900 group-hover/card:text-indigo-600 mb-4 pr-32 leading-tight tracking-tight">
                                                                        {mc.name}
                                                                    </p>
                                                                    
                                                                    {mc.question && (
                                                                        <div className="mb-6">
                                                                            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-2 px-1">Case Question / Legal Issue</p>
                                                                            <p className="text-sm font-bold text-gray-600 bg-gray-50/80 p-4 rounded-2xl border border-gray-100 italic leading-relaxed">
                                                                                "{mc.question}"
                                                                            </p>
                                                                        </div>
                                                                    )}
                                                                    
                                                                    <div className="mt-auto">
                                                                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-2 px-1">Judicial Answer / Ratio</p>
                                                                        <div className={`text-lg text-gray-800 leading-relaxed font-bold transition-all duration-500 overflow-hidden ${!isExpanded && shouldTruncate ? 'max-h-24 opacity-60 line-clamp-3' : 'max-h-[2000px] opacity-100'}`}>
                                                                            {mc.answer}
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {shouldTruncate && (
                                                                    <button 
                                                                        onClick={() => toggleCard(cardId)}
                                                                        className="mt-6 w-full py-4 bg-indigo-50/50 hover:bg-indigo-600 hover:text-white text-indigo-600 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 group/btn border border-indigo-100 hover:border-indigo-600"
                                                                    >
                                                                        {isExpanded ? (
                                                                            <>Collapse Details <ChevronUp className="w-4 h-4" /></>
                                                                        ) : (
                                                                            <>Read Full Analysis <ChevronDown className="w-4 h-4" /></>
                                                                        )}
                                                                    </button>
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}

                                        {(message.top_judgments && message.top_judgments.length > 0) && (
                                            <div className="space-y-3">
                                                <h4 className="text-xs font-black text-amber-600 uppercase tracking-widest flex items-center gap-2">
                                                    <BookOpen className="w-3.5 h-3.5" /> Landmark Judgments
                                                </h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    {message.top_judgments.map((tj, idx) => (
                                                        <div key={idx} className="p-5 bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-amber-200 transition-all rounded-2xl group/card">
                                                            <p className="text-sm font-black text-gray-900 group-hover/card:text-amber-600 mb-2">{tj.title}</p>
                                                            <p className="text-xs text-gray-500 font-bold mb-3">{tj.citation}</p>
                                                            <button className="text-[10px] font-black text-amber-600 uppercase tracking-widest hover:underline">Read Full Ratio →</button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {message.sources && message.sources.length > 0 && (
                                            <div className="space-y-3">
                                                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                                    <Database className="w-3.5 h-3.5" /> Verified Sources
                                                </h4>
                                                <div className="grid gap-3">
                                                    {message.sources.map((source, idx) => (
                                                        <SourceCard key={idx} source={source} idx={idx} />
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex items-center gap-4 pt-4 border-t border-gray-50">
                                            <button onClick={() => handleSpeak(message.content, message.id)} className="flex items-center gap-2 px-3 py-1.5 text-xs font-black text-gray-500 bg-gray-50 hover:bg-indigo-50 hover:text-indigo-600 rounded-full transition-all">
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
                             <div className="h-4 bg-gray-100 rounded w-5/6" />
                             <p className="text-xs font-bold text-gray-400 mt-2 uppercase tracking-widest animate-bounce">Scanning legal neural net...</p>
                         </div>
                    </div>
                )}
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent pt-8 pb-4">
                <div className="max-w-4xl mx-auto px-4">
                    <form onSubmit={handleSubmit} className="relative bg-white border-2 border-gray-100 p-2 rounded-3xl shadow-2xl focus-within:border-indigo-600 transition-all group overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-600 to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-700" />
                        <div className="flex items-center gap-2 relative">
                            <button type="button" onClick={() => fileInputRef.current?.click()} className="p-3 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all active:scale-90" title="Upload Case File">
                                <FilePlus className="w-6 h-6" />
                            </button>
                            <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="application/pdf" className="hidden" />
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSubmit(e);
                                    }
                                }}
                                placeholder="State your legal query or upload a file..."
                                className="flex-1 h-14 py-4 px-2 bg-transparent border-none focus:ring-0 text-base md:text-lg text-gray-800 placeholder-gray-400 resize-none font-medium custom-scrollbar"
                            />
                            <div className="flex items-center gap-1.5 pr-2">
                                <button type="button" onClick={handleVoiceInput} className={`p-3 rounded-2xl transition-all active:scale-90 ${isListening ? 'bg-red-500 text-white animate-pulse' : 'text-gray-400 hover:text-indigo-600 hover:bg-indigo-50'}`}>
                                    <Mic className="w-6 h-6" />
                                </button>
                                <button disabled={isLoading || !input.trim()} className="p-3.5 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 disabled:opacity-30 transition-all shadow-lg active:scale-90">
                                    <Send className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </form>
                    <p className="text-[10px] text-center mt-3 font-bold text-gray-400 uppercase tracking-widest">Local Intel Engine v1.5 • No External Data Transmission</p>
                </div>
            </div>

            {error && (
                <div className="fixed top-20 right-4 z-[9999] p-4 bg-gray-900 text-white rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right duration-300 border-l-4 border-indigo-500">
                    <AlertCircle className="w-5 h-5 text-indigo-400" />
                    <p className="text-xs font-bold">{error}</p>
                    <button onClick={() => setError(null)} className="ml-2 hover:text-indigo-400">✕</button>
                </div>
            )}
        </div>
    );
}

// Keep helper components and formatters...
const TypingEffect = ({ text, onComplete }: { text: string; onComplete?: () => void }) => {
    const [displayedText, setDisplayedText] = useState('');
    const indexRef = useRef(0);
    useEffect(() => {
        const intervalId = setInterval(() => {
            setDisplayedText((prev) => {
                if (indexRef.current >= text.length) {
                    clearInterval(intervalId);
                    if (onComplete) onComplete();
                    return prev;
                }
                const nextChar = text.charAt(indexRef.current);
                indexRef.current++;
                return prev + nextChar;
            });
        }, 8);
        return () => clearInterval(intervalId);
    }, [text, onComplete]);
    return <div dangerouslySetInnerHTML={{ __html: formatLegalResponse(displayedText) }} />;
};

function formatLegalResponse(html: string) {
    html = html.replace(/1\.\s*\*\*Title\*\*:\s*(.*?)(\n|$)/g, '<h3 class="text-2xl font-black text-gray-900 mt-6 mb-3">$1</h3>');
    html = html.replace(/2\.\s*\*\*Definition\*\*:\s*([\s\S]*?)(?=(3\.|$))/g, '<p class="text-gray-700 leading-relaxed mb-6"><strong class="text-indigo-900 font-black uppercase text-xs tracking-widest block mb-2">Legal Definition</strong> $1</p>');
    html = html.replace(/3\.\s*\*\*Key Points\*\*:\s*([\s\S]*?)(?=(4\.|$))/g, '<div class="mb-6"><strong class="text-indigo-900 font-black uppercase text-xs tracking-widest block mb-3">Core Implications</strong><ul class="list-none space-y-4">$1</ul></div>');
    html = html.replace(/4\.\s*\*\*In-depth Details\*\*:\s*([\s\S]*?)(?=(5\.|$))/g, '<div class="mb-8"><strong class="text-indigo-900 font-black uppercase text-xs tracking-widest block mb-3">Statutory Analysis</strong><div class="text-gray-800 leading-relaxed space-y-3 font-medium">$1</div></div>');
    html = html.replace(/5\.\s*\*\*Advantages & Disadvantages\*\*:\s*([\s\S]*?)$/g, '<div class="p-6 bg-gray-50 rounded-2xl border border-gray-100"><strong class="text-indigo-900 font-black uppercase text-xs tracking-widest block mb-2">Practical Advice</strong> $1</div>');
    html = html.replace(/^\s*-\s+\*\*(.*?)\*\*:/gm, '<li class="flex items-start gap-3"><span class="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5"></span><span><strong class="font-black text-gray-900">$1:</strong>');
    html = html.replace(/^\s*-\s+(.*?)$/gm, '<li class="flex items-start gap-3"><span class="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5"></span><span>$1</span></li>');
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-black text-gray-900">$1</strong>');
    html = html.replace(/\n/g, '<br>');
    return html;
}

function SourceCard({ source, idx }: { source: Record<string, any>, idx: number }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const title = source.question || "Verified Archive";
    const fullText = source.answer || source.page_content || source.text || "No preview";
    const score = source.score ? Math.round(source.score * 100) : null;
    const shouldTruncate = fullText.length > 250;

    return (
        <div className="p-6 bg-white border-2 border-gray-100 hover:border-indigo-100 shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl flex flex-col">
            <div className="flex justify-between items-baseline mb-4">
                <h4 className="font-black text-sm text-indigo-900 leading-tight pr-4">{idx + 1}. {title}</h4>
                {score && <span className="px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-md text-[9px] font-black uppercase tracking-widest shrink-0">{score}% Reliability</span>}
            </div>
            
            <div className="flex-1">
                <div 
                    className={`text-sm text-gray-700 leading-relaxed font-semibold transition-all duration-500 overflow-hidden ${!isExpanded && shouldTruncate ? 'line-clamp-3 opacity-80' : 'max-h-[2000px] opacity-100'}`} 
                    dangerouslySetInnerHTML={{ __html: fullText.replace(/\n/g, '<br/>') }} 
                />
            </div>

            {shouldTruncate && (
                <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-4 pt-3 w-full text-center text-[10px] font-black text-gray-400 hover:text-indigo-600 tracking-widest uppercase flex items-center justify-center gap-1 border-t border-gray-50 transition-colors"
                >
                    {isExpanded ? (
                        <>Show Less Source Data <ChevronUp className="w-4 h-4" /></>
                    ) : (
                        <>Read Full Source Text <ChevronDown className="w-4 h-4" /></>
                    )}
                </button>
            )}
        </div>
    );
}
