import React from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const EmptyState = () => {
  const navigate = useNavigate();

  const handleEmptyStateClick = () => {
    navigate('/search');
  };
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-12 px-4">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Search className="text-gray-400" size={24} />
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
