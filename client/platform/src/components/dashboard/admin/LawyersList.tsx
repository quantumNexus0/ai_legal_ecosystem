import React, { useState } from 'react';
import { dashboardService } from '../../../services/dashboardService';
import { Plus, UserCheck, UserX } from 'lucide-react';
import UserModal from './UserModal';

const LawyersList = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [lawyers, setLawyers] = React.useState<Record<string, any>[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  const fetchLawyers = async () => {
    try {
      setLoading(true);
      const data = await dashboardService.getAllUsers();
      setLawyers(data.filter((u: any) => u.role === 'lawyer'));
    } catch (error) {
      console.error('Failed to fetch lawyers:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchLawyers();
  }, []);

  const handleEdit = (user: any) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleAddLawyer = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleToggleStatus = async (userId: number, currentStatus: boolean) => {
    try {
      await dashboardService.toggleUserStatus(userId, !currentStatus);
      fetchLawyers();
    } catch (error) {
      console.error('Failed to toggle lawyer status:', error);
    }
  };

  if (loading && lawyers.length === 0) return <div className="p-8 text-center text-gray-500 animate-pulse font-medium">Loading lawyers...</div>;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-white">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Lawyer Management</h2>
          <p className="text-sm text-gray-500 mt-0.5">Manage and verify platform lawyers</p>
        </div>
        <button 
          onClick={handleAddLawyer}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all font-semibold shadow-md shadow-indigo-100 active:scale-[0.98]"
        >
          <Plus className="h-5 w-5" />
          Add Lawyer
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100 text-left">
          <thead className="bg-gray-50/50">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Lawyer Details</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Specialization</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-center">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {lawyers.map((lawyer) => (
              <tr key={lawyer.id} className="hover:bg-gray-50/80 transition-all group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                      {lawyer.full_name?.[0]?.toUpperCase() || 'L'}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">{lawyer.full_name || 'Unnamed Lawyer'}</div>
                      <div className="text-sm text-gray-500">{lawyer.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                   <div className="text-sm text-gray-900 font-medium">{lawyer.specialization || 'Not Specified'}</div>
                   <div className="text-xs text-gray-500">{lawyer.experience_years ? `${lawyer.experience_years} years exp.` : 'No exp. listed'}</div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ring-1 ring-inset ${
                    lawyer.is_active 
                      ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' 
                      : 'bg-rose-50 text-rose-700 ring-rose-600/20'
                  }`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${lawyer.is_active ? 'bg-emerald-600' : 'bg-rose-600'}`} />
                    {lawyer.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleEdit(lawyer)}
                      className="px-3 py-1.5 text-xs font-bold text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleToggleStatus(lawyer.id, lawyer.is_active)}
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        lawyer.is_active
                          ? 'text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100'
                          : 'text-emerald-600 hover:bg-emerald-50 border border-transparent hover:border-emerald-100'
                      }`}
                    >
                      {lawyer.is_active ? (
                        <><UserX className="h-4 w-4" /> Deactivate</>
                      ) : (
                        <><UserCheck className="h-4 w-4" /> Activate</>
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {lawyers.length === 0 && !loading && (
          <div className="p-12 text-center">
            <div className="bg-gray-50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
               <Plus className="h-8 w-8 text-gray-300" />
            </div>
            <p className="text-gray-500 font-medium">No lawyers found. Add your first lawyer!</p>
          </div>
        )}
      </div>

      <UserModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchLawyers}
        role="lawyer"
        editingUser={editingUser}
      />
    </div>
  );
};

export default LawyersList;