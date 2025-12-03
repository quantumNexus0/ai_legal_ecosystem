import { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CaseInputForm from './components/CaseInputForm';
import CaseAnalysisResults from './components/CaseAnalysisResults';
import ComparisonTable from './components/ComparisonTable';
import CaseLibrary from './components/CaseLibrary';
import { AIChat } from './components/AIChat';
import { History, ChevronRight } from 'lucide-react';
import { indianKanoon } from './services/indianKanoon';
import LegalAnalyticsDashboard from './components/LegalAnalyticsDashboard';
import DocumentDrafting from './components/DocumentDrafting';
import { compareCases } from './lib/gemini';
import { mockMatchedCases, mockComparisonRows, mockBaseAnalysisData } from './data/mockData';

interface CaseFormData {
  facts: string;
  parties: string;
  issues: string;
  sections: string;
  stage: string;
  additionalInfo: string;
}

interface AnalysisRecord {
  id: string;
  date: string;
  formData: CaseFormData;
  result: any;
}

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

import { api } from './services/api';

function App() {
  const [activeView, setActiveView] = useState('analyze');
  const [showResults, setShowResults] = useState(false);
  const [analysisHistory, setAnalysisHistory] = useState<AnalysisRecord[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [apiStatus, setApiStatus] = useState<string>('checking');

  useEffect(() => {
    const saved = localStorage.getItem('analysisHistory');
    if (saved) {
      setAnalysisHistory(JSON.parse(saved));
    }

    // Check API connection
    api.checkHealth()
      .then(data => {
        console.log('API Status:', data);
        setApiStatus('connected');
      })
      .catch(err => {
        console.error('API Connection Error:', err);
        setApiStatus('disconnected');
      });
  }, []);

  // Base mock data structure
  const baseAnalysisData: AnalysisData = mockBaseAnalysisData;

  const [currentAnalysisData, setCurrentAnalysisData] = useState<AnalysisData>(baseAnalysisData);

  const mockComparisonData = {
    caseName: 'State of Maharashtra v. Ramdas Shrinivas Nayak',
    rows: mockComparisonRows.slice(0, 7) // Take first 7 for default view
  };

  const [comparisonData, setComparisonData] = useState(mockComparisonData);

  const handleCaseSubmit = async (data: CaseFormData) => {
    setIsAnalyzing(true);

    try {
      // Construct query from facts and issues
      const query = `${data.facts} ${data.issues} ${data.sections}`.trim();

      let matchedCases = [];

      try {
        const searchResults = await indianKanoon.search(query);

        // Map API results to application format
        matchedCases = searchResults.docs.slice(0, 3).map((doc, index) => ({
          id: doc.tid.toString(),
          name: doc.title,
          citation: doc.citation || 'Citation not available',
          court: doc.docsource || 'Court not specified',
          year: doc.publishdate ? new Date(doc.publishdate).getFullYear().toString() : 'N/A',
          matchScore: 85 - (index * 5), // Mock score based on rank
          whyMatches: doc.headline ? doc.headline.replace(/<[^>]*>?/gm, '') : 'Relevant case based on search query keywords.',
          ratio: 'Click to view full judgment text for detailed ratio decidendi.'
        }));
      } catch (error) {
        console.error("API Error, falling back to mock data", error);
        // Fallback to mock data if API fails
        // Fallback to mock data if API fails
        matchedCases = mockMatchedCases.slice(0, 3);
      }

      const analysisResult = {
        ...baseAnalysisData,
        userCase: {
          facts: data.facts,
          issues: data.issues,
          sections: data.sections || 'Not specified',
          stage: data.stage
        },
        matchedCases: matchedCases.length > 0 ? matchedCases : baseAnalysisData.matchedCases
      };

      // Perform AI Comparison with the top matched case
      let comparisonRows = mockComparisonData.rows;
      if (analysisResult.matchedCases.length > 0) {
        const topCase = analysisResult.matchedCases[0];
        const userCaseSummary = `Facts: ${data.facts}. Issues: ${data.issues}.`;
        const precedentSummary = `Case: ${topCase.name}. Summary: ${topCase.whyMatches}`;

        try {
          const aiComparison = await compareCases(userCaseSummary, precedentSummary);
          if (Array.isArray(aiComparison) && aiComparison.length > 0 && aiComparison[0].parameter !== "Error") {
            comparisonRows = aiComparison;
          }
        } catch (err) {
          console.error("Comparison failed, using mock", err);
        }
      }

      setCurrentAnalysisData(analysisResult);

      // Update the mockComparisonData state or a new state for comparison
      // For this refactor, we'll update the mockComparisonData variable which is used in render
      // But since mockComparisonData is a const in the component body, we need a state for it.
      // Let's add a state for comparison data.
      setComparisonData({
        caseName: analysisResult.matchedCases[0]?.name || 'Unknown Case',
        rows: comparisonRows
      });

      const newRecord: AnalysisRecord = {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString(),
        formData: data,
        result: analysisResult
      };

      const updatedHistory = [newRecord, ...analysisHistory];
      setAnalysisHistory(updatedHistory);
      localStorage.setItem('analysisHistory', JSON.stringify(updatedHistory));

      setShowResults(true);
    } catch (error) {
      console.error("Analysis failed", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const loadHistoryItem = (record: AnalysisRecord) => {
    setCurrentAnalysisData(record.result);
    setShowResults(true);
    setActiveView('analyze');
  };

  const renderContent = () => {
    if (activeView === 'analyze' && !showResults) {
      return (
        <>
          {isAnalyzing ? (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
              <p className="text-gray-600">Analyzing case precedents...</p>
            </div>
          ) : (
            <CaseInputForm onSubmit={handleCaseSubmit} />
          )}
        </>
      );
    }

    if (activeView === 'analyze' && showResults) {
      return (
        <div className="space-y-6">
          <button
            onClick={() => setShowResults(false)}
            className="text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors"
          >
            ← New Analysis
          </button>
          <CaseAnalysisResults data={currentAnalysisData} />
          <ComparisonTable caseName={comparisonData.caseName} rows={comparisonData.rows} />
        </div>
      );
    }

    if (activeView === 'history') {
      return (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <History className="w-6 h-6 text-indigo-600" />
              <h2 className="text-xl font-bold text-gray-900">Analysis History</h2>
            </div>

            {analysisHistory.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p>No previous analyses found.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {analysisHistory.map((record) => (
                  <div
                    key={record.id}
                    onClick={() => loadHistoryItem(record)}
                    className="py-4 flex items-center justify-between hover:bg-gray-50 px-4 -mx-4 cursor-pointer transition-colors"
                  >
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">
                        {record.formData.facts.substring(0, 60)}...
                      </h3>
                      <div className="flex gap-4 text-sm text-gray-500">
                        <span>{record.date}</span>
                        <span>{record.formData.sections}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    }

    if (activeView === 'cases') {
      return <CaseLibrary />;
    }

    if (activeView === 'ai') {
      return <AIChat />;
    }

    if (activeView === 'stats') {
      return <LegalAnalyticsDashboard analysisHistory={analysisHistory} />;
    }

    if (activeView === 'drafting') {
      return <DocumentDrafting />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header apiStatus={apiStatus} />
      <div className="flex">
        <Sidebar activeView={activeView} onViewChange={setActiveView} />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;

