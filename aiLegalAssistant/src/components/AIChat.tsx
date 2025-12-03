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

            const results = response.results || response.docs || response;

            if (Array.isArray(results) && results.length > 0) {
                sources = results;
                // Limit to top 2 results
                const topResults = results.slice(0, 2);
                responseContent = `I found ${topResults.length} relevant result${topResults.length > 1 ? 's' : ''} in your local database:\n\n`;

                topResults.forEach((doc: any, index: number) => {
                    const question = doc.question || doc.metadata?.question;
                    const answer = doc.answer || doc.metadata?.answer;

                    let title, content;

                    if (question && answer) {
                        title = `Q: ${question.substring(0, 60)}${question.length > 60 ? '...' : ''}`;
                        content = `**Question:** ${question}\n\n**Answer:** ${answer}`;
                    } else {
                        title = doc.metadata?.title || doc.title || `Document ${index + 1}`;
                        content = doc.page_content || doc.content || doc.text || doc.snippet || 'No content preview available.';
                    }

                    const source = doc.metadata?.source || doc.source || 'Local Repository';
                    const score = doc.score ? `(Relevance: ${Math.round(doc.score * 100)}%)` : '';

                    responseContent += `### ${index + 1}. ${title} ${score}\n`;
                    responseContent += `**Source:** ${source}\n`;
                    responseContent += `> ${content.substring(0, 500)}${content.length > 500 ? '...' : ''}\n\n`;
                    responseContent += `---\n\n`;
                });
            } else {
                responseContent = "I searched your local legal database but couldn't find any documents matching your query. Please try different keywords.";
            }

            const assistantMessage: ChatMessage = {
                id: uuidv4(),
                role: 'assistant',
                content: responseContent,
                timestamp: new Date(),
                sources: sources
            };

            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error: any) {
            console.error('Error:', error);
            setError(error.message || 'Failed to connect to the local Legal Intelligence API. Please ensure the local server is running.');

            const errorMessage: ChatMessage = {
                id: uuidv4(),
                role: 'assistant',
                content: "⚠️ **Error:** Could not connect to the local legal database. Please make sure your local API server is running at http://localhost:8000.",
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
                                className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${message.role === 'user'
                                        ? 'bg-indigo-600 text-white rounded-br-none'
                                        : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                                    }`}
                            >
                                <div className="prose prose-sm max-w-none">
                                    {message.role === 'assistant' ? (
                                        <div dangerouslySetInnerHTML={{
                                            __html: message.content
                                                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                                .replace(/### (.*?)(\n|$)/g, '<h3 class="text-md font-bold text-indigo-700 mt-4 mb-2">$1</h3>')
                                                .replace(/> (.*?)\.\.\./g, '<div class="bg-gray-50 border-l-4 border-gray-300 p-2 my-2 italic text-gray-600">$1...</div>')
                                                .replace(/---/g, '<hr class="my-4 border-gray-200"/>')
                                                .replace(/\n/g, '<br>')
                                        }} />
                                    ) : (
                                        message.content
                                    )}
                                </div>

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

                    {error && (
                        <div className="flex items-center gap-2 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 mx-4">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <p className="text-sm font-medium">{error}</p>
                        </div>
                    )}
                </div>

                <div className="p-4 bg-white border-t border-gray-200">
                    <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-full border border-gray-200 focus-within:border-indigo-300 focus-within:ring-4 focus-within:ring-indigo-50 transition-all">
                        <button
                            type="button"
                            className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                            title="Upload document (Coming soon)"
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
                            placeholder="Search for cases, acts, or legal concepts..."
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
