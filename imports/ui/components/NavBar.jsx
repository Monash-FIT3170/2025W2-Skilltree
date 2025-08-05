import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import {
  Navbar,
  NavbarBrand,
  NavbarToggle,
  NavbarCollapse,
  NavbarLink
} from 'flowbite-react';

// JSX UI
import { UserDropdownMenu } from '/imports/ui/components/UserDropdownMenu';

export const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [tagFilters, setTagFilters] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const navigate = useNavigate();
  const dropdownRef = useRef();
  const filtersRef = useRef();

  useEffect(() => {
    if (!searchQuery.trim() && tagFilters.length === 0) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const timeout = setTimeout(() => {
      Meteor.call('searchSkillTrees', searchQuery, tagFilters, (err, res) => {
        if (err) {
          console.error('Search error:', err);
        } else {
          setResults(res);
          setShowDropdown(true);
        }
      });
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchQuery, tagFilters]);

  // Clse dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (filtersRef.current && !filtersRef.current.contains(event.target)) {
        setShowFilters(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = e => {
    e.preventDefault();
    setShowDropdown(true);
  };

  const handleResultClick = id => {
    setShowDropdown(false);
    navigate(`/skilltree/${id}`);
  };

  const handleTagInputKeyPress = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim().toLowerCase();
      if (!tagFilters.includes(newTag)) {
        setTagFilters([...tagFilters, newTag]);
      }
      setTagInput('');
    }
  };

  const removeTagFilter = (tagToRemove) => {
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
              <div className="flex-1 relative">
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
                  placeholder="Search SkillTree titles... (try 'sport')"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onFocus={() => setShowDropdown(results.length > 0)}
                  className="w-full ps-10 pe-4 py-2 bg-white text-black rounded-l-full shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-200"
                />
              </div>
              
              {/* Filters Button */}
              <div className="relative" ref={filtersRef}>
                <button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  className={`px-4 py-2 bg-white border-l border-gray-300 rounded-r-full shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-200 flex items-center gap-2 ${
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
                      <h3 className="text-sm font-medium text-gray-900">Filter by Tags</h3>
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
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={handleTagInputKeyPress}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                    
                    {tagFilters.length > 0 && (
                      <div className="mt-3">
                        <div className="flex flex-wrap gap-2">
                          {tagFilters.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                            >
                              {tag}
                              <button
                                onClick={() => removeTagFilter(tag)}
                                className="hover:text-blue-600"
                              >
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
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

          {/* Search Results Dropdown */}
          {showDropdown && results.length > 0 && (
            <ul
              ref={dropdownRef}
              className="absolute w-full bg-white shadow-md border border-gray-200 rounded-xl mt-2 z-40 max-h-60 overflow-y-auto"
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

        <NavbarToggle />
        <NavbarCollapse>
          <NavbarLink as={Link} to="/pendingproofs">
            <div className="text-white hover:bg-gray-600 px-3 py-2 rounded">
              Pending Proofs
            </div>
          </NavbarLink>
          <NavbarLink as={Link} to="/create">
            <div className="text-white hover:bg-gray-600 px-3 py-2 rounded">
              Create SkillTree
            </div>
          </NavbarLink>
          <UserDropdownMenu />
        </NavbarCollapse>
      </Navbar>
    </div>
  );
};