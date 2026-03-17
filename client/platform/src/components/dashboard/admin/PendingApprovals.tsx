import { useEffect, useState } from 'react';
import { dashboardService } from '../../../services/dashboardService';

const PendingApprovals = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [pendingLawyers, setPendingLawyers] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPending = async () => {
    try {
      const data = await dashboardService.getPendingLawyers();
      setPendingLawyers(data);
    } catch (error) {
      console.error("Error fetching pending approvals:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleApprove = async (id: number) => {
    try {
      await dashboardService.approveLawyer(id);
      fetchPending();
    } catch (error) {
      console.error("Error approving lawyer:", error);
      alert("Failed to approve lawyer");
    }
  };

  const handleReject = async (id: number) => {
    if (!window.confirm("Are you sure you want to reject this lawyer?")) return;
    try {
      await dashboardService.rejectLawyer(id);
      fetchPending();
    } catch (error) {
      console.error("Error rejecting lawyer:", error);
      alert("Failed to reject lawyer");
    }
  };

  if (loading) return <div className="p-6">Loading pending approvals...</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Pending Approvals</h2>
      {pendingLawyers.length === 0 ? (
        <p className="text-gray-500">No pending approvals at the moment.</p>
      ) : (
        <div className="space-y-4">
          {pendingLawyers.map((lawyer) => (
            <div key={lawyer.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{lawyer.full_name}</p>
                <p className="text-sm text-gray-500">
                  {lawyer.specialization || 'General Law'} - {lawyer.experience_years || 0} years experience
                </p>
                {lawyer.license_number && (
                  <p className="text-xs text-blue-600 font-mono mt-1">
                    License: {lawyer.license_number}
                  </p>
                )}
                {lawyer.email && <p className="text-xs text-gray-400">{lawyer.email}</p>}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleApprove(lawyer.id)}
                  className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(lawyer.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingApprovals;