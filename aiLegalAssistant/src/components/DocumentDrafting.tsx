
import { useState, useEffect } from 'react';
import { FileText, Download, PenTool, Loader2, Search, FileType, ChevronRight } from 'lucide-react';
import { chatWithAI } from '../lib/gemini';
import ReactMarkdown from 'react-markdown';
import { jsPDF } from 'jspdf';
// import { saveAs } from 'file-saver'; // We'll use native blob for zero-dep simplicity where possible

interface Template {
  id: string;
  name: string;
  category: string;
  filename: string;
  path: string;
  content?: string;
}

export default function DocumentDrafting() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [docContent, setDocContent] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingTemplates, setIsFetchingTemplates] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch templates on load
  useEffect(() => {
    fetch('http://localhost:8000/templates')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setTemplates(data);
        } else {
          console.error("Expected array but got:", data);
          setTemplates([]);
        }
        setIsFetchingTemplates(false);
      })
      .catch(err => {
        console.error("Failed to fetch templates", err);
        setTemplates([]);
        setIsFetchingTemplates(false);
      });
  }, []);

  const handleSelectTemplate = async (template: Template) => {
    setIsLoading(true);
    setSelectedTemplate(template);

    try {
      const res = await fetch(`http://localhost:8000/templates/${template.filename}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || `Error ${res.status}`);
      }

      setDocContent(data.content || "Error: Empty content");
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

    try {
      const prompt = `
        I have a legal template for "${selectedTemplate.name}".
        
        USER INPUT details: 
        ${userInput}

        TEMPLATE CONTENT (HTML):
        ${docContent.substring(0, 3000)}... (truncated)

        TASK:
        Rewrite this template filling in the placeholders based on the user input. 
        Return ONLY the filled document text in nice Markdown format.
      `;

      const response = await chatWithAI([{ role: 'user', content: prompt }]);
      setDocContent(response);
    } catch (error) {
      console.error('Error generating document:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const splitText = doc.splitTextToSize(docContent.replace(/[*#]/g, ''), 180);
    doc.text(splitText, 10, 10);
    doc.save(`${selectedTemplate?.name || 'document'}.pdf`);
  };

  const handleDownloadDOCX = () => {
    // Simple text-based DOCX download simulation for now
    const blob = new Blob([docContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedTemplate?.name || 'document'}.doc`;
    link.click();
  };

  const filteredTemplates = templates.filter(t =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col bg-gray-50 p-6 gap-6">

      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <PenTool className="w-6 h-6 text-indigo-600" />
            AI Document Drafter
          </h2>
          <p className="text-gray-600 mt-1">Select a template, provide details, and let AI draft it for you.</p>
        </div>
        {selectedTemplate && (
          <button onClick={() => setSelectedTemplate(null)} className="text-sm text-indigo-600 hover:underline">
            Back to Templates
          </button>
        )}
      </div>

      <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Panel: Template Selection OR AI Input */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {!selectedTemplate ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex-1 flex flex-col overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search templates..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
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
                      <h4 className="font-medium text-gray-900 group-hover:text-indigo-600">{t.name}</h4>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{t.category}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-600" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex-1 flex flex-col gap-4">
              <h3 className="font-semibold text-lg border-b pb-2">Drafting Details</h3>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter details (Names, Dates, Amounts, Start Date, etc.)
                </label>
                <textarea
                  className="w-full h-64 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                  placeholder="e.g. Landlord is John Doe, Tenant is Jane Smith, Rent is $1200, Address is 123 Main St..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                />
              </div>
              <button
                onClick={handleAiDraft}
                disabled={isLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2"
              >
                {isLoading ? <Loader2 className="animate-spin" /> : <PenTool className="w-4 h-4" />}
                Generate Draft
              </button>
            </div>
          )}
        </div>

        {/* Right Panel: Preview & Download */}
        <div className="lg:col-span-8 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
            <h3 className="font-semibold text-gray-900">Document Preview</h3>
            <div className="flex gap-2">
              <button onClick={handleDownloadDOCX} disabled={!docContent} className="px-3 py-1.5 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 flex items-center gap-2 text-gray-700 disabled:opacity-50">
                <FileType className="w-4 h-4 text-blue-600" /> DOCX
              </button>
              <button onClick={handleDownloadPDF} disabled={!docContent} className="px-3 py-1.5 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 flex items-center gap-2 disabled:opacity-50">
                <Download className="w-4 h-4" /> PDF
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
            {isLoading ? (
              <div className="h-full flex items-center justify-center flex-col gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                <p className="text-gray-500">AI is drafting your document...</p>
              </div>
            ) : (
              <div className="bg-white shadow-sm border border-gray-200 min-h-[800px] p-12 max-w-3xl mx-auto">
                {docContent ? (
                  <div className="prose max-w-none font-serif">
                    <ReactMarkdown>
                      {docContent}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <div className="text-center text-gray-400 mt-32">
                    <FileText className="w-16 h-16 mx-auto mb-4 opacity-20" />
                    <p>Select a template to view preview</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
