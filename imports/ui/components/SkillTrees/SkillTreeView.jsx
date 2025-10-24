import { ReactFlowProvider } from '@xyflow/react';
import { useSubscribe, useFind } from 'meteor/react-meteor-data';
import React, { useEffect, useState } from 'react';
import { SkillTreeEdit } from './SkillTree';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';
import { SubscriptionsCollection } from '/imports/api/collections/Subscriptions';
import { Meteor } from 'meteor/meteor';
import { ToastContainer, toast, Flip } from 'react-toastify';

export const SkillTreeView = ({ id, onBack, isAdmin }) => {
  // 1. Subscribe to the necessary data publications
  const isSkillTreesLoading = useSubscribe('skilltrees');
  const isSubscriptionsLoading = useSubscribe('subscriptions');
  const [adminStatus, setAdminStatus] = useState(isAdmin || false);

  const userId = Meteor.userId();

  // 2. Correctly call useFind. It needs a function that calls Collection.find()
  //    This returns an array of documents, so we take the first one [0].
  const baseSkillTree = useFind(
    () => SkillTreeCollection.find({ _id: id }),
    [id]
  )[0];
  const userSubscription = useFind(
    () => SubscriptionsCollection.find({ userId, skilltreeId: id }),
    [userId, id]
  )[0];

  const [skillTree, setSkillTree] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 3. Determine which data to display (user's progress or the base tree)
  useEffect(() => {
    // Wait until subscriptions are ready
    if (!isSkillTreesLoading() && !isSubscriptionsLoading()) {
      if (userSubscription) {
        // If the user is subscribed, use their subscription data (which includes progress)
        setSkillTree(userSubscription);
        console.log('found subscription');
        console.log(userSubscription);
        if (typeof isAdmin === 'boolean') {
          setAdminStatus(isAdmin);
        } else {
          setAdminStatus(userSubscription.roles.includes('admin'));
        }
      } else {
        // Otherwise, fall back to the generic skill tree data
        setSkillTree(baseSkillTree);
        setAdminStatus(isAdmin);
      }
    }
  }, [
    isSkillTreesLoading,
    isSubscriptionsLoading,
    baseSkillTree,
    userSubscription
  ]);

  // 4. Re-integrate your upvote syncing logic
  useEffect(() => {
    const syncNodeUpvotes = async () => {
      // We only need to sync if the user is subscribed and has progress to update
      if (!skillTree || !userSubscription) {
        setIsLoading(false); // Stop loading if there's nothing to sync
        return;
      }

      let updatedNodes = [...skillTree.skillNodes];
      let updatedTotalXp = skillTree.totalXp || 0;
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
                  currentNetUpvotes: netUpvotes
                };
                if (netUpvotes >= node.data.netUpvotesRequired) {
                  updatedNodeData.verified = true;
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
          skillTree.skillEdges,
          updatedTotalXp
        );
        setSkillTree(prev => ({
          ...prev,
          skillNodes: updatedNodes,
          totalXp: updatedTotalXp
        }));
      }
      setIsLoading(false); // End loading after sync is complete
    };

    if (skillTree) {
      syncNodeUpvotes();
    } else if (!isSkillTreesLoading() && !isSubscriptionsLoading()) {
      // If there's no data at all and we're done loading, stop the loading spinner
      setIsLoading(false);
    }
  }, [skillTree]); // This effect runs when the skilltree data is first loaded

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!skillTree) {
    return <div>Skill Tree not found.</div>;
  }

  const updateNodesAndEdges = ({ nodes, edges }) => {
    console.log(
      'updateNodesAndEdges called with nodes:',
      nodes,
      'and edges:',
      edges
    );
    const updatedSkillTree = {
      ...skillTree,
      skillNodes: nodes,
      skillEdges: edges
    };
    setSkillTree(updatedSkillTree);

    console.log('skillTreeBeforeInsert', updatedSkillTree);
    handleSaveSkillTree(updatedSkillTree);
  };

  const handleSaveSkillTree = async skilltreeToSave => {
    try {
      const updateData = { ...skilltreeToSave };
      console.log('Updating existing tree with data:', updateData);

      await Meteor.callAsync('skilltrees.update', id, updateData);

      // Update local state
      setSkillTree(prev => ({
        ...prev,
        ...updateData,
        updatedAt: new Date()
      }));
      // await Meteor.callAsync('updateCreatedCommunities', skillTreeId);
      // await Meteor.callAsync('updateSubscribedCommunities', skillTreeId);
      await Meteor.callAsync(
        'saveSubscription',
        id,
        skilltreeToSave.skillNodes,
        skilltreeToSave.skillEdges
      );
      console.log('SkillTree updated successfully');
      toast.success('SkillTree updated!');
    } catch (error) {
      console.error('Error saving skill tree:', error);
      toast.error('Error saving SkillTree!');
    }
  };

  return (
    <ReactFlowProvider>
      <>{console.log(`adminStatus: ${adminStatus}`)}</>
      <SkillTreeEdit
        id={id}
        isAdmin={adminStatus}
        onSave={adminStatus ? updateNodesAndEdges : undefined}
        savedNodes={skillTree.skillNodes}
        savedEdges={skillTree.skillEdges}
        onBack={onBack}
      />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Flip}
      />
    </ReactFlowProvider>
  );
};
