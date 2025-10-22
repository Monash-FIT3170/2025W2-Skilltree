import React from 'react';
import { FiUsers} from '@react-icons/all-files/fi/FiUsers';
import { FiCheck } from '@react-icons/all-files/fi/FiCheck';

export const UnsubscribeSkillTreeGrid = ({
  skillTrees,
  selectedTreeIds,
  onTreeToggle
}) => {
  const handleCardClick = (tree, event) => {
    const isCheckbox = event.target.closest('.checkbox-area');
    if (isCheckbox) {
      onTreeToggle(tree._id);
    }
  };

  return (
    <div className="flex-1 p-6">
      <div className="h-full overflow-y-auto pr-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {skillTrees.map(tree => (
            <div
              key={tree._id}
              onClick={e => handleCardClick(tree, e)}
              className="bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-300 overflow-hidden cursor-pointer transform hover:scale-[1.01] hover:shadow-lg"
            >
              <div className="relative h-32">
                {tree.image ? (
                  <img
                    src={tree.image}
                    alt={tree.title}
                    className="w-full h-full object-cover opacity-65"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-green-300 to-green-700 flex items-center justify-center text-4xl font-bold text-white opacity-80">
                    {tree.title?.charAt(0)?.toUpperCase() || '?'}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <h3 className="absolute bottom-3 left-3 text-white font-semibold text-lg">
                  {tree.title}
                </h3>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {tree.description || 'No description available.'}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-gray-500">
                    <FiUsers className="w-4 h-4" />
                    <span className="text-xs">
                      {tree.subscribers?.length || 0} members
                    </span>
                  </div>
                  <div
                    className="checkbox-area flex items-center"
                    onClick={e => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      checked={selectedTreeIds.includes(tree._id)}
                      onChange={() => onTreeToggle(tree._id)}
                      className="sr-only"
                      id={`tree-${tree._id}`}
                    />
                    <label
                      htmlFor={`tree-${tree._id}`}
                      className="cursor-pointer"
                    >
                      <div
                        className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                          selectedTreeIds.includes(tree._id)
                            ? 'bg-red-500 border-red-500'
                            : 'border-gray-300 hover:border-red-400'
                        }`}
                      >
                        {selectedTreeIds.includes(tree._id) && (
                          <FiCheck className="w-3 h-3 text-white m-0.5" />
                        )}
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
