import React from 'react';
import { useSubscribeSuspense } from 'meteor/communitypackages:react-router-ssr';
import { useFind } from 'meteor/react-meteor-data/suspense';
import { User } from '/imports/utils/User';

// Mongo Collections
import { SkillForestCollection } from '/imports/api/collections/SkillForest';

// JSX UI
import { SkillForestCard } from '../components/Dashboard/SkillForestCard';
import { EmptyStateForest } from '../components/Dashboard/EmptyStateForest';
import { create } from 'lodash';

export const DashboardSkillForest = ({ setCommunitiesCount = null }) => {
  const user = User([
    '_id',
    'profile.createdCommunities',
    'profile.subscribedCommunities'
  ]);
  const createdIds = user?.profile?.createdCommunities ?? [];
//   const subscribedIds = user?.profile?.subscribedCommunities ?? [];
  //Using Set will make all elements unique
  const allUniqueIds = [...new Set([...createdIds])];
  // Get all unique skill tree IDs (created + subscribed)
  useSubscribeSuspense('skillForests');
  const allSkillForests = useFind(SkillForestCollection, [
    { _id: { $in: allUniqueIds } },
    {
      fields: { _id: 1, owner: 1, image:1, title:1, description:1, skilltreeIds:1, createdAt: 1 }
    }
  ]).filter(Boolean); //Some elements were null, so we filter out any null results

  // Filter and categorise skill trees
  const skillForestsWithRoles = allSkillForests.map(skillForest => ({
    ...skillForest,
    isOwner: skillForest.owner === user?._id,
    isMember:
      user?.profile?.subscribedCommunities?.includes(skillForest._id) || false
  }));

  const displayedSkillForests = skillForestsWithRoles.slice(0, 6);

  // Sort by ownership first, then by join date or creation date
  const sortedSkillForests = [...skillForestsWithRoles].sort((a, b) => {
    if (a.isOwner && !b.isOwner) return -1;
    if (!a.isOwner && b.isOwner) return 1;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  // Update Manage Communities (value)
  if (setCommunitiesCount) setCommunitiesCount(skillForestsWithRoles.length);

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-100 p-4 lg:p-6">
        {sortedSkillForests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedSkillForests.map(skillForest => (
              <SkillForestCard
                key={skillForest._id}
                // skillForestId={skillForest._id}
                skillForest={skillForest}
                currentUserId={user._id}
              />
            ))}
          </div>
        ) : (
          <EmptyStateForest/>
        )}
      </div>
    </>
  );
};
