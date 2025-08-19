import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle
} from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserDropdownMenu } from '/imports/ui/components/UserDropdownMenu';

export const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tagFilters, setTagFilters] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [shake, setShake] = useState(false);
  const filtersRef = useRef();
  const navigate = useNavigate();

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (filtersRef.current && !filtersRef.current.contains(event.target)) {
        setShowFilters(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = e => {
    e.preventDefault();

    // If empty search, trigger shake animation
    if (!searchQuery.trim() && tagFilters.length === 0) {
      setShake(true);
      setTimeout(() => setShake(false), 300);
      return;
    }

    navigate(
      `/search?query=${encodeURIComponent(searchQuery)}&tags=${encodeURIComponent(
        JSON.stringify(tagFilters)
      )}`
    );
  };

  const handleTagInputKeyPress = e => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim().toLowerCase();
      if (!tagFilters.includes(newTag)) {
        setTagFilters([...tagFilters, newTag]);
      }
      setTagInput('');
    }
  };

  const removeTagFilter = tagToRemove => {
    setTagFilters(tagFilters.filter(tag => tag !== tagToRemove));
  };

  const clearAllFilters = () => {
    setTagFilters([]);
  };

  return (
    <div className="sticky top-0 z-50">
      <Navbar className="bg-[#328E6E] shadow-lg" fluid>
        <NavbarBrand as={Link} href="/">
          <div className="flex items-center mr-5">
            <img
              src="/images/logo.png"
              alt="SkillTree Logo"
              className="h-8 w-8 mr-2"
            />
            <div className="text-white text-[24px] font-bold">SKILLTREE</div>
          </div>
        </NavbarBrand>

        {/* Search Section */}
        <div className="flex-1 max-w-2xl relative w-full">
          <form onSubmit={handleSearch}>
            <div className="relative flex items-center">
              <div
                className={`flex-1 relative transition-transform duration-300 ${
                  shake ? 'animate-shake' : ''
                }`}
              >
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
                  placeholder="Search SkillTree titles... (try 'Jedi')"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full ps-10 pe-4 py-2 bg-white text-black rounded-l-[8px] shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-200"
                />
              </div>

              {/* Filters Button */}
              <div className="relative" ref={filtersRef}>
                <button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  className={`px-4 py-2 bg-white border-l border-gray-300 rounded-r-[8px] shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-200 flex items-center gap-2 ${
                    tagFilters.length > 0 ? 'text-blue-600' : 'text-gray-700'
                  }`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z"
                    />
                  </svg>
                  Filters
                  {tagFilters.length > 0 && (
                    <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] h-5 flex items-center justify-center">
                      {tagFilters.length}
                    </span>
                  )}
                </button>

                {/* Filters Dropdown */}
                {showFilters && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-gray-900">
                        Filter by Tags
                      </h3>
                      {tagFilters.length > 0 && (
                        <button
                          onClick={clearAllFilters}
                          className="text-xs text-red-600 hover:text-red-800"
                        >
                          Clear All
                        </button>
                      )}
                    </div>

                    <input
                      type="text"
                      placeholder="Type a tag and press Enter"
                      value={tagInput}
                      onChange={e => setTagInput(e.target.value)}
                      onKeyPress={handleTagInputKeyPress}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />

                    {tagFilters.length > 0 && (
                      <div className="mt-3">
                        <div className="flex flex-wrap gap-2">
                          {tagFilters.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-[8px]"
                            >
                              {tag}
                              <button
                                onClick={() => removeTagFilter(tag)}
                                className="hover:text-blue-600"
                              >
                                <svg
                                  className="w-3 h-3"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>

        <NavbarToggle />
        <NavbarCollapse>
          <NavbarLink as={Link} to="/create">
            <div className="text-white hover:bg-gray-600 px-3 py-2 rounded">
              Create SkillTree
            </div>
          </NavbarLink>
          <NavbarLink as={Link} to="/createskillforest">
            <div className="text-white hover:bg-gray-600 px-3 py-2 rounded">
              Create SkillForest
            </div>
          </NavbarLink>
          <UserDropdownMenu />
        </NavbarCollapse>
      </Navbar>

      {/* Tailwind keyframes for shake animation */}
      <style>
        {`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-5px); }
            40%, 80% { transform: translateX(5px); }
          }
          .animate-shake {
            animation: shake 0.3s ease-in-out;
          }
        `}
      </style>
    </div>
  );
};
