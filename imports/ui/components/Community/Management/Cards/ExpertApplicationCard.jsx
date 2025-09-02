import React from 'react';

/*
The fields and questions asked to the user in the moderator/expert form will be refactored later.
Thus, for now, we create a separate component for this for easier modification in the future.
*/

export const ExpertApplicationCard = ({ application, onReview }) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-[#328E6E] transition-colors">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {application.name}
            </h3>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
              <span className="ml-1 capitalize">{application.status}</span>
            </span>
          </div>
          <p className="text-gray-600 text-sm mb-2">{application.email}</p>
          <p className="text-gray-500 text-sm mb-3">
            Applied on {new Date(application.createdAt).toLocaleDateString()}
          </p>

          <div className="space-y-2">
            <div>
              <span className="text-sm font-medium text-gray-700">
                Qualifications:{' '}
              </span>
              <span className="text-sm text-gray-600">
                {application.qualifications}
              </span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-700">
                Motivation:{' '}
              </span>
              <span className="text-sm text-gray-600">
                {application.motivation}
              </span>
            </div>
          </div>
        </div>

        {application.status === 'pending' && (
          <div className="flex space-x-2 ml-4">
            <button
              onClick={() =>
                onReview({
                  ...application,
                  type: 'expert'
                })
              }
              className="px-4 py-2 text-[#328E6E] bg-[#328E6E]/10 hover:bg-[#328E6E]/20 rounded-lg transition-colors text-sm"
            >
              Review
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
