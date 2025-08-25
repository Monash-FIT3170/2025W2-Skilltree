import React from 'react';
import { ChevronRight, Users, Crown } from 'lucide-react';
import { useSubscribeSuspense } from 'meteor/communitypackages:react-router-ssr';
import { useFind } from 'meteor/react-meteor-data/suspense';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';

// This file is used to create the component that shows the users subscribed trees in the create skillforest form

export const SubscribedTrees = ({
  skillTreeId,
  showSubscribers = false,
  currentUserId,
  onSelect
}) => {
  useSubscribeSuspense('skilltrees');

  const skillTree = useFind(SkillTreeCollection, [
    { _id: { $eq: skillTreeId } },
    {
      fields: {
        _id: 1,
        owner: 1,
        image: 1,
        title: 1,
        description: 1,
        subscribers: 1
      }
    }
  ])[0];

  const isOwner = skillTree.owner === currentUserId;

  return (
    // div that triggers onSelect
    <div
      onClick={() => onSelect?.(skillTree._id)}
      className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] overflow-hidden cursor-pointer h-48 w-63.5"
    >
      {/* Cover image / gradient */}
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

        {/* Owner Crown */}
        {isOwner && (
          <div className="absolute top-2 right-2 bg-yellow-500 rounded-full p-1.5 shadow-lg">
            <Crown size={14} className="text-white" />
          </div>
        )}

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
              <Users size={14} />
              <span className="text-xs">
                {skillTree.subscribers.length} members
              </span>
            </div>
          )}
          <button className="text-[#04BF8A] hover:text-[#025940] transition-colors">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
