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

            const newMessageId = uuidv4();
            const assistantMessage: ChatMessage = {
                id: newMessageId,
                role: 'assistant',
                content: responseContent, // Clean Answer
                timestamp: new Date(),
                sources: sources // Structured Sources
            };

            setMessages((prev) => [...prev, assistantMessage]);
            setCurrentlyTypingId(newMessageId); // Start typing effect for this message

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
                                className={`max-w-[92%] lg:max-w-4xl p-0 ${message.role === 'user'
                                    ? 'bg-indigo-600 text-white rounded-2xl p-4 shadow-md'
                                    : 'text-gray-800 bg-transparent'
                                    }`}
                            >
                                <div className="prose prose-sm max-w-none">
                                    {message.role === 'assistant' ? (
                                        currentlyTypingId === message.id ? (
                                            <TypingEffect
                                                text={message.content}
                                                onComplete={() => setCurrentlyTypingId(null)}
                                            />
                                        ) : (
                                            <div dangerouslySetInnerHTML={{
                                                __html: formatLegalResponse(message.content)
                                            }} />
                                        )
                                    ) : (
                                        message.content
                                    )}
                                </div>

                                {message.sources && message.sources.length > 0 && (!currentlyTypingId || currentlyTypingId !== message.id) && (
                                    <div className="mt-4 pt-4 border-t border-gray-100 animate-fade-in">
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

                                {message.role === 'assistant' && (!currentlyTypingId || currentlyTypingId !== message.id) && (
                                    <div className="mt-3 flex items-center gap-2 pt-2 border-t border-gray-100 animate-fade-in">
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

// Typing Effect Component
const TypingEffect = ({ text, onComplete, formatter = formatLegalResponse }: { text: string; onComplete?: () => void, formatter?: (t: string) => string }) => {
    const [displayedText, setDisplayedText] = useState('');
    const indexRef = useRef(0);

    useEffect(() => {
        indexRef.current = 0;
        setDisplayedText('');

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
        }, 5); // Faster typing for sources

        return () => clearInterval(intervalId);
    }, [text, onComplete]);

    return (
        <div dangerouslySetInnerHTML={{
            __html: formatter(displayedText)
        }} />
    );
};

// Helper function to format legal response (shared)
function formatLegalResponse(html: string) {
    // simplified formatter for Natural Chat Style

    // 1. Title Section - Clean Bold Header
    html = html.replace(/1\.\s*\*\*Title\*\*:\s*(.*?)(\n|$)/g,
        '<h3 class="text-lg font-bold text-gray-900 mt-4 mb-2">$1</h3>');

    // 2. Definition Section - Just Text
    html = html.replace(/2\.\s*\*\*Definition\*\*:\s*([\s\S]*?)(?=(3\.|$))/g,
        '<p class="text-gray-800 leading-relaxed mb-6"><strong class="text-indigo-900 font-bold">Definition:</strong> $1</p>');

    // 3. Key Points - Standard Bullet List
    html = html.replace(/3\.\s*\*\*Key Points\*\*:\s*([\s\S]*?)(?=(4\.|$))/g,
        '<p class="mb-2"><strong class="text-indigo-900 font-bold text-lg">Key Points:</strong></p><ul class="list-none space-y-3 pl-1 mb-6">$1</ul>');

    // 4. In-depth Details - Clean Prose
    html = html.replace(/4\.\s*\*\*In-depth Details\*\*:\s*([\s\S]*?)(?=(5\.|$))/g,
        '<p class="mb-2"><strong class="text-indigo-900 font-bold text-lg">Analysis:</strong></p><div class="text-gray-800 leading-relaxed mb-6 space-y-2">$1</div>');

    // 5. Advantages & Disadvantages
    html = html.replace(/5\.\s*\*\*Advantages & Disadvantages\*\*:\s*([\s\S]*?)$/g,
        '<p class="mt-4"><strong class="text-indigo-900 font-bold text-lg">Implications:</strong> $1</p>');

    // General Formatting

    // Highlight Sub-points (text before colon)
    html = html.replace(/^\s*-\s+\*\*(.*?)\*\*:/gm, '<li class="flex items-start gap-3"><span class="text-indigo-600 mt-1.5 min-w-[6px]">•</span><span><strong class="text-gray-900 font-bold">$1:</strong>');
    html = html.replace(/^\s*-\s+(.*?)$/gm, '<li class="flex items-start gap-3"><span class="text-indigo-600 mt-1.5 min-w-[6px]">•</span><span>$1</span></li>');

    // Bold text handling
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>');
    html = html.replace(/\n/g, '<br>');

    // Cleanup extra br tags
    html = html.replace(/(<br>){3,}/g, '<br><br>');
    html = html.replace(/<li class="flex/g, '<li class="flex mb-3"'); // Add spacing to items

    return html;
}

// Helper to format source text (clauses, bolding)
function formatSourceText(text: string) {
    if (!text) return '';
    let html = text;

    // 1. Convert markdown bold to HTML first
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900 font-bold">$1</strong>');

    // 2. Identify Clause Subheadings (e.g., (3) Text...) and make them block elements
    // We look for (number) followed by text until a newline or end of string
    html = html.replace(/(^|\n)(\(\d+\)\s+.*?)(\n|$)/g, '$1<div class="text-indigo-900 font-bold mt-3 mb-1 block">$2</div>$3');

    // 3. Highlight sub-clauses like (a), (b) inline
    html = html.replace(/(\([a-z]\))/g, '<strong class="text-indigo-700 font-bold">$1</strong>');

    // 4. Identify specific Legal Headers (Protection of...) - Handle multi-line headers
    html = html.replace(/(^|[\.\n]\s*)(Protection\s+(?:in|of)\s+[^.]+(?:\.|:)?)/g, (_, prefix, content) => {
        const cleanContent = content.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
        return `${prefix}<div class="text-gray-900 font-extrabold mt-4 mb-2 uppercase tracking-wide text-xs">${cleanContent}</div>`;
    });

    // 5. Line breaks for remaining text
    html = html.replace(/\n/g, '<br/>');

    // 6. Clean up multiple BRs
    html = html.replace(/(<br\/>){3,}/g, '<br/><br/>');

    // 7. Ensure (number) clauses that didn't match the full line regex still get highlighted if inline
    // (This acts as a fallback or for inline references)
    html = html.replace(/(\(\d+\))/g, (match) => {
        return match.includes('div') ? match : `<strong class="text-indigo-900 font-bold">${match}</strong>`;
    });

    return html;
}

// function SourceCard start
function SourceCard({ source, idx }: { source: any, idx: number }) {
    // Clean up title: Remove .pdf extension and "Relevant excerpt from" prefix
    let rawTitle = source.question || source.metadata?.title || source.source || `Document ${idx + 1}`;
    let title = rawTitle.replace(/\.pdf$/i, '').replace(/^Relevant excerpt from\s+/i, '');

    // Get full text
    const fullText = source.answer || source.page_content || source.text || "No preview available";
    const score = source.score ? Math.round(source.score * 100) : null;

    return (
        <div className="mb-4 pb-2 border-b border-gray-100 last:border-0 block">
            <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-bold text-sm text-gray-900" title={rawTitle}>
                    {idx + 1}. {title}
                </h4>
                {score && (
                    <span className="text-xs font-mono text-gray-400">
                        {score}% Match
                    </span>
                )}
            </div>

            <div
                className="text-gray-600 text-xs leading-relaxed space-y-1"
                dangerouslySetInnerHTML={{ __html: formatSourceText(fullText) }}
            />
        </div>
    );
}
