import React, { useState } from 'react';
import { X } from 'lucide-react';
import { dashboardService } from '../../../services/dashboardService';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  role: 'user' | 'lawyer';
  editingUser?: any;
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, onSuccess, role, editingUser }) => {
  const [formData, setFormData] = useState({
    email: '',
    full_name: '',
    password: '',
    phone: '',
    role: role,
    specialization: '',
    experience_years: '',
    office_address: '',
    license_number: '',
    bio: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  React.useEffect(() => {
    if (isOpen) {
      if (editingUser) {
        setFormData({
          email: editingUser.email || '',
          full_name: editingUser.full_name || '',
          password: '',
          phone: editingUser.phone || '',
          role: editingUser.role || role,
          specialization: editingUser.specialization || '',
          experience_years: editingUser.experience_years?.toString() || '',
          office_address: editingUser.office_address || '',
          license_number: editingUser.license_number || '',
          bio: editingUser.bio || '',
        });
      } else {
        setFormData({
          email: '',
          full_name: '',
          password: '',
          phone: '',
          role: role,
          specialization: '',
          experience_years: '',
          office_address: '',
          license_number: '',
          bio: '',
        });
      }
      setError('');
    }
  }, [isOpen, role, editingUser]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const submissionData: any = {
        email: formData.email,
        full_name: formData.full_name,
        phone: formData.phone,
        role: formData.role,
      };

      if (formData.password) {
        submissionData.password = formData.password;
      }

      if (role === 'lawyer') {
        submissionData.specialization = formData.specialization;
        submissionData.experience_years = formData.experience_years ? parseInt(formData.experience_years) : 0;
        submissionData.office_address = formData.office_address;
        submissionData.license_number = formData.license_number;
        submissionData.bio = formData.bio;
        submissionData.is_approved = true;
      }

      if (editingUser) {
        await dashboardService.updateUserAdmin(editingUser.id, submissionData);
      } else {
        submissionData.is_active = true;
        await dashboardService.createUserAdmin(submissionData);
      }
      
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error('Error saving user:', err);
      setError(err.response?.data?.detail || 'Failed to save user. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gray-50/50">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{editingUser ? 'Edit' : 'Add New'} {role === 'lawyer' ? 'Lawyer' : 'User'}</h3>
            <p className="text-sm text-gray-500 mt-0.5">{editingUser ? 'Update account details' : 'Fill in the details for the new account'}</p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {error && (
            <div className="p-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5" />
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-0.5">Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Rahul Sharma"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-gray-900"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-0.5">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="rahul@example.com"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-gray-900"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-0.5">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+91 9876543210"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-gray-900"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-0.5">{editingUser ? 'New Password (Optional)' : 'Set Password'}</label>
              <input
                type="password"
                required={!editingUser}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-gray-900"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              {editingUser && <p className="text-xs text-gray-400 mt-1 ml-1">Leave blank to keep existing password</p>}
            </div>

            {role === 'lawyer' && (
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-0.5">Specialization</label>
                  <input
                    type="text"
                    placeholder="e.g. Criminal Law"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-gray-900"
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-0.5">Years of Exp.</label>
                    <input
                      type="number"
                      placeholder="10"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-gray-900"
                      value={formData.experience_years}
                      onChange={(e) => setFormData({ ...formData, experience_years: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-0.5">License No.</label>
                    <input
                      type="text"
                      placeholder="BCI-12345"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-gray-900"
                      value={formData.license_number}
                      onChange={(e) => setFormData({ ...formData, license_number: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-0.5">Office Address</label>
                  <input
                    type="text"
                    placeholder="Physical office address"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-gray-900"
                    value={formData.office_address}
                    onChange={(e) => setFormData({ ...formData, office_address: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-0.5">Professional Bio</label>
                  <textarea
                    rows={3}
                    placeholder="Short professional summary..."
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-gray-900 resize-none"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-gray-100 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-all font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-[2] px-4 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 active:scale-[0.98] transition-all font-semibold shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:active:scale-100"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Processing...
                </span>
              ) : `${editingUser ? 'Save Changes' : `Create ${role === 'lawyer' ? 'Lawyer' : 'User'}`}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
