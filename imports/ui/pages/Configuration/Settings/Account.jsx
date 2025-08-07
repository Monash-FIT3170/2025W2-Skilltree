import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';

export const Account = () => {
  const [soundEffects, setSoundEffects] = useState(true);

  const user = Meteor.isClient ? Meteor.user() : null;

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* General Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-[#328E6E] mb-2">
              General
            </h2>
            <p className="text-gray-600">Update your account settings.</p>
          </div>
          <button className="px-6 py-2 bg-[#328E6E] hover:bg-[#2d7a5e] text-white rounded-lg transition-colors">
            Save
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              value={user.username}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:border-[#328E6E] focus:ring-1 focus:ring-[#328E6E]"
              readOnly
            />
            <p className="text-gray-500 text-sm mt-2">
              To add a custom URL to your profile, you'll need to{' '}
              <a
                href="#"
                className="text-[#328E6E] hover:text-[#2d7a5e] underline"
              >
                upgrade your account
              </a>
              .
            </p>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={
                user.emails && user.emails.length > 0
                  ? user.emails[0].address
                  : ''
              }
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:border-[#328E6E] focus:ring-1 focus:ring-[#328E6E]"
              readOnly
            />
            <p className="text-gray-500 text-sm mt-2">
              To change your email, please{' '}
              <a
                href="#"
                className="text-[#328E6E] hover:text-[#2d7a5e] underline"
              >
                contact us
              </a>
              .
            </p>
          </div>
        </div>
      </div>

      {/* Learning Settings Section */}
      <div className="border-t border-gray-200 pt-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-[#328E6E] mb-2">
            Accessibility
          </h2>
          <p className="text-gray-600">
            Customise your interactive learning experience.
          </p>
        </div>

        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-gray-700 font-medium mb-1">Sound Effects</h3>
              <p className="text-gray-500 text-sm">
                Activate sound effects for an immersive learning experience
              </p>
            </div>
            <button
              onClick={() => setSoundEffects(!soundEffects)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                soundEffects ? 'bg-[#328E6E]' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  soundEffects ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Account Section */}
      <div className="border-t border-gray-200 pt-8">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              Delete Account
            </h2>
            <p className="text-gray-500 max-w-md">
              We'd hate to see you go, but you're welcome to delete your account
              anytime. Just remember, once you delete it, it's gone forever.
            </p>
          </div>
          <button className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};
