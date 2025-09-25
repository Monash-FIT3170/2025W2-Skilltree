import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { SuspenseHydrated } from '../../utils/SuspenseHydrated';
import { SearchLoadingState } from '../components/SiteFrame/SearchLoadingState';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const SearchResults = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const searchQuery = query.get('query') || '';
  const tagFilters = JSON.parse(query.get('tags') || '[]');

  const [results, setResults] = useState([]); // SkillTrees
  const [skillForests, setSkillForests] = useState([]); // SkillForests
  const [activeTab, setActiveTab] = useState('skilltrees'); // 'skilltrees' | 'skillforests'

  useEffect(() => {
    // If no search query, fetch all skill trees AND all skill forests
    if (!searchQuery) {
      Meteor.call('skilltrees.getAll', (err, res) => {
        if (err) {
          console.error(err);
        } else {
          setResults(res);
        }
      });

      // Minimal addition: fetch all forests if available
      Meteor.call('skillforests.getAll', (err, res) => {
        if (err) {
          // If method doesn't exist or error, just set empty
          console.error(err);
          setSkillForests([]);
        } else {
          setSkillForests(res);
        }
      });
    } else {
      Meteor.call('searchSkillTrees', searchQuery, tagFilters, (err, res) => {
        if (err) {
          console.error(err);
        } else {
          setResults(res);
        }
      });

      // Title-only search for forests (minimal change)
      Meteor.call('searchSkillForests', searchQuery, (err, res) => {
        if (err) {
          console.error(err);
        } else {
          setSkillForests(res);
        }
      });
    }
  }, [searchQuery, tagFilters]);

  // select which list to display based on active tab
  const displayedResults = activeTab === 'skilltrees' ? results : skillForests;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>

      {/* Nav: minimal addition, matches provided style */}
      <nav className="flex gap-3 mb-4">
        <button
          onClick={() => setActiveTab('skilltrees')}
          className={`px-6 py-2 rounded-lg font-semibold border transition-colors ${
            activeTab === 'skilltrees'
              ? 'bg-green-600 text-white border-green-600'
              : 'bg-gray-300 text-gray-700 border-gray-300 hover:bg-gray-400'
          }`}
        >
          SkillTrees
        </button>

        <button
          onClick={() => setActiveTab('skillforests')}
          className={`px-6 py-2 rounded-lg font-semibold border transition-colors ${
            activeTab === 'skillforests'
              ? 'bg-green-600 text-white border-green-600'
              : 'bg-gray-300 text-gray-700 border-gray-300 hover:bg-gray-400'
          }`}
        >
          SkillForests
        </button>
      </nav>

      <SuspenseHydrated fallback={<SearchLoadingState />}>
        {displayedResults.length === 0 ? (
          <p className="fadeInEffect">No results found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayedResults.map(item => (
              <div
                key={item._id}
                onClick={() =>
                  navigate(
                    `/${activeTab === 'skilltrees' ? 'skilltree' : 'skillforest'}/${item._id}`
                  )
                }
                className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] overflow-hidden cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-32">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover opacity-65"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-green-300 to-green-700 flex items-center justify-center text-4xl font-bold text-white opacity-80">
                      {item.title?.charAt(0)?.toUpperCase() || '?'}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  <h3 className="absolute bottom-3 left-3 text-white font-semibold text-lg">
                    {item.title}
                  </h3>
                </div>

                {/* Content */}
                <div className="p-4">
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {/* Both skilltrees and forests have description (forest schema does), fallback kept */}
                    {item.description || 'No description available.'}
                  </p>

                  <div className="flex items-center justify-between">
                    {/* Members / Included trees */}
                    <div className="flex items-center gap-1 text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-users"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                        <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                      </svg>
                      <span className="text-xs">
                        {activeTab === 'skilltrees'
                          ? `${item.subscribers?.length || 0} members`
                          : `${item.skilltreeIds?.length || 0} skilltrees`}
                      </span>
                    </div>

                    {/* Chevron */}
                    <div className="text-[#04BF8A] hover:text-[#025940] transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-chevron-right"
                      >
                        <path d="m9 18 6-6-6-6"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </SuspenseHydrated>
    </div>
  );
};
