
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
