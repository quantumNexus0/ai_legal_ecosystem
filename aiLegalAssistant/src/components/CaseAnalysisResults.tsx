import { AlertTriangle, CheckCircle, FileText, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MatchedCase {
  id: string;
  name: string;
  citation: string;
  court: string;
  year: string;
  matchScore: number;
  whyMatches: string;
  ratio: string;
}

interface AnalysisData {
  userCase: {
    facts: string;
    issues: string;
    sections: string;
    stage: string;
  };
  matchedCases: MatchedCase[];
  strength: number;
  strongPoints: string[];
  weakPoints: string[];
  expectedDirection: string;
  advice: string[];
}

interface CaseAnalysisResultsProps {
  data: AnalysisData;
}

export default function CaseAnalysisResults({ data }: CaseAnalysisResultsProps) {
  const getStrengthColor = (strength: number) => {
    if (strength >= 70) return 'text-green-700 bg-green-50 border-green-200';
    if (strength >= 40) return 'text-amber-700 bg-amber-50 border-amber-200';
    return 'text-red-700 bg-red-50 border-red-200';
  };

  const getMatchColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800 border-green-200';
    if (score >= 60) return 'bg-amber-100 text-amber-800 border-amber-200';
    return 'bg-orange-100 text-orange-800 border-orange-200';
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Analysis Results</h2>
            <p className="text-sm text-gray-600 mt-1">Based on Indian case law precedents</p>
          </div>
          <button className="px-4 py-2 text-sm font-medium text-amber-700 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors">
            Export Report
          </button>
        </div>

        <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-lg border border-gray-200 mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Extracted Case Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Facts</p>
              <p className="text-sm text-gray-900">{data.userCase.facts}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Key Issues</p>
              <p className="text-sm text-gray-900">{data.userCase.issues}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Sections Involved</p>
              <p className="text-sm text-gray-900">{data.userCase.sections || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Stage of Case</p>
              <p className="text-sm text-gray-900">{data.userCase.stage}</p>
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-lg border-2 ${getStrengthColor(data.strength)}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Case Strength Assessment</h3>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold">{data.strength}</span>
              <span className="text-sm font-medium">/100</span>
            </div>
          </div>
          <div className="w-full bg-white rounded-full h-3 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                data.strength >= 70 ? 'bg-green-600' :
                data.strength >= 40 ? 'bg-amber-600' : 'bg-red-600'
              }`}
              style={{ width: `${data.strength}%` }}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Matched Case Laws</h3>
        <div className="space-y-4">
          {data.matchedCases.map((caseItem, index) => (
            <div key={caseItem.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold text-gray-500">#{index + 1}</span>
                    <h4 className="font-bold text-gray-900">{caseItem.name}</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{caseItem.citation}</p>
                  <p className="text-xs text-gray-500">{caseItem.court} • {caseItem.year}</p>
                </div>
                <div className={`px-3 py-1.5 rounded-lg border text-sm font-bold ${getMatchColor(caseItem.matchScore)}`}>
                  {caseItem.matchScore}% Match
                </div>
              </div>
              <div className="space-y-3 mt-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-xs font-semibold text-blue-900 mb-1">Why it matches</p>
                  <p className="text-sm text-blue-800">{caseItem.whyMatches}</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <p className="text-xs font-semibold text-purple-900 mb-1">Key Legal Principle (Ratio Decidendi)</p>
                  <p className="text-sm text-purple-800">{caseItem.ratio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-bold text-gray-900">Strong Arguments</h3>
          </div>
          <ul className="space-y-2">
            {data.strongPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-2">
                <TrendingUp className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h3 className="text-lg font-bold text-gray-900">Weak Points / Risks</h3>
          </div>
          <ul className="space-y-2">
            {data.weakPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-2">
                <TrendingDown className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Minus className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-bold text-gray-900">Expected Direction</h3>
        </div>
        <p className="text-gray-700 leading-relaxed">{data.expectedDirection}</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-amber-600" />
          <h3 className="text-lg font-bold text-gray-900">Actionable Advice</h3>
        </div>
        <div className="space-y-3">
          {data.advice.map((item, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="flex items-center justify-center w-6 h-6 bg-amber-600 text-white text-xs font-bold rounded-full flex-shrink-0">
                {index + 1}
              </span>
              <p className="text-sm text-gray-700">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-600 p-6 rounded-lg">
        <h3 className="font-bold text-red-900 mb-2">Disclaimer</h3>
        <p className="text-sm text-red-800">
          This analysis is generated by AI based on Indian case law precedents and is intended for informational purposes only.
          It is not a substitute for professional legal advice. Always consult with a qualified lawyer before taking any legal action.
        </p>
      </div>
    </div>
  );
}
