import { useState } from 'react';
import { Search, AlertCircle } from 'lucide-react';

interface CaseFormData {
  facts: string;
  parties: string;
  issues: string;
  sections: string;
  stage: string;
  additionalInfo: string;
}

interface CaseInputFormProps {
  onSubmit: (data: CaseFormData) => void;
}

export default function CaseInputForm({ onSubmit }: CaseInputFormProps) {
  const [formData, setFormData] = useState<CaseFormData>({
    facts: '',
    parties: '',
    issues: '',
    sections: '',
    stage: '',
    additionalInfo: '',
  });

  const stages = [
    'FIR',
    'Charge Sheet',
    'Notice',
    'Civil Suit',
    'Trial',
    'Appeal',
    'Revision',
    'Review',
    'Execution',
    'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof CaseFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Case Details</h2>
        <p className="text-sm text-gray-600 mt-1">
          Provide comprehensive information about your case for accurate analysis
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Facts of the Case *
          </label>
          <textarea
            value={formData.facts}
            onChange={(e) => handleChange('facts', e.target.value)}
            placeholder="Describe the complete facts, events, and circumstances of the case..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none transition-all"
            rows={5}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Parties Involved *
            </label>
            <input
              type="text"
              value={formData.parties}
              onChange={(e) => handleChange('parties', e.target.value)}
              placeholder="e.g., Plaintiff vs Defendant"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Stage of Case *
            </label>
            <select
              value={formData.stage}
              onChange={(e) => handleChange('stage', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              required
            >
              <option value="">Select stage</option>
              {stages.map(stage => (
                <option key={stage} value={stage}>{stage}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Legal Issues / Questions *
          </label>
          <textarea
            value={formData.issues}
            onChange={(e) => handleChange('issues', e.target.value)}
            placeholder="What are the key legal issues or questions in this case?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none transition-all"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Relevant Sections
          </label>
          <input
            type="text"
            value={formData.sections}
            onChange={(e) => handleChange('sections', e.target.value)}
            placeholder="e.g., IPC 302, CrPC 154, CPC 10, Evidence Act 3"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter applicable sections from IPC, CrPC, CPC, Evidence Act, etc.
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Additional Information
          </label>
          <textarea
            value={formData.additionalInfo}
            onChange={(e) => handleChange('additionalInfo', e.target.value)}
            placeholder="Any other relevant details, evidence, witness information, etc."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none transition-all"
            rows={3}
          />
        </div>

        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-blue-900">Note</p>
            <p className="text-xs text-blue-700 mt-1">
              All information is analyzed against our database of Indian case laws.
              Provide as much detail as possible for accurate matching.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 flex items-center justify-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-all shadow-sm hover:shadow-md"
          >
            <Search className="w-5 h-5" />
            Analyze Case
          </button>
          <button
            type="button"
            onClick={() => setFormData({
              facts: '',
              parties: '',
              issues: '',
              sections: '',
              stage: '',
              additionalInfo: '',
            })}
            className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-all"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}
