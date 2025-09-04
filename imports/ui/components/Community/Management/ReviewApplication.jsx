import React from 'react';

export const ReviewApplication = ({
  selectedApplication,
  setSelectedApplication,
  approveApplication,
  rejectApplication
}) => {
  return (
    <div className="fixed inset-0 bg-gray-900/70 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 border border-gray-200 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center space-x-3">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {selectedApplication.type === 'moderator'
                  ? 'Moderator'
                  : 'Expert'}{' '}
                Application
              </h3>
              <p className="text-gray-600">{selectedApplication.username}</p>
            </div>
          </div>
          <button
            onClick={() => setSelectedApplication(null)}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            X
          </button>
        </div>

        <div className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900">
                {selectedApplication.username}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900">
                {selectedApplication.email}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Qualifications & Experience
            </label>
            <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 min-h-[60px]">
              {selectedApplication.qualifications}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Motivation
            </label>
            <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 min-h-[80px]">
              {selectedApplication.motivation}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Application Date
            </label>
            <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900">
              {new Date(selectedApplication.createdAt).toLocaleDateString(
                'en-US',
                {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={() => rejectApplication(selectedApplication)}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors cursor-pointer"
          >
            Reject
          </button>
          <button
            onClick={() => approveApplication(selectedApplication)}
            className="px-6 py-2 bg-[#328E6E] hover:bg-[#2d7a5e] text-white rounded-lg transition-colors cursor-pointer"
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  );
};
