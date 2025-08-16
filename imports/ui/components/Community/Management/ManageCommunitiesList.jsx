import React from 'react';
import { User } from '/imports/utils/User';
import { useSubscribeSuspense } from 'meteor/communitypackages:react-router-ssr';
import { useFind } from 'meteor/react-meteor-data/suspense';
// Mongo Collections
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';

import { Crown } from 'lucide-react';

export const ManageCommunitiesList = ({ filteredCommunities }) => {
  console.log(filteredCommunities);
  const user = User([
    '_id',
    'profile.createdCommunities',
    'profile.subscribedCommunities'
  ]);

  const createdIds = user?.profile?.createdCommunities ?? [];
  const subscribedIds = user?.profile?.subscribedCommunities ?? [];
  //Using Set will make all elements unique
  const allUniqueIds = [...new Set([...createdIds, ...subscribedIds])];
  // Get all unique skill tree IDs (created + subscribed)
  useSubscribeSuspense('skilltrees');
  const allSkillTrees = useFind(SkillTreeCollection, [
    { _id: { $in: allUniqueIds } },
    {
      fields: { _id: 1, owner: 1 }
    }
  ]).filter(Boolean); //Some elements were null, so we filter out any null results

  console.log(allSkillTrees);

  const toggleFavorite = skilltreeId => {
    console.log(skilltreeId);
  };

  return (
    <div className="space-y-2 sm:space-y-3">
      {allSkillTrees.map(community => (
        <div
          key={community.id}
          className="bg-white rounded-lg p-3 sm:p-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-start gap-3 sm:gap-4">
            {/* Skilltree Icon */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#328E6E] rounded-full flex items-center justify-center text-white text-lg sm:text-xl font-bold flex-shrink-0">
              {community.image}
            </div>

            {/* Community Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 sm:mb-2">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                  {community.title}
                </h3>
                {community.isFavorite && (
                  <Crown className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 flex-shrink-0" />
                )}
              </div>
              <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">
                {community.description}
              </p>
              <p className="text-gray-500 text-xs">
                {community.subscribers?.length} members
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 flex-shrink-0">
              <button
                onClick={() => toggleFavorite(community.id)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title={
                  community.isFavorite
                    ? 'Remove from favorites'
                    : 'Add to favorites'
                }
              >
                <Crown
                  className={`h-4 w-4 sm:h-5 sm:w-5 ${
                    community.isFavorite
                      ? 'text-yellow-500 fill-yellow-500'
                      : 'text-gray-400 hover:text-yellow-500'
                  }`}
                />
              </button>
              <span className="px-3 py-1 sm:px-4 sm:py-2 bg-[#328E6E] text-white text-xs sm:text-sm rounded-lg">
                Joined
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
