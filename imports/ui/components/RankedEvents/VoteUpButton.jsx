import { Meteor } from 'meteor/meteor';
import React, { useEffect, useState } from 'react';
import { User } from '/imports/utils/User';

export const VoteUpButton = ({ proof, skilltreeId }) => {
  const [isUserSubscribed, setIsUserSubscribed] = useState(false);
  const user = User(['_id']);
  const currentUserId = user?._id ?? '';

  useEffect(() => {
    if (!skilltreeId || !currentUserId) return;

    const checkStatus = async () => {
      const isSubscribed = await checkUserIsSubscribed();
      setIsUserSubscribed(isSubscribed);
    };
    checkStatus();
  }, [skilltreeId, currentUserId]);

  const checkUserIsSubscribed = async () => {
    try {
      const foundUser = await Meteor.callAsync(
        'skilltrees.findUser',
        skilltreeId,
        currentUserId
      );
      return !!foundUser;
    } catch (error) {
      console.error('Error checking subscription:', error);
      return false;
    }
  };

  /**
   * Calls the Meteor method to upvote a proof.
   * Errors are logged to console if the call fails.
   */
  const handleUpvote = proofId => {
    if (!isUserSubscribed) {
      alert('You must be subscribed to upvote proofs.');
      return;
    }
    Meteor.call('proof.upvote', proofId, error => {
      if (error) console.error('Upvote failed:', error.reason);
    });
  };


  return (
    <div className="flex gap-2">
      <button
        onClick={() => handleUpvote(proof._id)}
        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
      >
        👍 Upvote ({proof.upvotes || 0})
      </button>
    </div>
  );
};