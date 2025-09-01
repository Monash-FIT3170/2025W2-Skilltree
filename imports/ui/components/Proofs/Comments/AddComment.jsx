//TODO (not possible at the moment, as no proof or user context is available)
// have method to get the current user
// have method to get current proof id

import { Meteor } from 'meteor/meteor';
import React, { useEffect, useState } from 'react';

export const AddComment = ({ userId, username, proofid, skillTreeId }) => {
  // TODO refactor this? copied from SubscribeButton
  const [isLoading, setIsLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const loadingCheck = async () => {
      console.log(
        `checking subscription for user ${userId} in skill tree ${skillTreeId}`
      );
      const subscriptionStatus = await checkSubscription(skillTreeId)(userId);
      setIsSubscribed(subscriptionStatus);
    };
    loadingCheck();
    setIsLoading(false);
  }, []);

  // check if user is subscribed
  const checkSubscription = skillTreeId => async userId => {
    // find user in skilltree
    try {
      const user = await Meteor.callAsync(
        'skilltrees.findUser',
        skillTreeId,
        userId
      );
      return !!user;
    } catch (error) {
      console.log('Error finding user');
      console.log(error);
    }
  };

  const [comment, setComment] = React.useState('');

  const handleAddComment = async e => {
    e.preventDefault(); // prevent reloading the page
    if (comment.trim()) {
      // Placeholder for addComment method
      const commentToInsert = {
        username: username,
        comment: comment.trim(),
        proofId: proofid,
        createdAt: new Date()
      };
      try {
        await Meteor.callAsync('addComment', commentToInsert);
        setComment(''); // Clear input on success
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };

  return (
    <form onSubmit={handleAddComment} className="px-4 py-3">
      <input
        disabled={isLoading || !isSubscribed}
        type="text"
        placeholder={
          isLoading
            ? 'Loading...'
            : !isSubscribed
              ? 'Please subscribe to add comments.'
              : 'Add a comment...'
        }
        value={comment}
        onChange={e => setComment(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button type="submit" style={{ display: 'none' }}>
        Submit
      </button>
    </form>
  );
};
