import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { User } from '/imports/utils/User';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';

import { SubscribedTrees } from '../components/SkillForestComponents/SubscribedTrees';
import { SidePanel } from '../components/SkillForestComponents/SidePanel';

export const SelectSkillTrees = () => {
  const user = User([
    '_id',
    'profile.createdCommunities',
    'profile.subscribedCommunities'
  ]);

  const [selectedSkillTree, setSelectedSkillTree] = useState(null);

  const { sortedSkillTrees } = useTracker(() => {
    const sub = Meteor.subscribe('skilltrees');
    if (!sub.ready()) return { sortedSkillTrees: [] };

    const createdIds = user?.profile?.createdCommunities ?? [];
    const subscribedIds = user?.profile?.subscribedCommunities ?? [];
    const allUniqueIds = [...new Set([...createdIds, ...subscribedIds])];

    const allSkillTrees = SkillTreeCollection.find(
      { _id: { $in: allUniqueIds } },
      { sort: { createdAt: -1 } }
    ).fetch();

    const skillTreesWithRoles = allSkillTrees.map(tree => ({
      ...tree,
      isOwner: tree.owner === user?._id,
      isMember: user?.profile?.subscribedCommunities?.includes(tree._id) || false
    }));

    const sorted = [...skillTreesWithRoles].sort((a, b) => {
      if (a.isOwner && !b.isOwner) return -1;
      if (!a.isOwner && b.isOwner) return 1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return { sortedSkillTrees: sorted };
  }, [user?._id]);

  return (
    <div className="relative">
      <div className="bg-white rounded-xl border border-gray-100 p-4 lg:p-6">
        {sortedSkillTrees.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedSkillTrees.map(skillTree => (
              <div
                key={skillTree._id}
                className={`relative transition-all duration-300 rounded-xl ${
                  selectedSkillTree === skillTree._id
                    ? 'ring-2 ring-[#04BF8A] ring-offset-0 scale-[1.02]'
                    : ''
                }`}
              >
                <SubscribedTrees
                  skillTreeId={skillTree._id}
                  showSubscribers={true}
                  currentUserId={user._id}
                  onSelect={id => setSelectedSkillTree(id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">
            Looks like you don't have any skill trees. Head to the search bar join one!
          </p>
        )}
      </div>

      {/* SidePanel always visible, shows placeholder when no tree selected */}
      <SidePanel skillTreeId={selectedSkillTree} />
    </div>
  );
};
