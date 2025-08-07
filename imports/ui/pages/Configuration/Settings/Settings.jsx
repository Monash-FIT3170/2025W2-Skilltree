import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { motion, AnimatePresence } from 'framer-motion';

//Import setting components
import { Account } from '/imports/ui/pages/Configuration/Settings/Account';
import { Profile } from '/imports/ui/pages/Configuration/Settings/Profile';
import { Password } from '/imports/ui/pages/Configuration/Settings/Password';
import { Subscription } from '/imports/ui/pages/Configuration/Settings/Subscription';
import { Notification } from '/imports/ui/pages/Configuration/Settings/Notification';
import { NotFound } from '@aws-sdk/client-s3';

export const Settings = () => {
  const [activeTab, setActiveTab] = useState('Account');

  const tabs = [
    'Account',
    'Profile',
    'Password',
    'Subscription',
    'Notifications',
    'lol'
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Account':
        return <Account />;

      case 'Profile':
        return <Profile />;

      case 'Password':
        return <Password />;

      case 'Subscription':
        return <Subscription />;

      case 'Notifications':
        return <Notification />;

      default:
        return <NotFound />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#328E6E] mb-4">Settings</h1>
          <p className="text-gray-600">
            Manage and update your SkillTree account info
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-1 bg-white border border-gray-200 p-1 rounded-lg shadow-sm">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-[#328E6E] text-white'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              {renderTabContent()}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
