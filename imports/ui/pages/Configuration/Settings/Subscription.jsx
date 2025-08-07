import React from 'react';

export const Subscription = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-[#328E6E] mb-2">
          Subscription
        </h2>
        <p className="text-gray-600">Manage your subscription and billing.</p>
      </div>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-gray-700 font-medium mb-2">Current Plan: Free</h3>
        <p className="text-gray-500 mb-4">
          Upgrade to unlock premium features and unlimited access.
        </p>
        <button className="px-6 py-2 bg-[#328E6E] hover:bg-[#2d7a5e] text-white rounded-lg transition-colors">
          Upgrade Now
        </button>
      </div>
    </div>
  );
};
