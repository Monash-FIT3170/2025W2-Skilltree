import React, { useEffect, useState, Suspense } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const SearchResults = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const searchQuery = query.get('query') || '';
  const tagFilters = JSON.parse(query.get('tags') || '[]');

  const [results, setResults] = useState([]);

  useEffect(() => {
    Meteor.call('searchSkillTrees', searchQuery, tagFilters, (err, res) => {
      if (err) {
        console.error(err);
      } else {
        setResults(res);
      }
    });
  }, [searchQuery, tagFilters]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      <Suspense>
        {results.length === 0 ? (
          <p>No results found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {results.map(item => (
              <div
                key={item._id}
                onClick={() => navigate(`/skilltree/${item._id}`)}
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
                      {item.title.charAt(0).toUpperCase()}
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
                    {item.description || 'No description available.'}
                  </p>

                  <div className="flex items-center justify-between">
                    {/* Members */}
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
                        {item.subscribers?.length || '0'} members
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
      </Suspense>
    </div>
  );
};