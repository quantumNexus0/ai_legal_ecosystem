import React from 'react';
import { FileText, Calendar, MessageSquare, Clock } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import UserProfile from './profile/UserProfile';
import CasesList from './cases/CasesList';
import AppointmentsList from './appointments/AppointmentsList';
import ChatInterface from '../chat/ChatInterface';
import StatsCard from './StatsCard';
import SmartActions from './SmartActions';

const UserDashboard = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = React.useState(searchParams.get('tab') || 'overview');

  React.useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  const stats = [
    { title: 'Active Cases', value: '2', icon: FileText, trend: '1 New', trendUp: true, color: 'blue' },
    { title: 'Appointments', value: '1', icon: Calendar, trend: 'Upcoming', trendUp: true, color: 'green' },
    { title: 'Messages', value: '5', icon: MessageSquare, color: 'purple' },
    { title: 'Hours Consulted', value: '8', icon: Clock, color: 'amber' },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'cases', label: 'My Cases' },
    { id: 'appointments', label: 'Appointments' },
    { id: 'messages', label: 'Messages' },
    { id: 'profile', label: 'Profile' }
  ];

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          User Dashboard
        </h1>
        <p className="text-sm text-gray-500 font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
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

      {/* Stats Grid - Only show on Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className={`space-y-6 ${activeTab === 'profile' || activeTab === 'messages' ? 'lg:col-span-3' : 'lg:col-span-2'}`}>
          {activeTab === 'overview' && (
            <>
              <SmartActions />
              <div className="hidden lg:block space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <CasesList />
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <AppointmentsList />
                </div>
              </div>
            </>
          )}

          {activeTab === 'cases' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <CasesList />
            </div>
          )}

          {activeTab === 'appointments' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <AppointmentsList />
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="max-w-3xl mx-auto w-full">
              <UserProfile />
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="lg:col-span-3">
              <ChatInterface />
            </div>
          )}
        </div>

        {/* Right Column: Profile - Only show on Desktop for Overview/Cases/Appointments if we want a sidebar, 
            but user asked to ONLY show it when Profile tab is clicked. So we hide it on other tabs. */}
        {activeTab !== 'profile' && activeTab !== 'messages' && (
          <div className="hidden lg:block lg:col-span-1">
            {/* Optional: Show something else here or leave empty. 
                 User said "only show that time profile", so maybe Overview should have it? 
                 Actually, let's just make main area 3 columns if user wants it hidden. */}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;