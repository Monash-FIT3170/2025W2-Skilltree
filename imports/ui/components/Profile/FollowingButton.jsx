import React, { useState, useEffect } from 'react';
import { FollowersCollection } from '/imports/api/collections/Followers';
import { useSubscribe, useFind } from 'meteor/react-meteor-data/suspense';
import { Meteor } from 'meteor/meteor';

const FollowingButton = ({ userId, toFollowId }) => {
  // set initial states
  // const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Subscribe to followers data
  useSubscribe('followers');

  // Check if current user is following the target user
  const followerRecord = useFind(FollowersCollection, [
    { followerUserId: userId, followingUserId: toFollowId },
    {
      fields: {
        _id: 1,
        followerUserId: 1,
        followingUserId: 1
      }
    }
  ])[0];


  const isFollowing = followerRecord ? true : false;

  console.log('Follower record:', followerRecord);
  console.log('Follower record:', followerRecord);

  const handleFollowToggle = async () => {
    setIsLoading(true);

    try {
      if (isFollowing) {
        // Unfollow logic - use removeFollower method
        await Meteor.callAsync('removeFollower', {
          followerUserId: userId,
          followingUserId: toFollowId
        });
      } else {
        // Follow logic - use insertFollower method
        await Meteor.callAsync('insertFollower', {
          followerUserId: userId,
          followingUserId: toFollowId
        });
      }
    } catch (error) {
      console.error('Error toggling follow status:', error);
      console.error('Error details:', error.reason, error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleFollowToggle}
      disabled={isLoading}
      className={`
            px-4 py-1.5 
            text-sm font-semibold 
            rounded-md 
            transition-all duration-300 
            min-w-[100px]
            ${
              isFollowing
                ? 'bg-green-800 text-white border-2 border-green-800 hover:bg-green-900 hover:border-green-900 '
                : 'bg-gray-400 text-white border-2 border-gray-400 hover:bg-gray-600 hover:border-gray-600'
            }
            ${
              isLoading
                ? 'opacity-60 cursor-not-allowed'
                : 'hover:shadow-md cursor-pointer'
            }
        `}
    >
      {isLoading ? 'Loading...' : isFollowing ? 'Following' : 'Follow'}
    </button>
  );
};

export default FollowingButton;
