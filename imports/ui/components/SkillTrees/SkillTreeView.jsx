import { ReactFlowProvider } from '@xyflow/react';
import { useSubscribe, useFind } from 'meteor/react-meteor-data';
import React, { useEffect, useState } from 'react';
import { SkillTreeLogic } from './SkillTree';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';
import { SubscriptionsCollection } from '/imports/api/collections/Subscriptions';
import { Meteor } from 'meteor/meteor';

export const SkillTreeView = ({ id, isAdmin, onBack }) => {
  // 1. Subscribe to the necessary data publications
  const isSkillTreesLoading = useSubscribe('skilltrees');
  const isSubscriptionsLoading = useSubscribe('subscriptions');

  const userId = Meteor.userId();

  // 2. Correctly call useFind. It needs a function that calls Collection.find()
  //    This returns an array of documents, so we take the first one [0].
  const baseSkillTree = useFind(() => SkillTreeCollection.find({ _id: id }), [
    id,
  ])[0];
  const userSubscription = useFind(
    () => SubscriptionsCollection.find({ userId, skillTreeId: id }),
    [userId, id]
  )[0];

  const [skilltree, setSkilltree] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 3. Determine which data to display (user's progress or the base tree)
  useEffect(() => {
    // Wait until subscriptions are ready
    if (!isSkillTreesLoading() && !isSubscriptionsLoading()) {
      if (userSubscription) {
        // If the user is subscribed, use their subscription data (which includes progress)
        setSkilltree(userSubscription);
      } else {
        // Otherwise, fall back to the generic skill tree data
        setSkilltree(baseSkillTree);
      }
    }
  }, [isSkillTreesLoading, isSubscriptionsLoading, baseSkillTree, userSubscription]);

  // 4. Re-integrate your upvote syncing logic
  useEffect(() => {
    const syncNodeUpvotes = async () => {
      // We only need to sync if the user is subscribed and has progress to update
      if (!skilltree || !userSubscription) {
        setIsLoading(false); // Stop loading if there's nothing to sync
        return;
      }

      let updatedNodes = [...skilltree.skillNodes];
      let updatedTotalXp = skilltree.totalXp || 0;
      let requireSyncing = false;

      await Promise.all(
        updatedNodes.map(async (node, index) => {
          if (!node.data.verified && node.data.proofId) {
            const proof = await Meteor.callAsync(
              'findProofID',
              node.data.proofId
            );
            if (proof) {
              const netUpvotes = proof.upvotes - proof.downvotes;
              if (netUpvotes !== node.data.currentNetUpvotes) {
                requireSyncing = true;
                const updatedNodeData = {
                  ...node.data,
                  currentNetUpvotes: netUpvotes,
                };
                if (netUpvotes >= node.data.netUpvotesRequired) {
                  updatedNodeData.verified = true;
                  updatedNodeData.progressXp = node.data.xpPoints;
                  updatedTotalXp += node.data.xpPoints;
                }
                updatedNodes[index] = { ...node, data: updatedNodeData };
              }
            }
          }
        })
      );

      if (requireSyncing) {
        Meteor.callAsync(
          'saveSubscription',
          id,
          updatedNodes,
          skilltree.skillEdges,
          updatedTotalXp
        );
        setSkilltree(prev => ({
          ...prev,
          skillNodes: updatedNodes,
          totalXp: updatedTotalXp,
        }));
      }
      setIsLoading(false); // End loading after sync is complete
    };

    if (skilltree) {
      syncNodeUpvotes();
    } else if (!isSkillTreesLoading() && !isSubscriptionsLoading()) {
      // If there's no data at all and we're done loading, stop the loading spinner
      setIsLoading(false);
    }
  }, [skilltree]); // This effect runs when the skilltree data is first loaded

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!skilltree) {
    return <div>Skill Tree not found.</div>;
  }

  return (
    <ReactFlowProvider>
      <SkillTreeLogic
        id={id}
        isAdmin={isAdmin}
        onSave={() => {}}
        savedNodes={skilltree.skillNodes}
        savedEdges={skilltree.skillEdges}
        onBack={onBack}
      />
    </ReactFlowProvider>
  );
};