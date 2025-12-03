import { useState } from 'react';
import { FileText, Download, PenTool, Loader2, CheckCircle } from 'lucide-react';
import { chatWithAI } from '../lib/gemini';
import ReactMarkdown from 'react-markdown';

export default function DocumentDrafting() {
  const [docType, setDocType] = useState('nda');
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [generatedDoc, setGeneratedDoc] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const docTypes = [
    { id: 'nda', name: 'Non-Disclosure Agreement (NDA)', fields: ['Disclosing Party', 'Receiving Party', 'Effective Date', 'Jurisdiction'] },
    { id: 'employment', name: 'Employment Contract', fields: ['Employer Name', 'Employee Name', 'Job Title', 'Start Date', 'Salary'] },
    { id: 'rental', name: 'Rental Agreement', fields: ['Landlord Name', 'Tenant Name', 'Property Address', 'Monthly Rent', 'Lease Term'] },
    { id: 'will', name: 'Last Will and Testament', fields: ['Testator Name', 'Beneficiaries', 'Executor Name', 'Date'] },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const selectedDoc = docTypes.find(d => d.id === docType);
      const prompt = `Draft a professional ${selectedDoc?.name} with the following details:\n` +
        Object.entries(formData).map(([key, value]) => `- ${key}: ${value}`).join('\n') +
        `\n\nEnsure the document is legally sound, well-formatted with clear headings, and includes standard clauses for this type of agreement in India.`;

      const response = await chatWithAI([{ role: 'user', content: prompt }]);
      setGeneratedDoc(response);
    } catch (error) {
      console.error('Error generating document:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([generatedDoc], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${docType}_draft.md`;
    document.body.appendChild(element);
    element.click();
  };

  const currentDoc = docTypes.find(d => d.id === docType);

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <PenTool className="w-6 h-6 text-indigo-600" />
          Legal Document Drafting
        </h2>
        <p className="text-gray-600">Generate customized legal documents powered by AI.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 overflow-hidden">
        {/* Configuration Panel */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 overflow-y-auto">
          <h3 className="font-semibold text-lg mb-4">Document Details</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Document Type</label>
              <select 
                value={docType}
                onChange={(e) => {
                  setDocType(e.target.value);
                  setFormData({});
                  setGeneratedDoc('');
                }}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {docTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              {currentDoc?.fields.map(field => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{field}</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder={`Enter ${field}`}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    value={formData[field] || ''}
                  />
                </div>
              ))}
            </div>

            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4" />
                  Generate Document
                </>
              )}
            </button>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
            <h3 className="font-semibold text-lg">Document Preview</h3>
            {generatedDoc && (
              <button 
                onClick={handleDownload}
                className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center gap-1"
              >
                <Download className="w-4 h-4" />
                Download Markdown
              </button>
            )}
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
            {generatedDoc ? (
              <div className="prose prose-sm max-w-none bg-white p-8 rounded-lg shadow-sm border border-gray-200 mx-auto">
                <ReactMarkdown>{generatedDoc}</ReactMarkdown>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <FileText className="w-16 h-16 mb-4 opacity-20" />
                <p>Fill in the details and click Generate to see the draft here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
