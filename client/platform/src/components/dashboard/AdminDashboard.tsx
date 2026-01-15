import React from 'react';
import { Users, UserCheck, FileText, AlertCircle } from 'lucide-react';
import UsersList from './admin/UsersList';
import LawyersList from './admin/LawyersList';
import PendingApprovals from './admin/PendingApprovals';
import AdminStatsComponent from './admin/AdminStats';
import { dashboardService, AdminStats } from '../../services/dashboardService';

const AdminDashboard = () => {
  const [adminStats, setAdminStats] = React.useState<AdminStats | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState('overview');

  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await dashboardService.getAdminStats();
        setAdminStats(data);
      } catch (error) {
        console.error('Failed to fetch admin stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const stats = [
    { label: 'Total Users', value: adminStats?.total_users?.toString() || '0', icon: Users },
    { label: 'Active Lawyers', value: adminStats?.active_lawyers?.toString() || '0', icon: UserCheck },
    { label: 'Total Cases', value: adminStats?.total_cases?.toString() || '0', icon: FileText },
    { label: 'Pending Approvals', value: adminStats?.pending_approvals?.toString() || '0', icon: AlertCircle },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'users', label: 'Users' },
    { id: 'lawyers', label: 'Lawyers' },
    { id: 'pending', label: 'Pending Approvals' }
  ];

  if (loading) return <div className="p-6">Loading stats...</div>;

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Admin Dashboard</h1>

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

      {activeTab === 'overview' && (
        <>
          <AdminStatsComponent stats={stats} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <UsersList />
            <LawyersList />
          </div>
          <div className="mt-8 hidden lg:block">
            <PendingApprovals />
          </div>
        </>
      )}

      {activeTab === 'users' && <div className="mt-4"><UsersList /></div>}
      {activeTab === 'lawyers' && <div className="mt-4"><LawyersList /></div>}
      {activeTab === 'pending' && <div className="mt-4"><PendingApprovals /></div>}
    </div>
  );
};

export default AdminDashboard;