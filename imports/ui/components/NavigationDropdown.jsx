import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

export const NavigationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block">
      {/* Dropdown Trigger */}
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-3 px-6 py-3 bg-[#328E6E] rounded-[22px] transition-all duration-200 hover:bg-[#2a7a5e]"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="flex items-center gap-2">
          <img
            src="https://picsum.photos/50/50"
            alt="Logo"
            className="w-8 h-8 rounded-full"
          />
          <h2 className="text-white text-2xl font-semibold leading-none !font-sans">
            Basketball
          </h2>
        </div>
        <FiChevronDown
          className={`w-6 h-6 text-white transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
    </div>
  );
};
