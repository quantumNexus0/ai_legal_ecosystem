import React from 'react';
import { Calendar, FileText, Trash2, MessageCircle } from 'lucide-react';

import { dashboardService } from '../../../services/dashboardService';

import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';
import { useChatStore } from '../../../store/chatStore';

const CasesList = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { startChat } = useChatStore();
  const [cases, setCases] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  // ... existing code ...

  React.useEffect(() => {
    const fetchCases = async () => {
      try {
        const data = await dashboardService.getLawyerCases();
        setCases(data);
      } catch (error) {
        console.error('Failed to fetch lawyer cases:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCases();
  }, []);

  if (loading) return <div className="p-4 text-gray-500">Loading cases...</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Active Cases</h2>
        {user?.role === 'lawyer' && (
          <button
            onClick={() => navigate('/dashboard/cases/new')}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            New Case
          </button>
        )}
      </div>
      <div className="space-y-4">
        {cases.map((case_) => (
          <div key={case_.id} className="border rounded-lg p-4 hover:bg-gray-50">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">{case_.title}</h3>
                <p className="text-sm text-gray-500">{case_.type}</p>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  Next Hearing: {case_.nextHearing}
                </div>
                <div className="mt-1 text-sm text-gray-500">
                  <FileText className="h-4 w-4 inline mr-1" />
                  Lawyer: {case_.lawyer}
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${case_.status === 'Active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
                  }`}>
                  {case_.status}
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      const otherId = user?.role === 'lawyer' ? case_.client_id : case_.lawyer_id;
                      const otherName = user?.role === 'lawyer' ? case_.client : case_.lawyer;
                      startChat({ id: otherId, name: otherName });
                      navigate('/dashboard?tab=messages');
                    }}
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                    title="Message"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>
                  {user?.role === 'lawyer' && (
                    <button
                      onClick={async () => {
                        if (window.confirm('Are you sure you want to delete this case?')) {
                          try {
                            await dashboardService.deleteCase(case_.id);
                            setCases(cases.filter(c => c.id !== case_.id));
                          } catch (error) {
                            console.error('Failed to delete case:', error);
                            alert('Failed to delete case');
                          }
                        }
                      }}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                      title="Delete Case"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CasesList;