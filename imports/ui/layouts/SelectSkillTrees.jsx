import React, { useState } from 'react';
import { useSubscribeSuspense } from 'meteor/communitypackages:react-router-ssr';
import { useFind } from 'meteor/react-meteor-data/suspense';
import { User } from '/imports/utils/User';

// Mongo Collections
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';

// JSX UI
import { SubscribedTrees } from '../components/SkillForestComponents/SubscribedTrees';
import { SidePanel } from '../components/SkillForestComponents/SidePanel';

export const SelectSkillTrees = () => {
  //track which skill tree is selected
  const [selectedSkillTree, setSelectedSkillTree] = useState(null);

  const user = User([
    '_id',
    'profile.createdCommunities',
    'profile.subscribedCommunities'
  ]);

  const createdIds = user?.profile?.createdCommunities ?? [];
  const subscribedIds = user?.profile?.subscribedCommunities ?? [];
  const allUniqueIds = [...new Set([...createdIds, ...subscribedIds])];

  useSubscribeSuspense('skilltrees');
  const allSkillTrees = useFind(SkillTreeCollection, [
    { _id: { $in: allUniqueIds } },
    {
      fields: { _id: 1, owner: 1, createdAt: 1 }
    }
  ]).filter(Boolean);

  const skillTreesWithRoles = allSkillTrees.map(skillTree => ({
    ...skillTree,
    isOwner: skillTree.owner === user?._id,
    isMember:
      user?.profile?.subscribedCommunities?.includes(skillTree._id) || false
  }));

  const displayedSkillTrees = skillTreesWithRoles.slice(0, 6);

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
              <SubscribedTrees
                key={skillTree._id}
                skillTreeId={skillTree._id}
                showSubscribers={true}
                currentUserId={user._id}
                onSelect={() => setSelectedSkillTree(skillTree._id)} // click handler sets the selected ID
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">
            Looks like you don't have any skill trees. Head to the search bar
            join one!
          </p>
        )}
      </div>

      {/* SidePanel rendered when a skill tree is selected */}
      {selectedSkillTree && (
        <SidePanel
          skillTreeId={selectedSkillTree}
          onClose={() => setSelectedSkillTree(null)} // close resets selection
        />
      )}
    </>
  );
};
