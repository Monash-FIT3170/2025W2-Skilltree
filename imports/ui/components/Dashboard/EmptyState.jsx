import React from 'react';
import { Plus, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


export const EmptyState = ({ type }) => {
  const navigate = useNavigate();

  const handleEmptyStateClick = () => {
    if (type === 'created') {
      navigate("/create");
    } else if (type === 'joined') {
      navigate('/all-communities')
    }
  }
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-12 px-4">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        {type === 'created' ? (
          <Plus className="text-gray-400" size={24} />
        ) : (
          <Search className="text-gray-400" size={24} />
        )}
      </div>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        {type === 'created'
          ? 'No Skill Trees Created'
          : 'No Communities Joined'}
      </h3>
      <p className="text-gray-500 text-center text-sm max-w-md leading-relaxed">
        {type === 'created'
          ? 'Start building your first skill tree and help others learn new skills.'
          : "Looks like you don't have any skill trees. Head to the search bar and join one!"}
      </p>
      <button 
        onClick={handleEmptyStateClick}
        className="mt-4 bg-[#04BF8A] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#025940] transition-colors cursor-pointer">
        {type === 'created' ? 'Create Skill Tree' : 'Explore Communities'}
      </button>
    </div>
  );
};
