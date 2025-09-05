import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { ImExit } from '@react-icons/all-files/im/ImExit';

export const AdminDashboardLayout = () => {
  const { id: skilltreeID } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Extract current tab from URL path
  const pathSegments = location.pathname.split('/');
  const activeTab = pathSegments[pathSegments.length - 1] || 'users';

  const tabs = [
    {
      key: 'users',
      label: 'User Management',
      path: 'users'
    },
    {
      key: 'roles',
      label: 'Roles',
      path: 'roles'
    }
    // {
    //   key: 'queue',
    //   label: 'Queue',
    //   path: 'queue'
    // }
  ];

  const handleTabClick = tabPath => {
    navigate(tabPath);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-6">
      <button
        onClick={() => navigate(`/skilltree/${skilltreeID}`)}
        className="flex items-center gap-2 cursor-pointer hover:underline"
      >
        <ImExit className="w-4 h-4" />
        <span> Go Back to SkillTree</span>
      </button>

      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-[#328E6E] mb-4">
            Admin Dashboard
          </h1>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <nav className="flex flex-wrap justify-center sm:space-x-1 bg-white border border-gray-200 p-1 rounded-lg shadow-sm w-full sm:w-auto">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => handleTabClick(tab.path)}
                className={`px-3 sm:px-6 py-2 rounded-md font-medium transition-all duration-200 cursor-pointer text-xs sm:text-sm flex-1 sm:flex-none min-w-0 ${
                  activeTab === tab.key
                    ? 'bg-[#328E6E] text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
                aria-current={activeTab === tab.key ? 'page' : undefined}
              >
                <span className="truncate">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/*React Router v6+ provides a unique location.key for every navigation*/}
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
