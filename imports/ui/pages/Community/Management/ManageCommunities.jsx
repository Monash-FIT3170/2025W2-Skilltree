import React, { useState } from 'react';
import { FiSearch } from '@react-icons/all-files/fi/FiSearch';
import { ManageCommunitiesList } from '/imports/ui/components/Community/Management/ManageCommunitiesList';

export const ManageCommunites = () => {
  //in case we want to add more filters later
  const filterTabs = [
    {
      title: 'All Communities',
      shortTitle: 'All'
    },
    {
      title: 'Owned',
      shortTitle: 'Owned'
    }
  ];
  const [activeTab, setActiveTab] = useState(filterTabs.at(0).title);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-6 min-h-screen">
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
          Manage communities
        </h1>
      </div>

      {/*Mobile Filter tabs */}
      <div className="lg:hidden mb-4">
        <div className="flex bg-white rounded-lg p-1 shadow-sm ">
          {filterTabs.map((tab, index) => {
            return (
              <button
                key={`${tab.title}/${index}`}
                onClick={() => setActiveTab(tab.title)}
                className={`flex-1 text-center px-3 py-2 rounded-md transition-colors text-sm font-medium cursor-pointer ${
                  activeTab === tab.title
                    ? 'bg-[#328E6E] text-white'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="hidden xs:inline">{tab.title}</span>
                  <span className="xs:hidden">{tab.shortTitle}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/*Main Content Layout */}
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Main Content Area */}
        <div className="flex-1">
          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Filter your communities"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#328E6E] focus:ring-2 focus:ring-[#328E6E]/20 bg-white text-base"
            />
          </div>

          {/*List all communities */}
          <ManageCommunitiesList
            activeTab={activeTab}
            searchQuery={searchQuery}
          />
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <div className="rounded-lg overflow-hidden">
            <div className="p-2">
              {filterTabs.map((tab, index) => (
                <button
                  key={`${tab.title}/${index}`}
                  onClick={() => setActiveTab(tab.title)}
                  className={`w-full text-left px-3 py-2.5 rounded-md transition-colors text-sm font-medium cursor-pointer ${
                    activeTab === tab.title
                      ? 'bg-[#328E6E] text-white'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {tab.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
