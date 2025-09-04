import React from 'react';
import { Users } from 'lucide-react';
import { useFind } from 'meteor/react-meteor-data/suspense';
import { useSubscribeSuspense } from 'meteor/communitypackages:react-router-ssr';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';

// Clean SubscribedTrees for popup (no tick circle, no toggle)
export const SubscribedTreesPopup = ({ skillTreeId }) => {
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

  if (!skillTree) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-48 w-64">
      {/* Cover image / gradient */}
      <div
        className={`relative h-24 ${
          !skillTree.image
            ? 'bg-gradient-to-br from-[#025940] to-[#04BF8A]'
            : ''
        }`}
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
          <div className="flex items-center gap-1 text-gray-500">
            <Users size={14} />
            <span className="text-xs">
              {skillTree.subscribers.length} members
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
