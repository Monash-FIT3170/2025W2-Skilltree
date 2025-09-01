import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { User } from '/imports/utils/User';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';

import { SubscribedTrees } from '../components/SkillForest/SubscribedTrees';
import { SidePanel } from '../components/SkillForest/SidePanel';

export const SelectSkillTrees = ({ onOpenPopup }) => {
  const user = User([
    '_id',
    'profile.createdCommunities',
    'profile.subscribedCommunities'
  ]);

  const [selectedSkillTree, setSelectedSkillTree] = useState(null);
  // For Toggle Select
  const [selectedSkillTrees, setSelectedSkillTrees] = useState([]);

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
      isMember:
        user?.profile?.subscribedCommunities?.includes(tree._id) || false
    }));

    const sorted = [...skillTreesWithRoles].sort((a, b) => {
      if (a.isOwner && !b.isOwner) return -1;
      if (!a.isOwner && b.isOwner) return 1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return { sortedSkillTrees: sorted };
  }, [user?._id]);

  const toggleSelectSkillTree = id => {
    setSelectedSkillTrees(prev =>
      prev.includes(id) ? prev.filter(treeId => treeId !== id) : [...prev, id]
    );
  };

  return (
    <div className="relative">
      <div className="bg-white rounded-xl border border-gray-100 p-4 lg:p-6 pr-300">
        {/* Subheading */}
        <h2
          className="block text-gray-700 text-xl font-semibold mb-4 -mt-6"
          style={{ color: '#328E6E' }}
        >
          Select SkillTrees
        </h2>
        {sortedSkillTrees.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pr-96">
            {sortedSkillTrees.map(skillTree => (
              <div
                key={skillTree._id}
                className={`relative transition-all duration-300 rounded-xl ${
                  selectedSkillTree === skillTree._id
                    ? 'ring-2 ring-green-500'
                    : ''
                }`}
              >
                <SubscribedTrees
                  skillTreeId={skillTree._id}
                  showSubscribers={true}
                  currentUserId={user._id}
                  onSelect={id => setSelectedSkillTree(id)}
                  isSelected={selectedSkillTrees.includes(skillTree._id)}
                  onToggle={toggleSelectSkillTree}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">
            Looks like you don't have any skill trees. Head to the search bar
            join one!
          </p>
        )}
      </div>

      {/* SidePanel always visible, shows placeholder when no tree selected */}
      <SidePanel skillTreeId={selectedSkillTree} />
      <div className="mt-6 text-center">
        <button
          onClick={() =>
            onOpenPopup?.(
              sortedSkillTrees.filter(tree =>
                selectedSkillTrees.includes(tree._id)
              )
            )
          }
          className="bg-green-500 text-white font-semibold py-2 px-6 rounded hover:bg-green-700 transition-colors"
        >
          Create SkillForest
        </button>
      </div>
    </div>
  );
};
