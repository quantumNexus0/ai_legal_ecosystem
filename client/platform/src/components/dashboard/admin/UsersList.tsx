import React, { useState } from 'react';
import { dashboardService } from '../../../services/dashboardService';
import { Plus, UserCheck, UserX } from 'lucide-react';
import UserModal from './UserModal';

const UsersList = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [users, setUsers] = React.useState<Record<string, any>[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await dashboardService.getAllUsers();
      // Filter out lawyers if this is purely a "Users" list, 
      // but the user asked for "user and lawyer" buttons. 
      // I'll show only regular users here to keep it distinct from LawyersList.
      setUsers(data.filter((u: any) => u.role === 'user'));
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user: any) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleToggleStatus = async (userId: number, currentStatus: boolean) => {
    try {
      await dashboardService.toggleUserStatus(userId, !currentStatus);
      fetchUsers();
    } catch (error) {
      console.error('Failed to toggle user status:', error);
    }
  };

  if (loading && users.length === 0) return <div className="p-8 text-center text-gray-500 animate-pulse font-medium">Loading users...</div>;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-white">
        <div>
          <h2 className="text-xl font-bold text-gray-900">User Management</h2>
          <p className="text-sm text-gray-500 mt-0.5">Manage and monitor platform users</p>
        </div>
        <button 
          onClick={handleAddUser}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all font-semibold shadow-md shadow-indigo-100 active:scale-[0.98]"
        >
          <Plus className="h-5 w-5" />
          Add User
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100 text-left">
          <thead className="bg-gray-50/50">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">User Details</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-center">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50/80 transition-all group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                      {user.full_name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">{user.full_name || 'Unnamed User'}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ring-1 ring-inset ${
                    user.is_active 
                      ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' 
                      : 'bg-rose-50 text-rose-700 ring-rose-600/20'
                  }`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${user.is_active ? 'bg-emerald-600' : 'bg-rose-600'}`} />
                    {user.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="px-3 py-1.5 text-xs font-bold text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleToggleStatus(user.id, user.is_active)}
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        user.is_active
                          ? 'text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100'
                          : 'text-emerald-600 hover:bg-emerald-50 border border-transparent hover:border-emerald-100'
                      }`}
                    >
                      {user.is_active ? (
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
        {users.length === 0 && !loading && (
          <div className="p-12 text-center">
            <div className="bg-gray-50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
               <Plus className="h-8 w-8 text-gray-300" />
            </div>
            <p className="text-gray-500 font-medium">No users found. Add your first user!</p>
          </div>
        )}
      </div>

      <UserModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchUsers}
        role="user"
        editingUser={editingUser}
      />
    </div>
  );
};

export default UsersList;