import React from 'react';
import { useFind, useSubscribe } from 'meteor/react-meteor-data/suspense';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';

// This file is used to create the component that shows the users subscribed trees in the create skillforest form

export const SubscribedTrees = ({
  skillTreeId,
  showSubscribers = false,
  onSelect,
  isSelected,
  onToggle
}) => {
  useSubscribe('skilltrees');

  const skillTree = useFind(SkillTreeCollection, [
    { _id: { $eq: skillTreeId } }, // Ensure this is the Mongo _id
    {
      fields: {
        _id: 1,
        owner: 1,
        image: 1,
        title: 1,
        description: 1,
        subscribers: 1,
        skillNodes: 1,
        skillEdges: 1
      }
    }
  ])[0];

  if (!skillTree) return null;

  return (
    <div
      // Only clicking the card (not the toggle) updates SidePanel
      onClick={() => {
        console.log('Card clicked, selected for SidePanel:', skillTree._id);
        onSelect?.(skillTree);
      }}
      className="bg-white relative rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer h-48 w-full"
    >
      {/* Toggle circle */}
      <div className="absolute top-2 right-2 z-10">
        <button
          onClick={e => {
            e.stopPropagation(); // Prevent card click
            console.log('Toggled SkillTree ID:', skillTree._id);
            onToggle?.(skillTree._id); // Only toggle selection for SkillForest
          }}
          className={`w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center cursor-pointer
            ${isSelected ? 'bg-green-500' : 'bg-white'}
          `}
        >
          {isSelected && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Card content */}
      <div
        className={`relative h-24 
          ${!skillTree.image ? 'bg-gradient-to-br from-[#025940] to-[#04BF8A]' : ''}`}
      >
        {skillTree.image && (
          <img
            src={skillTree.image}
            alt={skillTree.title}
            className="w-full h-full object-cover opacity-65"
            onError={e => (e.target.style.display = 'none')}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Title */}
        <h3 className="absolute bottom-3 left-3 text-white font-semibold text-lg">
          {skillTree.title}
        </h3>
      </div>

      {/* Description + footer */}
      <div className="p-4">
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {skillTree.description}
        </p>

        <div className="flex items-center justify-between">
          {showSubscribers && (
            <div className="flex items-center gap-1 text-gray-500">
              <svg
                class="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                  clip-rule="evenodd"
                />
              </svg>

              <span className="text-xs">
                {skillTree.subscribers.length} members
              </span>
            </div>
          )}
          <button className="text-[#04BF8A] hover:text-[#025940] transition-colors"></button>
        </div>
      </div>
    </div>
  );
};
