import { useState, useEffect, useRef } from 'react';
import { Send, Mic, FilePlus, AlertCircle, Volume2, Square, Database, Search } from 'lucide-react';
import { api } from '../services/api';
import { v4 as uuidv4 } from 'uuid';

interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    sources?: any[];
}

export function AIChat() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isListening, setIsListening] = useState(false);
    const [speakingId, setSpeakingId] = useState<string | null>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

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
            const transcript = event.results[0][0].transcript;
            setInput(transcript);
            setIsListening(false);
        };

        recognition.onerror = (event: any) => {
            console.error('Voice recognition error:', event.error);
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

        setIsUploading(true);
        setError(null);

        // Add a system message to show upload started
        const uploadMsgId = uuidv4();
        setMessages((prev) => [...prev, {
            id: uploadMsgId,
            role: 'assistant',
            content: `📄 **Uploading ${file.name}...**\nPlease wait while I analyze the document.`,
            timestamp: new Date()
        }]);

        try {
            const result = await api.uploadDocument(file);
            console.log("Upload result:", result);

            // Update the message to success
            setMessages((prev) => prev.map(msg =>
                msg.id === uploadMsgId
                    ? { ...msg, content: `✅ **Successfully uploaded ${file.name}**\nI have read ${result.chunks} segments from this document. You can now ask me questions about it.` }
                    : msg
            ));
        } catch (error: any) {
            console.error("Upload failed:", error);
            setMessages((prev) => prev.map(msg =>
                msg.id === uploadMsgId
                    ? { ...msg, content: `❌ **Failed to upload ${file.name}**\nError: ${error.message}` }
                    : msg
            ));
            setError('Failed to upload document.');
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

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
            console.log("Searching local datasets for:", currentInput);
            const response = await api.searchDatasets(currentInput);
            console.log("Local API Response:", response);

            let responseContent = '';
            let sources = [];

            // 1. Determine Content (Prefer AI Analysis, fallback to first result)
            if (response.ai_analysis && typeof response.ai_analysis === 'string') {
                responseContent = response.ai_analysis;
            } else if (response.analysis && typeof response.analysis === 'string') {
                responseContent = response.analysis;
            } else {
                // Fallback if no AI Analysis: Construct a summary from top results
                const results = response.results || response.docs || [];
                if (results.length > 0) {
                    responseContent = "I found these relevant legal documents in your local database. Please refer to the sources below for details.";
                } else {
                    responseContent = "I searched your local database but couldn't find any direct matches. Please try broadening your search terms.";
                }
            }

            // 2. Extract Sources
            if (response.results && Array.isArray(response.results)) {
                sources = response.results.slice(0, 4); // Keep top 4 sources
            } else if (Array.isArray(response)) {
                sources = response.slice(0, 4);
            }

            const assistantMessage: ChatMessage = {
                id: uuidv4(),
                role: 'assistant',
                content: responseContent, // Clean Answer
                timestamp: new Date(),
                sources: sources // Structured Sources
            };

            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error: any) {
            console.error('Error:', error);
            setError(error.message || 'Failed to connect to the local Legal Intelligence API.');

            const errorMessage: ChatMessage = {
                id: uuidv4(),
                role: 'assistant',
                content: "⚠️ **Connection Error:** I couldn't reach your local database. Please ensure the backend is running.",
                timestamp: new Date()
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full relative bg-gray-50">
            <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col transition-all overflow-hidden">
                <div className="p-4 border-b flex justify-between items-center bg-white z-10">
                    <div className="flex items-center gap-2">
                        <Database className="w-5 h-5 text-indigo-600" />
                        <h2 className="text-lg font-semibold text-gray-800">Local Legal Intelligence</h2>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium">
                        <span className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            Local API Active
                        </span>
                    </div>
                </div>

                <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50">
                    {messages.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-full text-center p-8 text-gray-500">
                            <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
                                <Search className="w-8 h-8 text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Local Legal Search</h3>
                            <p className="max-w-md text-sm">
                                Enter your legal query below to search through your local database of cases, acts, and regulations.
                                No data is sent to external AI servers.
                            </p>
                        </div>
                    )}

                    {messages.map((message) => (
                        <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div
                                className={`max-w-[92%] lg:max-w-4xl rounded-2xl p-4 shadow-sm ${message.role === 'user'
                                    ? 'bg-indigo-600 text-white rounded-br-none'
                                    : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none z-10'
                                    }`}
                            >
                                <div className="prose prose-sm max-w-none">
                                    {message.role === 'assistant' ? (
                                        <div dangerouslySetInnerHTML={{
                                            __html: (() => {
                                                // Specialized formatter for Legal Structured Output
                                                let html = message.content;

                                                // 1. Title Section (Huge, Indigo, Centered or Prominent)
                                                html = html.replace(/1\.\s*\*\*Title\*\*:\s*(.*?)(\n|$)/g,
                                                    '<div class="mb-4 pb-2 border-b border-indigo-100"><h2 class="text-xl font-bold text-indigo-900 leading-tight">$1</h2></div>');

                                                // 2. Definition Section (Light Blue Box)
                                                html = html.replace(/2\.\s*\*\*Definition\*\*:\s*([\s\S]*?)(?=(3\.|$))/g,
                                                    '<div class="bg-blue-50 rounded-lg p-4 mb-4 border border-blue-100 shadow-sm"><strong class="text-blue-800 uppercase text-xs tracking-wider block mb-1">Definition</strong><p class="text-gray-800 leading-relaxed">$1</p></div>');

                                                // 3. Key Points (styled list)
                                                html = html.replace(/3\.\s*\*\*Key Points\*\*:\s*([\s\S]*?)(?=(4\.|$))/g,
                                                    '<div class="mb-5"><strong class="text-gray-700 uppercase text-xs tracking-wider block mb-2 font-bold">Key Summaries</strong><div class="space-y-1 text-gray-700">$1</div></div>');

                                                // 4. In-depth Details (Prose section)
                                                html = html.replace(/4\.\s*\*\*In-depth Details\*\*:\s*([\s\S]*?)(?=(5\.|$))/g,
                                                    '<div class="mb-5 pt-2"><strong class="text-indigo-700 uppercase text-xs tracking-wider block mb-2 font-bold flex items-center gap-1"><span class="w-1 h-4 bg-indigo-500 rounded-full"></span> Detailed Analysis</strong><div class="prose prose-sm text-gray-600 leading-relaxed pl-2 border-l-2 border-gray-100">$1</div></div>');

                                                // 5. Advantages & Disadvantages (Grid or clean section)
                                                html = html.replace(/5\.\s*\*\*Advantages & Disadvantages\*\*:\s*([\s\S]*?)$/g,
                                                    '<div class="bg-gray-50 rounded-lg p-4 mt-4 border border-gray-200"><strong class="text-gray-700 uppercase text-xs tracking-wider block mb-2">Implications & Pros/Cons</strong><div class="text-sm text-gray-600">$1</div></div>');

                                                // General Formatting (Bullets, Bold, Newlines)
                                                html = html.replace(/^\s*-\s+(.*?)$/gm, '<div class="flex items-start gap-2 mb-1"><span class="text-indigo-500 mt-1.5">•</span><span>$1</span></div>'); // Custom bullet
                                                html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>');
                                                html = html.replace(/\n/g, '<br>');

                                                // Cleanup extra br tags
                                                html = html.replace(/(<br>){3,}/g, '<br><br>');

                                                return html;
                                            })()
                                        }} />
                                    ) : (
                                        message.content
                                    )}
                                </div>

                                {message.sources && message.sources.length > 0 && (
                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1">
                                            <Database className="w-3 h-3" /> Sources & References
                                        </p>
                                        <div className="grid gap-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                                            {message.sources.map((source: any, idx) => (
                                                <SourceCard key={idx} source={source} idx={idx} />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {message.role === 'assistant' && (
                                    <div className="mt-3 flex items-center gap-2 pt-2 border-t border-gray-100">
                                        <button
                                            onClick={() => handleSpeak(message.content, message.id)}
                                            className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
                                            title={speakingId === message.id ? "Stop speaking" : "Read aloud"}
                                        >
                                            {speakingId === message.id ? (
                                                <Square className="w-4 h-4" />
                                            ) : (
                                                <Volume2 className="w-4 h-4" />
                                            )}
                                        </button>
                                        <span className="text-xs text-gray-400 ml-auto">
                                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-white rounded-2xl rounded-bl-none p-4 border border-gray-100 shadow-sm">
                                <div className="flex items-center gap-2 text-gray-500 text-sm">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                    <span>Searching local database...</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {isUploading && (
                        <div className="flex justify-start">
                            <div className="bg-white rounded-2xl rounded-bl-none p-4 border border-gray-100 shadow-sm">
                                <div className="flex items-center gap-2 text-gray-500 text-sm">
                                    <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                                    <span>Processing document...</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="flex items-center gap-2 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 mx-4">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <p className="text-sm font-medium">{error}</p>
                        </div>
                    )}
                </div>

                <div className="p-4 bg-white border-t border-gray-200">
                    <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-full border border-gray-200 focus-within:border-indigo-300 focus-within:ring-4 focus-within:ring-indigo-50 transition-all">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            accept="application/pdf"
                            className="hidden"
                        />
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploading || isLoading}
                            className={`p-2 text-gray-400 hover:text-indigo-600 transition-colors ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            title="Upload PDF Document"
                        >
                            <FilePlus className="w-5 h-5" />
                        </button>

                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSubmit(e);
                                }
                            }}
                            placeholder="Type a message or upload a PDF to chat..."
                            className="flex-1 bg-transparent border-none focus:ring-0 text-gray-800 placeholder-gray-500"
                        />

                        <button
                            type="button"
                            onClick={handleVoiceInput}
                            className={`p-2 rounded-full transition-colors ${isListening
                                ? 'bg-red-100 text-red-600 animate-pulse'
                                : 'text-gray-400 hover:text-indigo-600'
                                }`}
                            title="Voice input"
                        >
                            <Mic className="w-5 h-5" />
                        </button>

                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                handleSubmit(e);
                            }}
                            disabled={isLoading || !input.trim()}
                            className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
                            title="Search"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="text-center mt-2">
                        <p className="text-xs text-gray-400">
                            Powered by Local Legal Intelligence API v1.0
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SourceCard({ source, idx }: { source: any, idx: number }) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Clean up title: Remove .pdf extension and "Relevant excerpt from" prefix
    let rawTitle = source.question || source.metadata?.title || source.source || `Document ${idx + 1}`;
    let title = rawTitle.replace(/\.pdf$/i, '').replace(/^Relevant excerpt from\s+/i, '');

    // Get full text
    const fullText = source.answer || source.page_content || source.text || "No preview available";
    const score = source.score ? Math.round(source.score * 100) : null;

    return (
        <div className="bg-white rounded-lg p-3 text-sm border border-gray-200 hover:border-indigo-300 transition-all shadow-sm group">
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2 max-w-[75%]">
                    <div className="bg-red-50 p-1.5 rounded text-red-600 flex-shrink-0">
                        <FilePlus className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-semibold text-gray-800 truncate" title={rawTitle}>
                        {title}
                    </span>
                </div>
                {score && (
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${score > 80 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                        {score}% Match
                    </span>
                )}
            </div>

            <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-indigo-100 rounded-full"></div>
                <div className={`text-gray-600 text-xs leading-relaxed pl-3 font-mono ${isExpanded ? 'max-h-60 overflow-y-auto pr-2 custom-scrollbar' : 'line-clamp-4'}`}>
                    {fullText}
                </div>

                {fullText.length > 200 && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 uppercase tracking-wider mt-2 ml-3 focus:outline-none"
                    >
                        {isExpanded ? 'Show Less' : 'Read More'}
                    </button>
                )}
            </div>
        </div>
    );
}
