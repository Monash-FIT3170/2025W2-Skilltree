import { Meteor } from 'meteor/meteor';
import React from 'react';

export const Password = () => {
  const user = Meteor.user();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-[#328E6E] mb-2">
          Password Settings
        </h2>
        <p className="text-gray-600">
          Update your password and security settings.
        </p>
      </div>
      <div className="space-y-6">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Current Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:border-[#328E6E] focus:ring-1 focus:ring-[#328E6E]"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            New Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:border-[#328E6E] focus:ring-1 focus:ring-[#328E6E]"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Confirm New Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:border-[#328E6E] focus:ring-1 focus:ring-[#328E6E]"
          />
        </div>
        <button className="px-6 py-2 bg-[#328E6E] hover:bg-[#2d7a5e] text-white rounded-lg transition-colors">
          Update Password
        </button>
      </div>
    </div>
  );
};
