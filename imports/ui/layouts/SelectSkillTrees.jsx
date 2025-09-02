import React, { useState, useMemo } from 'react';
import { useSubscribe, useFind } from 'meteor/react-meteor-data/suspense';
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
  const [selectedSkillTrees, setSelectedSkillTrees] = useState([]);

  // Subscribe to skilltrees
  useSubscribe('skilltrees');

  // Fetch all subscribed + created skilltrees
  const allSkillTrees = useFind(SkillTreeCollection, [
    {
      _id: {
        $in: [
          ...(user?.profile?.createdCommunities || []),
          ...(user?.profile?.subscribedCommunities || [])
        ]
      }
    },
    {
      sort: { createdAt: -1 },
      fields: {
        _id: 1,
        owner: 1,
        title: 1,
        description: 1,
        createdAt: 1,
        subscribers: 1,
        skillNodes: 1,
        skillEdges: 1
      }
    }
  ]);

  const sortedSkillTrees = useMemo(() => {
    if (!allSkillTrees) return [];
    return allSkillTrees
      .map(tree => ({
        ...tree,
        isOwner: tree.owner === user?._id,
        isMember: (user?.profile?.subscribedCommunities || []).includes(
          tree._id
        )
      }))
      .sort((a, b) => {
        if (a.isOwner && !b.isOwner) return -1;
        if (!a.isOwner && b.isOwner) return 1;
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
  }, [allSkillTrees, user?._id]);

  const toggleSelectSkillTree = id => {
    setSelectedSkillTrees(prev =>
      prev.includes(id) ? prev.filter(treeId => treeId !== id) : [...prev, id]
    );
  };

  const handleSelect = tree => {
    console.log(
      'Card clicked, selected for SidePanel:',
      tree._id,
      tree.skillNodes,
      tree.skillEdges
    );
    setSelectedSkillTree(tree); // store the whole tree, not just the id
  };

  return (
    <div className="relative">
      <div className="bg-white rounded-xl p-4 lg:p-6 pr-300">
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
                  selectedSkillTree?._id === skillTree._id
                    ? 'ring-2 ring-green-500'
                    : ''
                }`}
              >
                <SubscribedTrees
                  skillTreeId={skillTree._id}
                  showSubscribers={true}
                  currentUserId={user._id}
                  onSelect={handleSelect}
                  isSelected={selectedSkillTrees.includes(skillTree._id)}
                  onToggle={toggleSelectSkillTree}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            Looks like you don't have any skilltrees. Head to the search bar to
            join one!
          </p>
        )}
      </div>

      {/* SidePanel always visible, shows placeholder when no tree selected */}
      <div className="w-80">
        <SidePanel skillTree={selectedSkillTree} />
      </div>

      <div className="mt-6 mb-4 flex justify-end pr-128">
        <button
          type="button"
          disabled={selectedSkillTrees.length === 0}
          onClick={() =>
            onOpenPopup?.(
              sortedSkillTrees.filter(tree =>
                selectedSkillTrees.includes(tree._id)
              )
            )
          }
          className={`${
            selectedSkillTrees.length === 0
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-700 cursor-pointer'
          } text-white font-semibold py-2 px-6 rounded transition-colors`}
        >
          Create SkillForest
        </button>
      </div>
    </div>
  );
};
