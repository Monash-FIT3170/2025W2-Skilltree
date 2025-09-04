import React from 'react';
import { useSubscribe, useFind } from 'meteor/react-meteor-data/suspense';
import { User } from '/imports/utils/User';

// Mongo Collections
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';

// JSX UI
import { SkillTreeCard } from '../components/Dashboard/SkillTreeCard';
import { EmptyState } from '../components/Dashboard/EmptyState';

export const DashboardSkillTrees = () => {
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
  useSubscribe('skilltrees');
  const allSkillTrees = useFind(SkillTreeCollection, [
    { _id: { $in: allUniqueIds } },
    {
      fields: { _id: 1, owner: 1 }
    }
  ]).filter(Boolean); //Some elements were null, so we filter out any null results

  // Filter and categorise skill trees
  const skillTreesWithRoles = allSkillTrees.map(skillTree => ({
    ...skillTree,
    isOwner: skillTree.owner === user?._id,
    isMember:
      user?.profile?.subscribedCommunities?.includes(skillTree._id) || false
  }));

  const displayedSkillTrees = skillTreesWithRoles.slice(0, 6);

  // Sort by ownership first, then by join date or creation date
  const sortedSkillTrees = [...skillTreesWithRoles].sort((a, b) => {
    if (a.isOwner && !b.isOwner) return -1;
    if (!a.isOwner && b.isOwner) return 1;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-100 p-4 lg:p-6">
        {sortedSkillTrees.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedSkillTrees.map(skillTree => (
              <SkillTreeCard
                key={skillTree._id}
                skillTreeId={skillTree._id}
                showSubscribers={true}
                currentUserId={user._id}
              />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </>
  );
};
