import React from 'react';

export const ApplicationTimeline = () => {
  return (
    <>
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Join Our Community
        </h1>
        <p className="text-xl text-gray-600">
          Simple process to become a community leader
        </p>
      </div>

      <div className="space-y-8">
        {/* Step 1 */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 bg-[#328E6E] text-white rounded-full flex items-center justify-center font-bold">
            1
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-1">
              Choose Your Role
            </h4>
            <p className="text-gray-600"> Select your preferred role</p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 bg-[#328E6E] text-white rounded-full flex items-center justify-center font-bold">
            2
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-1">
              Fill Application
            </h4>
            <p className="text-gray-600">
              Complete the form with your qualifications and motivation
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 bg-[#328E6E] text-white rounded-full flex items-center justify-center font-bold">
            3
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-1">Submit</h4>
            <p className="text-gray-600">Send your application for review</p>
          </div>
        </div>

        {/* Step 4 */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 bg-[#328E6E] text-white rounded-full flex items-center justify-center font-bold">
            4
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-1">Review</h4>
            <p className="text-gray-600">
              We'll review your application within 3-5 business days
            </p>
          </div>
        </div>

        {/* Step 5 */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 bg-[#328E6E] text-white rounded-full flex items-center justify-center font-bold">
            5
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-1">
              Role Acceptance
            </h4>
            <p className="text-gray-600">
              Get your new role and start contributing to the community
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
