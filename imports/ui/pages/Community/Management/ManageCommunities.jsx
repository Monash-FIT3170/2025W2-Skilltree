import React, { useState } from 'react';
import { User } from '/imports/utils/User';
import { Search } from 'lucide-react';
import { ManageCommunitiesList } from '/imports/ui/components/Community/Management/ManageCommunitiesList';

export const ManageCommunites = () => {
  const user = User([
    'profile.subscribedCommunities',
    'profile.createdCommunities'
  ]);

  //in case we want to add more filters later
  const filterTabs = [
    {
      title: 'All Communities',
      shortTitle: 'All'
    },
    {
      title: 'Favourites',
      shortTitle: 'Favs'
    },
    {
      title: 'Owned',
      shortTitle: 'Owned'
    }
  ];
  const [activeTab, setActiveTab] = useState(filterTabs.at(0).title);
  const [searchQuery, setSearchQuery] = useState('');
  const filteredCommunities = user.profile?.createdCommunities;

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Manage Communities
        </h1>
      </div>

      {/*Mobile Filter tabs */}
      <div className="lg:hidden mb-4">
        <div className="flex bg-white rounded-lg p-1 shadow-sm">
          {filterTabs.map((tab, index) => {
            return (
              <button
                key={`${tab.title}/${index}`}
                onClick={() => setActiveTab(tab.title)}
                className={`flex-1 text-center px-3 py-2 rounded-md transition-colors text-sm font-medium cursor-pointer ${
                  activeTab === tab.title
                    ? 'bg-[#328E6E] text-white'
                    : 'text-gray-700'
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

      {/*Main Content: all filtered communities*/}
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        <div className="flex-1">
          {/* Search Bar */}
          <div className="relative mb-4 sm:mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Filter your communities"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#328E6E] focus:ring-1 focus:ring-[#328E6E] bg-white text-sm sm:text-base"
            />
          </div>

          {/*List all communities */}
          <ManageCommunitiesList filteredCommunities={filteredCommunities} />
        </div>
      </div>
    </div>
  );
};
