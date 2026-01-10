import React from 'react';
import { Calendar, Users, FileText, Clock } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import LawyerProfile from './profile/LawyerProfile';
import CasesList from './cases/CasesList';
import AppointmentsList from './appointments/AppointmentsList';
import ChatInterface from '../chat/ChatInterface';
import StatsCard from './StatsCard';

import { useAuthStore } from '../../store/authStore';
import { dashboardService, LawyerStats } from '../../services/dashboardService';

const LawyerDashboard = () => {
  const { user } = useAuthStore();
  const [searchParams] = useSearchParams();
  const [lawyerStats, setLawyerStats] = React.useState<LawyerStats | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState(searchParams.get('tab') || 'overview');

  React.useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await dashboardService.getLawyerStats();
        setLawyerStats(data);
      } catch (error) {
        console.error('Failed to fetch lawyer stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const stats = [
    { label: 'Active Cases', value: lawyerStats?.active_cases?.toString() || '0', icon: FileText },
    { label: 'Total Clients', value: lawyerStats?.total_clients?.toString() || '0', icon: Users },
    { label: 'Appointments Today', value: lawyerStats?.appointments_today?.toString() || '0', icon: Calendar },
    { label: 'Hours Worked', value: lawyerStats?.hours_worked?.toString() || '0', icon: Clock },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'cases', label: 'Cases' },
    { id: 'appointments', label: 'Appointments' },
    { id: 'messages', label: 'Messages' },
    { id: 'profile', label: 'Profile' }
  ];

  if (loading) return <div className="p-6">Loading dashboard...</div>;

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Lawyer Dashboard</h1>
        <p className="text-gray-600 font-medium">Welcome, {user?.name}</p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-gray-200 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`whitespace-nowrap py-4 px-6 text-sm font-medium border-b-2 transition-colors duration-200 ${activeTab === tab.id
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Stats Cards - Only show on Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.label}
              value={stat.value}
              icon={stat.icon}
              color={["blue", "green", "purple", "amber"][index % 4] as any}
            />
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Tab Content */}
        {activeTab === 'profile' ? (
          <div className="lg:col-span-3 max-w-3xl mx-auto w-full">
            <LawyerProfile />
          </div>
        ) : activeTab === 'messages' ? (
          <div className="lg:col-span-3">
            <ChatInterface />
          </div>
        ) : (
          <>
            <div className="lg:col-span-2 space-y-6">
              {activeTab === 'overview' && (
                <div className="hidden lg:block space-y-6">
                  <CasesList />
                  <AppointmentsList />
                </div>
              )}
              {activeTab === 'cases' && <CasesList />}
              {activeTab === 'appointments' && <AppointmentsList />}

              {/* Mobile Overview Hint */}
              {activeTab === 'overview' && (
                <div className="lg:hidden">
                  <p className="text-gray-500 text-center py-8 bg-white rounded-xl border border-dashed">
                    Select a tab above to view details
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar for other tabs on Desktop (Optional, but hiding per user request) */}
            <div className="hidden lg:block lg:col-span-1">
              {/* Profile is hidden here because user said "only show that time profile" */}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LawyerDashboard;