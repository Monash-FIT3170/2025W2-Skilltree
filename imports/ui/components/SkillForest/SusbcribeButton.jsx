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
    if (!userId || !skillTreeIds || skillTreeIds.length === 0) {
      setIsSubscribed(false);
      return;
    }

    if (skillTrees.length !== skillTreeIds.length) {
      setIsSubscribed(false);
      return;
    }

    // Count how many trees user is subscribed to
    const subscribedCount = skillTrees.reduce((acc, tree) => {
      return (
        acc +
        (Array.isArray(tree.subscribers) && tree.subscribers.includes(userId)
          ? 1
          : 0)
      );
    }, 0);

    // User is fully subscribed if subscribed to ALL trees
    setIsSubscribed(subscribedCount === skillTreeIds.length);
  }, [skillTrees, userId, skillTreeIds]);

  // Subscribe and unsubscribe user to skill forest
  const handleSubscription = async e => {
    e.preventDefault();

    if (!userId) {
      console.log('User must be logged in to subscribe/unsubscribe');
      return;
    }

    try {
      if (isSubscribed) {
        await Meteor.callAsync('unsubscribeFromSkillForest', skillForestId);
      } else {
        await Meteor.callAsync('subscribeToSkillForest', skillForestId);
      }
    } catch (error) {
      console.error('Error with subscription:', error);
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
      onClick={handleSubscription}
      className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
        isSubscribed
          ? 'bg-red-400 text-white hover:bg-red-500'
          : 'bg-[#328E6E] text-white hover:bg-[#2a7a5e]'
      }`}
    >
      {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
    </button>
  );
};
