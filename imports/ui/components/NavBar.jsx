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
    navigate(`/skilltree/${id}`);
  };

  return (
    <div className="sticky top-0 z-50">
      <nav className="bg-[#328E6E] h-15 flex items-center justify-between px-5 py-2 relative">
        <div className="text-white text-2xl font-bold mr-5">SKILLTREE</div>

        <div className="flex-1 max-w-2xl relative w-full">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search SkillTrees..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onFocus={() => setShowDropdown(results.length > 0)}
              className="w-full px-4 py-2 bg-white text-black rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-200"
            />
          </form>

          {showDropdown && results.length > 0 && (
            <ul
              ref={dropdownRef}
              className="absolute w-full bg-white shadow-md border border-gray-200 rounded-b-xl mt-1 z-50 max-h-60 overflow-y-auto"
            >
              {results.map(item => (
                <li
                  key={item._id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleResultClick(item._id)}
                >
                  <div className="font-medium text-gray-800">{item.title}</div>
                  <div className="text-sm text-gray-500 truncate">
                    {item.description}
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

        <Link
          to="/SignUp"
          className="text-white hover:bg-gray-600 px-3 py-2 rounded"
        >
          SignUp
        </Link>
      </nav>
    </div>
  );
};
