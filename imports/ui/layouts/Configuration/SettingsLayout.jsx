import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { RouteContent } from './SettingsLayoutOutlet';

export const SettingsLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  
  // Extract current tab from URL path
  const pathSegments = location.pathname.split('/');
  const activeTab = pathSegments[pathSegments.length - 1] || 'account';

  const tabs = [
    { 
      key: 'account', 
      label: 'Account', 
      path: '/settings/account',
    },
    { 
      key: 'profile', 
      label: 'Profile', 
      path: '/settings/profile',
    },
    { 
      key: 'privacy', 
      label: 'Privacy', 
      path: '/settings/privacy',
    },
    { 
      key: 'subscription', 
      label: 'Subscription', 
      path: '/settings/subscription',
    },
    { 
      key: 'notification', 
      label: 'Notification', 
      path: '/settings/notification',
    }
  ];


  const handleTabClick = (tabPath) => {
    navigate(tabPath);

  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#328E6E] mb-4">Settings</h1>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <nav className="flex space-x-1 bg-white border border-gray-200 p-1 rounded-lg shadow-sm">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => handleTabClick(tab.path)}
                className={`px-6 py-2 rounded-md font-medium transition-all duration-200 cursor-pointer ${
                  activeTab === tab.key
                    ? 'bg-[#328E6E] text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
                aria-current={activeTab === tab.key ? 'page' : undefined}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/*React Router v6+ provides a unique location.key for every navigation*/}
        <RouteContent/>

      </div>
    </div>
  );
};