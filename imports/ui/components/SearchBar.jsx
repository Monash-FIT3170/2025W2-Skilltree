import React, { useState } from 'react';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const items = ['Item1', 'Item2', 'Item3'];

  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-4 max-w-md mx-auto">
      <input
        type="text"
        placeholder="Search..."
        className="border border-gray-300 rounded p-2 w-full"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul className="mt-2">
        {filteredItems.map((item, index) => (
          <li key={index} className="p-1 border-b">
            {item}
          </li>
        ))}
        {filteredItems.length === 0 && <li className="p-1 text-gray-500">No results found</li>}
      </ul>
    </div>
  );
};

export default SearchBar;
