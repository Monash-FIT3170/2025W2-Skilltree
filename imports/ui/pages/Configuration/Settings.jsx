import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';

export const Settings = () => {
  const [activeTab, setActiveTab] = useState('Account');
  const [soundEffects, setSoundEffects] = useState(true);
  const tabs = ['Account', 'Password', 'Subscription'];

  //Current logged in User Information
  const user = Meteor.user();

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Account':
        return (
          <div className="space-y-8">
            {/* General Section */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-2">
                    General
                  </h2>
                  <p className="text-gray-400">Update your account settings.</p>
                </div>
                <button className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors">
                  Save
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={user.username ?? 'Your Username'}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    readOnly
                  />
                  <p className="text-gray-400 text-sm mt-2">
                    To add a custom URL to your profile, you'll need to{' '}
                    <a
                      href="#"
                      className="text-emerald-400 hover:text-emerald-300"
                    >
                      upgrade your account
                    </a>
                    .
                  </p>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={user.emails.at(0).address}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    readOnly
                  />
                  <p className="text-gray-400 text-sm mt-2">
                    To change your email, please{' '}
                    <a
                      href="#"
                      className="text-emerald-400 hover:text-emerald-300"
                    >
                      contact us
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>

            {/* Learning Settings Section */}
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-white mb-2">
                  Learning Settings
                </h2>
                <p className="text-gray-400">
                  Customise your interactive learning experience.
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-white font-medium mb-1">
                      Sound Effects
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Activate sound effects for an immersive learning
                      experience
                    </p>
                  </div>
                  <button
                    onClick={() => setSoundEffects(!soundEffects)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      soundEffects ? 'bg-emerald-500' : 'bg-gray-600'
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
            <div className="border-t border-gray-700 pt-8">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-2">
                    Delete Account
                  </h2>
                  <p className="text-gray-400 max-w-md">
                    We'd hate to see you go, but you're welcome to delete your
                    account anytime. Just remember, once you delete it, it's
                    gone forever.
                  </p>
                </div>
                <button className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        );
      case 'Password':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-2">
                Password Settings
              </h2>
              <p className="text-gray-400">
                Update your password and security settings.
              </p>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <button className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors">
                Update Password
              </button>
            </div>
          </div>
        );
      case 'Subscription':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-2">
                Subscription
              </h2>
              <p className="text-gray-400">
                Manage your subscription and billing.
              </p>
            </div>
            <div className="bg-gray-700 rounded-lg p-6">
              <h3 className="text-white font-medium mb-2">
                Current Plan: Free
              </h3>
              <p className="text-gray-400 mb-4">
                Upgrade to unlock premium features and unlimited access.
              </p>
              <button className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors">
                Upgrade Now
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Settings</h1>
          <p className="text-gray-400">
            Manage and update your SkillTree account info
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-emerald-500 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-gray-800 rounded-lg p-8">{renderTabContent()}</div>
      </div>
    </div>
  );
};
