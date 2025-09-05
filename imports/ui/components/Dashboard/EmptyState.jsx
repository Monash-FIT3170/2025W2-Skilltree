import React from 'react';
import { useNavigate } from 'react-router-dom';

export const EmptyState = () => {
  const navigate = useNavigate();

  const handleEmptyStateClick = () => {
    navigate('/search');
  };
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-12 px-4">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
            d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        No SkillTrees Joined
      </h3>
      <p className="text-gray-500 text-center text-sm max-w-md leading-relaxed">
        Looks like you don't have any SkillTrees. Head to the search bar and
        join one!
      </p>
      <button
        onClick={handleEmptyStateClick}
        className="mt-4 bg-[#04BF8A] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#025940] transition-colors cursor-pointer"
      >
        Explore SkillTrees
      </button>
    </div>
  );
};
