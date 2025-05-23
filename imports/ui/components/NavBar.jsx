import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

export const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const timeout = setTimeout(() => {
      Meteor.call('searchSkillTrees', searchQuery, (err, res) => {
        if (err) {
          console.error('Search error:', err);
        } else {
          setResults(res);
          setShowDropdown(true);
        }
      });
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const handleSearch = e => {
    e.preventDefault();
    setShowDropdown(false);
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleResultClick = id => {
    setShowDropdown(false);
    navigate('');
  };

  return (
    <div className="sticky top-0 z-50">
      <nav className="bg-[#328E6E] h-15 flex items-center justify-between px-5 py-2 relative">
        <div className="flex items-center mr-5">
          <img
            src="/images/logo.png"
            alt="SkillTree Logo"
            className="h-8 w-8 mr-2"
          />
          <div className="text-white text-[24px] font-bold">SKILLTREE</div>
        </div>

        <div className="flex-1 max-w-2xl relative w-full">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search SkillTrees... (try 'sport')"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => setShowDropdown(results.length > 0)}
                className="w-full ps-10 pe-4 py-2 bg-white text-black rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-200"
              />
            </div>
          </form>

          {showDropdown && results.length > 0 && (
            <ul
              ref={dropdownRef}
              className="absolute w-full bg-white shadow-md border border-gray-200 rounded-xl mt-2 z-50 max-h-60 overflow-y-auto"
            >
              {results.map(item => (
                <li
                  key={item._id}
                  className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
                  onClick={() => handleResultClick(item._id)}
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        onError={e => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div
                      className="w-full h-full bg-gradient-to-br from-green-300 to-green-700 flex items-center justify-center text-white font-semibold text-lg"
                      style={{ display: item.image ? 'none' : 'flex' }}
                    >
                      {item.title.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-800 truncate">
                      {item.title}
                    </div>
                    <div className="text-sm text-gray-500 truncate">
                      {item.description}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <Link
          to="/Home"
          className="text-white hover:bg-gray-600 px-3 py-2 rounded"
        >
          Home
        </Link>
        <Link
          to="/Sample"
          className="text-white hover:bg-gray-600 px-3 py-2 rounded"
        >
          Sample
        </Link>
        <Link
          to="/404"
          className="text-white hover:bg-gray-600 px-3 py-2 rounded"
        >
          404
        </Link>
        <Link
          to="/pendingproofs"
          className="text-white hover:bg-gray-600 px-3 py-2 rounded"
        >
          Pending Proofs
        </Link>
        <Link
          to="/upload"
          className="text-white hover:bg-gray-600 px-3 py-2 rounded"
        >
          Upload Proof
        </Link>
        <Link
          to="#" // Placeholder
          className="text-white hover:bg-gray-600 px-3 py-2 rounded"
        >
          User
        </Link>
      </nav>
    </div>
  );
};
