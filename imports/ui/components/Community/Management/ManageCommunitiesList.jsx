import React from 'react';
import { User } from '/imports/utils/User';
import { useNavigate } from 'react-router-dom';
import { useSubscribeSuspense } from 'meteor/communitypackages:react-router-ssr';
import { useFind } from 'meteor/react-meteor-data/suspense';
// Mongo Collections
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';

import { Crown } from 'lucide-react';
import { NoSkillTreesFound } from '/imports/ui/components/Community/Fallbacks/NoSkillTreesFound';

/* Community Icon - if they donot have an icon, use fallback.
 Since some of the images are not stored in the AWS bucket, they appear weirdly.
 For now, we display the first letter of the skilltree name
{community.image ? (
  <img
    src={community.image}
    alt={community.title}
    className="w-full h-full object-cover"
  />
)
:community.title?.charAt(0) || '#'
*/

export const ManageCommunitiesList = ({ activeTab, searchQuery }) => {
  const user = User([
    '_id',
    'profile.createdCommunities',
    'profile.subscribedCommunities'
  ]);
  const navigate = useNavigate();

  const createdIds = user?.profile?.createdCommunities ?? [];
  const subscribedIds = user?.profile?.subscribedCommunities ?? [];
  //Using Set will make all elements unique
  const allUniqueIds = [...new Set([...createdIds, ...subscribedIds])];
  // Get all unique skill tree IDs (created + subscribed)
  useSubscribeSuspense('skilltrees');
  const allSkillTrees = useFind(SkillTreeCollection, [
    { _id: { $in: allUniqueIds } },
    {
      fields: {
        _id: 1,
        owner: 1,
        title: 1,
        description: 1,
        image: 1,
        subscribers: 1
      }
    }
  ]).filter(Boolean); //Some elements were null, so we filter out any null results

  // Filter communities based on active tab and search query
  const getFilteredCommunities = () => {
    let filtered = allSkillTrees;

    // Apply tab filter
    if (activeTab === 'Owned') {
      filtered = filtered.filter(community =>
        createdIds.includes(community._id)
      );
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        community =>
          community.title?.toLowerCase().includes(query) ||
          community.description?.toLowerCase().includes(query)
      );
    }

    return filtered;
  };

  const displayedCommunities = getFilteredCommunities();

  const isOwned = communityId => {
    return createdIds.includes(communityId);
  };

  const handleNavigation = skilltreeId => {
    navigate(`/skilltree/${skilltreeId}`);
  };

  return (
    <div className="space-y-0">
      {displayedCommunities.length === 0 ? (
        <NoSkillTreesFound />
      ) : (
        displayedCommunities.map((community, index) => (
          <div
            key={community._id}
            className={`bg-white border-b border-gray-100 p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
              index === 0 ? 'rounded-t-lg border-t border-gray-200' : ''
            } ${
              index === displayedCommunities.length - 1
                ? 'rounded-b-lg border-b border-gray-200'
                : ''
            }`}
          >
            <div
              onClick={() => handleNavigation(community._id)}
              className="flex items-center gap-4"
            >
              {/*The skill tree image */}
              <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                {community.title?.charAt(0) || '#'}
              </div>

              {/* Community Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-medium text-gray-900 truncate">
                    {community.title}
                  </h3>
                  {isOwned(community._id) && (
                    <div className="bg-yellow-500 rounded-full p-1.5 shadow-lg">
                      <Crown size={14} className="text-white" />
                    </div>
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-1 line-clamp-2">
                  {community.description || 'No description available'}
                </p>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                {/* Joined Status */}
                <span className="px-4 py-1.5 bg-gray-200 text-gray-700 text-sm rounded-full font-medium">
                  Joined
                </span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
