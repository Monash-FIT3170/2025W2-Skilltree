import React, { useEffect, useState } from 'react';
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
      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map(item => (
            <div
              key={item._id}
              onClick={() => navigate(`/skilltree/${item._id}`)}
              className="bg-[#328e6e] border-2 border-gray-300 hover:border-[#025940] rounded-lg flex flex-col cursor-pointer transition duration-200 shadow-sm hover:shadow-md text-white"
            >
              <div className="h-40 w-full overflow-hidden rounded-t-lg bg-gray-200">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-green-300 to-green-700 flex items-center justify-center text-4xl font-bold">
                    {item.title.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="p-3">
                <h2 className="font-semibold text-lg">{item.title}</h2>
                <p className="text-sm text-gray-200 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
