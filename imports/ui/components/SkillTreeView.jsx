import { ReactFlowProvider } from '@xyflow/react';
import { useSubscribeSuspense } from 'meteor/communitypackages:react-router-ssr';
import { useFind } from 'meteor/react-meteor-data/suspense';
import React, { useEffect, useState } from 'react';
import { SkillTreeLogic } from './SkillTree';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';
import { Meteor } from 'meteor/meteor';

export const SkillTreeView = ({ id, isAdmin, onBack }) => {
  useSubscribeSuspense('skilltrees');
  const [skilltree, setSkilltree] = useState(null);

  // Always call useFind at the top level - but don’t necessarily use it right away
  const fallbackSkillTree = useFind(
    SkillTreeCollection,
    [
      { _id: { $eq: id } },
      {
        fields: {
          skillNodes: 1,
          skillEdges: 1
        }
      }
    ],
    [id]
  )[0];

  /* Fetches proof for each node and syncs netUpvotes.
  If required netUpvotes threshold is reached, node is marked as verified and XP is earned.
  Then updates DB and local state */
  const syncNodeUpvotes = async () => {
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

            // Only update if currentNetUpvotes has changed
            if (netUpvotes != node.data.currentNetUpvotes) {
              requireSyncing = true;
              const updatedNode = {
                ...node.data,
                currentNetUpvotes: netUpvotes
              };

              if (netUpvotes >= node.data.netUpvotesRequired) {
                console.log(
                  `Required net upvotes reached - SkillNode Verified! "${node.data.label}", id: ${node.id}`
                );
                updatedNode.verified = true;
                updatedTotalXp += node.data.xpPoints;
                console.log(`${node.data.xpPoints} XP earned!`);
              }
              updatedNodes[index] = { ...node, data: updatedNode };
            }
          }
        }
      })
    );

    if (requireSyncing) {
      Meteor.callAsync(
        'saveSkillTreeProgress',
        'dummySkillTreeID',
        updatedNodes,
        skilltree.skillEdges,
        updatedTotalXp
      );

      setSkilltree({
        ...skilltree,
        skillNodes: updatedNodes,
        totalXp: updatedTotalXp
      });
    }
  };

  //Check if user has a saved progress
  useEffect(() => {
    Meteor.call('getSkillTreeProgress', id, (err, res) => {
      if (res) {
        console.log('Progress found - subscribed');
        console.log(res);
        setSkilltree(res);
      } else {
        console.log('No progress found - not subscribed');
        setSkilltree(fallbackSkillTree);
      }
    });
    syncNodeUpvotes();
  }, [id, fallbackSkillTree]);

  if (!skilltree) {
    return <div>Loading...</div>;
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
