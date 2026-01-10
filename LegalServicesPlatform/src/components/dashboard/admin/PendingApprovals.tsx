import React from 'react';

const PendingApprovals = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Pending Approvals</h2>
      <div className="space-y-4">
        {[1, 2, 3].map((_, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Michael Chen</p>
              <p className="text-sm text-gray-500">Lawyer Application - Criminal Law</p>
              <p className="text-sm text-gray-500">5 years experience</p>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700">
                Approve
              </button>
              <button className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700">
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingApprovals;