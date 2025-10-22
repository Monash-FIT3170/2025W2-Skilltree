import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useFind } from 'meteor/react-meteor-data/suspense';
import { useSubscribe } from 'meteor/react-meteor-data/suspense';
import { SkillForestCollection } from '/imports/api/collections/SkillForest';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';
import { UnsubscribeTreesSelection } from './UnsubscribeTreesSelection';

export const SkillForestSubscribeButton = ({ skillForestId }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showUnsubscribeOptions, setShowUnsubscribeOptions] = useState(false);
  const [selectedSkillTrees, setSelectedSkillTrees] = useState([]);
  const [unsubscribeAll, setUnsubscribeAll] = useState(false);
  const userId = Meteor.userId();

  useSubscribe('skilltrees');
  useSubscribe('skillForests');

  // Get skillforests to check subscribers array
  const skillForest = useFind(
    SkillForestCollection,
    [{ _id: { $eq: skillForestId } }],
    [skillForestId]
  )[0];

  // Get skilltrees for unsubscribe options
  const skillTrees = useFind(SkillTreeCollection, [
    { _id: { $in: skillForest?.skilltreeIds || [] } },
    {
      fields: {
        _id: 1,
        title: 1
      }
    }
  ]);

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

  // handle both subscribe/unsubscribe actions
  const handleSubscribeAction = async e => {
    e.preventDefault();

    if (!userId) {
      return;
    }
    if (skillForest?.owner === userId) {
      return;
    }

    if (isSubscribed) {
      setShowUnsubscribeOptions(true);
    } else {
      try {
        await Meteor.callAsync('subscribeToSkillForest', skillForestId);
      } catch (error) {
        console.error('Error with subscription:', error);
      }
    }
  };

  const handleUnsubscribe = async () => {
    try {
      await Meteor.callAsync(
        'unsubscribeFromSkillForest',
        skillForestId,
        selectedSkillTrees
      );
      setShowUnsubscribeOptions(false);
      setSelectedSkillTrees([]);
      setUnsubscribeAll(false);
      setIsSubscribed(false);
    } catch (error) {
      console.error('Error unsubscribing:', error);
    }
  };

  const handleSkillTreeCheck = skillTreeId => {
    setSelectedSkillTrees(prev => {
      const next = prev.includes(skillTreeId)
        ? prev.filter(id => id !== skillTreeId)
        : [...prev, skillTreeId];

      // If user unchecks a box also uncheck the "unsubscribe from all" checkbox
      if (next.length !== skillTrees.length) {
        setUnsubscribeAll(false);
      }

      return next;
    });
  };

  const handleUnsubscribeAll = checked => {
    setUnsubscribeAll(checked);
    setSelectedSkillTrees(checked ? skillTrees.map(st => st._id) : []);
  };

  const handleCancel = () => {
    setShowUnsubscribeOptions(false);
    setSelectedSkillTrees([]);
    setUnsubscribeAll(false);
  };

  // If user checks all boxes, set unsubscribeAll to true
  useEffect(() => {
    if (skillTrees && selectedSkillTrees.length === skillTrees.length) {
      setUnsubscribeAll(true);
    }
  }, [selectedSkillTrees, skillTrees]);

  if (!userId) {
    return (
      <div className="px-3 py-2 bg-gray-300 text-gray-500 rounded cursor-not-allowed">
        Sign in to Subscribe
      </div>
    );
  }

  const isOwner = skillForest?.owner === userId;

  return (
    <div className="relative">
      <button
        onClick={handleSubscribeAction}
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

      {showUnsubscribeOptions && (
        <UnsubscribeTreesSelection
          skillTrees={skillTrees}
          selectedSkillTrees={selectedSkillTrees}
          unsubscribeAll={unsubscribeAll}
          onSkillTreeCheck={handleSkillTreeCheck}
          onUnsubscribeAll={handleUnsubscribeAll}
          onConfirm={handleUnsubscribe}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};
