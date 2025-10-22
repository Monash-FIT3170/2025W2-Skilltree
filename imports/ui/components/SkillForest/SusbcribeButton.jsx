import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useFind } from 'meteor/react-meteor-data/suspense';
import { useSubscribe } from 'meteor/react-meteor-data/suspense';
import { SkillForestCollection } from '/imports/api/collections/SkillForest';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';
import { UnsubscribeTreesPopup } from './UnsubscribeTreesPopup';

export const SkillForestSubscribeButton = ({ skillForestId }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showUnsubscribePopup, setShowUnsubscribePopup] = useState(false);
  const [selectedTreeIds, setSelectedTreeIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const userId = Meteor.userId();

  useSubscribe('skilltrees');
  useSubscribe('skillForests');

  // Get skillforests to check subscribers array
  const skillForest = useFind(
    SkillForestCollection,
    [{ _id: { $eq: skillForestId } }],
    [skillForestId]
  )[0];

  const allSkillTrees = useFind(
    SkillTreeCollection,
    [{ _id: { $in: skillForest?.skilltreeIds || [] } }],
    [skillForest?.skilltreeIds]
  );

  const subscribedTreeIds = allSkillTrees
    .filter(tree => tree.subscribers && tree.subscribers.includes(userId))
    .map(tree => tree._id);

  useEffect(() => {
    if (!userId || !skillForest) {
      setIsSubscribed(false);
      return;
    }

    const isSubscribedToForest =
      skillForest.subscribers && skillForest.subscribers.includes(userId);

    setIsSubscribed(isSubscribedToForest);
  }, [skillForest, userId]);

  const handleSelectAll = () => {
    if (!selectAll) {
      setSelectedTreeIds(subscribedTreeIds);
    } else {
      setSelectedTreeIds([]);
    }
    setSelectAll(!selectAll);
  };

  const handleTreeToggle = treeId => {
    if (selectedTreeIds.includes(treeId)) {
      setSelectedTreeIds(selectedTreeIds.filter(id => id !== treeId));
      setSelectAll(false);
    } else {
      const newSelected = [...selectedTreeIds, treeId];
      setSelectedTreeIds(newSelected);
      if (newSelected.length === subscribedTreeIds.length) {
        setSelectAll(true);
      }
    }
  };

  // Subscribe and unsubscribe user to skill forest
  const handleSubscription = async e => {
    e.preventDefault();

    if (!userId) {
      return;
    }

    try {
      if (isSubscribed) {
        setShowUnsubscribePopup(true);
        setSelectedTreeIds([]);
        setSelectAll(false);
      } else {
        await Meteor.callAsync('subscribeToSkillForest', skillForestId);
      }
    } catch (error) {
      console.error('Error with subscription:', error);
    }
  };

  const handleUnsubscribeConfirm = async () => {

    try {
      await Meteor.callAsync(
        'unsubscribeFromSkillForest',
        skillForestId,
        selectedTreeIds
      );
      setShowUnsubscribePopup(false);
      setSelectedTreeIds([]);
      setSelectAll(false);
    } catch (error) {
      console.error('Error unsubscribing:', error);
    }
  };

  if (!userId) {
    return (
      <div className="px-3 py-2 bg-gray-300 text-gray-500 rounded cursor-not-allowed">
        Sign in to Subscribe
      </div>
    );
  }

  return (
    <>
      <button
        onClick={handleSubscription}
        className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
          isSubscribed
            ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-[#328E6E] text-white hover:bg-[#2a7a5e]'
        }`}
      >
        {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
      </button>
      {showUnsubscribePopup && (
        <UnsubscribeTreesPopup
          skillForestTitle={skillForest?.title}
          subscribedTreeIds={subscribedTreeIds}
          selectedTreeIds={selectedTreeIds}
          selectAll={selectAll}
          onSelectAll={handleSelectAll}
          onTreeToggle={handleTreeToggle}
          onConfirm={handleUnsubscribeConfirm}
          onClose={() => setShowUnsubscribePopup(false)}
        />
      )}
    </>
  );
};
