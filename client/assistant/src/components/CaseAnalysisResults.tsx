import { AlertTriangle, CheckCircle, FileText, TrendingUp, TrendingDown, Minus, Scale, BookOpen, Quote } from 'lucide-react';

interface MatchedCase {
  id: string;
  name: string;
  citation: string;
  court: string;
  year: string;
  matchScore: number;
  whyMatches: string; // This maps to "question" in the JSON
  ratio: string;      // This maps to "answer" in the JSON
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
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 md:p-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Scale className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">Legal AI Analysis</h2>
            </div>
            <p className="text-sm text-gray-500 font-medium">Neural processing of Indian Case Law & Precedents</p>
          </div>
          <button className="w-full md:w-auto px-6 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100 active:scale-95">
            Generate Legal Memo
          </button>
        </div>

        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-8">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Input Context</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-1">
              <p className="text-xs font-bold text-indigo-600 uppercase">Facts</p>
              <p className="text-base text-gray-900 font-medium line-clamp-2" title={data.userCase.facts}>{data.userCase.facts}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold text-indigo-600 uppercase">Key Issues</p>
              <p className="text-base text-gray-900 font-medium line-clamp-2" title={data.userCase.issues}>{data.userCase.issues}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold text-indigo-600 uppercase">Statutes</p>
              <p className="text-base text-gray-900 font-medium">{data.userCase.sections || 'General'}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold text-indigo-600 uppercase">Stage</p>
              <p className="text-base text-gray-900 font-medium">{data.userCase.stage}</p>
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-2xl border-2 ${getStrengthColor(data.strength)} ring-4 ring-opacity-10 ${data.strength >= 70 ? 'ring-green-100' : data.strength >= 40 ? 'ring-amber-100' : 'ring-red-100'}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black uppercase tracking-tight">Case Probability Score</h3>
              <div className="group relative">
                <div className="cursor-help w-4 h-4 rounded-full bg-current bg-opacity-10 flex items-center justify-center text-[10px]">?</div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-gray-900 text-white text-xs rounded hidden group-hover:block z-10">
                  Calculated based on similarity to successful historical precedents.
                </div>
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-black">{data.strength}</span>
              <span className="text-base font-bold opacity-60">%</span>
            </div>
          </div>
          <div className="w-full bg-white bg-opacity-50 rounded-full h-4 p-1 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out shadow-sm ${
                data.strength >= 70 ? 'bg-green-600' :
                data.strength >= 40 ? 'bg-amber-600' : 'bg-red-600'
              }`}
              style={{ width: `${data.strength}%` }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-gray-900" />
            <h3 className="text-2xl font-black text-gray-900">Matched Case Laws</h3>
          </div>
          <span className="text-sm font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{data.matchedCases.length} Results</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {data.matchedCases.map((caseItem, index) => (
            <div key={caseItem.id} className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-indigo-300 hover:shadow-2xl hover:shadow-indigo-50/50 transition-all group flex flex-col h-full">
              <div className="flex items-start justify-between mb-4 gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black text-white bg-gray-900 px-1.5 py-0.5 rounded">#{index + 1}</span>
                    <h4 className="text-lg font-bold text-gray-900 truncate group-hover:text-indigo-600 transition-colors uppercase tracking-tighter">{caseItem.name}</h4>
                  </div>
                  <p className="text-xs font-bold text-gray-400 uppercase truncate">{caseItem.citation}</p>
                </div>
                <div className={`shrink-0 px-2.5 py-1 rounded-lg border text-sm font-black shadow-sm ${getMatchColor(caseItem.matchScore)}`}>
                  {caseItem.matchScore}% Match
                </div>
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="bg-indigo-50/50 p-5 rounded-2xl border border-indigo-50 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-2 opacity-5">
                      <Quote className="w-10 h-10 text-indigo-900" />
                   </div>
                  <p className="text-[10px] font-bold text-indigo-900 uppercase mb-2 flex items-center gap-1 tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                    Legal Context
                  </p>
                  <p className="text-base text-indigo-900 leading-relaxed font-medium line-clamp-4">
                    {caseItem.whyMatches}
                  </p>
                </div>
                
                <div className="bg-amber-50/50 p-5 rounded-2xl border border-amber-50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 opacity-10">
                      <Scale className="w-10 h-10 text-amber-900" />
                   </div>
                  <p className="text-[10px] font-bold text-amber-900 uppercase mb-2 flex items-center gap-1 tracking-widest">
                     <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                     Court Decision / Ratio
                  </p>
                  <p className="text-base text-amber-900 leading-relaxed font-black mb-1">
                    {caseItem.ratio}
                  </p>
                </div>
              </div>
              
              <div className="mt-5 pt-5 border-t border-gray-100 flex items-center justify-between">
                 <span className="text-xs font-bold text-gray-400">{caseItem.court} • {caseItem.year}</span>
                 <button className="text-xs font-black text-indigo-600 hover:text-indigo-800 uppercase tracking-widest">Full Judgment →</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 overflow-hidden relative group">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-green-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700" />
          <div className="flex items-center gap-3 mb-6 relative">
            <div className="p-3 bg-green-100 rounded-xl">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Strong Arguments</h3>
          </div>
          <ul className="space-y-4 relative">
            {data.strongPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-4 group/item">
                <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-green-50 flex items-center justify-center group-hover/item:bg-green-600 transition-colors">
                  <TrendingUp className="w-3 h-3 text-green-600 group-hover/item:text-white transition-colors" />
                </div>
                <span className="text-base text-gray-700 font-bold leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 overflow-hidden relative group">
           <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-red-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700" />
          <div className="flex items-center gap-3 mb-6 relative">
            <div className="p-3 bg-red-100 rounded-xl">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Weak Points / Risks</h3>
          </div>
          <ul className="space-y-4 relative">
            {data.weakPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-4 group/item">
                <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-red-50 flex items-center justify-center group-hover/item:bg-red-600 transition-colors">
                  <TrendingDown className="w-3 h-3 text-red-600 group-hover/item:text-white transition-colors" />
                </div>
                <span className="text-base text-gray-700 font-bold leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-gray-900 rounded-2xl shadow-2xl p-10 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
           <TrendingUp className="w-48 h-48" />
        </div>
        <div className="flex items-center gap-3 mb-6 relative">
          <Minus className="w-8 h-8 text-indigo-400" />
          <h3 className="text-2xl font-black uppercase tracking-widest">Expected Direction</h3>
        </div>
        <p className="text-xl text-indigo-100 leading-relaxed font-medium relative max-w-4xl">
          {data.expectedDirection}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-10">
        <div className="flex items-center gap-4 mb-10">
          <div className="p-3 bg-amber-100 rounded-xl">
            <FileText className="w-7 h-7 text-amber-600" />
          </div>
          <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">AI Strategic Counsel</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.advice.map((item, index) => (
            <div key={index} className="flex flex-col gap-4 p-8 bg-gray-50 rounded-3xl hover:bg-amber-50 transition-colors border border-transparent hover:border-amber-200 group">
              <span className="flex items-center justify-center w-10 h-10 bg-white border border-gray-200 text-amber-600 text-sm font-black rounded-2xl shadow-sm group-hover:bg-amber-600 group-hover:text-white transition-all transform group-hover:scale-110">
                {index + 1}
              </span>
              <p className="text-base text-gray-800 font-black leading-snug">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-red-600 to-red-800 p-10 rounded-2xl text-white shadow-2xl shadow-red-100">
        <h3 className="flex items-center gap-3 font-black text-2xl mb-6">
          <AlertTriangle className="w-8 h-8" />
          AI LEGAL DISCLAIMER
        </h3>
        <p className="text-base text-red-50 leading-relaxed font-bold">
          This analysis is synthesized via advanced neural networks based on historical Indian Judicial precedents. 
          Artificial Intelligence can misinterpret complex legal nuances. This report does NOT constitute professional legal advice. 
          Always finalize litigation strategies in consultation with a qualified legal practitioner.
        </p>
      </div>
    </div>
  );
}
