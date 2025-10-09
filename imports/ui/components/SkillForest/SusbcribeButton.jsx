import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useFind } from 'meteor/react-meteor-data/suspense';
import { useSubscribe } from 'meteor/react-meteor-data/suspense';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';

export const SkillForestSubscribeButton = ({ skillForestId, skillTreeIds }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const userId = Meteor.userId();

  useSubscribe('skilltrees');

  // Get skill trees to check subscribers array
  const skillTrees = useFind(
    SkillTreeCollection,
    [{ _id: { $in: skillTreeIds || [] } }],
    [skillTreeIds]
  );

  useEffect(() => {
    // User is considered subscribed if they're in any skill tree's subscribers
    const hasSubscriptions = skillTrees.some(
      skillTree =>
        skillTree.subscribers && skillTree.subscribers.includes(userId)
    );
    setIsSubscribed(hasSubscriptions);
  }, [skillTrees, userId]);

  // Subscribe user to skill forest
  const subscribeToSkillForest = async e => {
    e.preventDefault();

    if (!userId) {
      console.log('User must be logged in to subscribe');
      return;
    }

    try {
      const result = await Meteor.callAsync(
        'subscribeToSkillForest',
        skillForestId
      );
      console.log(result.message);
    } catch (error) {
      console.error('Error subscribing to skill forest:', error);
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
    <button
      onClick={subscribeToSkillForest}
      disabled={isSubscribed}
      className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
        isSubscribed
          ? 'bg-gray-400 text-white cursor-not-allowed'
          : 'bg-[#328E6E] text-white hover:bg-[#2a7a5e]'
      }`}
    >
      {isSubscribed ? 'Subscribed to Forest' : 'Subscribe to Forest'}
    </button>
  );
};
