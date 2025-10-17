import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useFind } from 'meteor/react-meteor-data/suspense';
import { useSubscribe } from 'meteor/react-meteor-data/suspense';
import { SkillForestCollection } from '/imports/api/collections/SkillForest';

export const SkillForestSubscribeButton = ({ skillForestId }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const userId = Meteor.userId();

  useSubscribe('skilltrees');
  useSubscribe('skillForests');

  // Get skillforests to check subscribers array
  const skillForest = useFind(
    SkillForestCollection,
    [{ _id: { $eq: skillForestId } }],
    [skillForestId]
  )[0];

  useEffect(() => {
    if (!userId || !skillForest) {
      setIsSubscribed(false);
      return;
    }

    // Owner can't subscribe to own forest
    if (skillForest.owner === userId) {
      setIsSubscribed(true);
      return;
    }

    const isSubscribedToForest =
      skillForest.subscribers && skillForest.subscribers.includes(userId);

    setIsSubscribed(isSubscribedToForest);
  }, [skillForest, userId]);

  // Subscribe and unsubscribe user to skill forest
  const handleSubscription = async e => {
    e.preventDefault();

    if (!userId) {
      return;
    }
    if (skillForest?.owner === userId) {
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

  const isOwner = skillForest?.owner === userId;

  return (
    <button
      onClick={handleSubscription}
      disabled={isOwner}
      className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
        isOwner
          ? 'bg-gray-400 text-white cursor-not-allowed'
          : isSubscribed
            ? 'bg-red-400 text-white hover:bg-red-500'
            : 'bg-[#328E6E] text-white hover:bg-[#2a7a5e]'
      }`}
    >
      {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
    </button>
  );
};
