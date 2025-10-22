import React, { useState, useEffect } from 'react';
import { FollowersCollection } from '/imports/api/collections/Followers';
import { useSubscribe, useFind } from 'meteor/react-meteor-data/suspense';
import { Meteor } from 'meteor/meteor';

const FollowingButton = ({ userId, toFollowId }) => {

    // set initial states
    const [isFollowing, setIsFollowing] = useState(false);
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

    // Update isFollowing state based on the follower record
    useEffect(() => {
        setIsFollowing(!!followerRecord);
    }, [followerRecord]);

    console.log("Follower record:", followerRecord);

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
            px-6 py-2.5 
            text-sm font-semibold 
            rounded-lg 
            transition-all duration-300 
            min-w-[120px]
            ${isFollowing 
                ? 'bg-white text-gray-700 border-2 border-gray-300 hover:bg-gray-50' 
                : 'bg-blue-500 text-white border-2 border-blue-500 hover:bg-blue-600'
            }
            ${isLoading 
                ? 'opacity-60 cursor-not-allowed' 
                : 'hover:shadow-md hover:-translate-y-0.5 cursor-pointer'
            }
        `}
        >
        {isLoading ? 'Loading...' : isFollowing ? 'Following' : 'Follow' }
        
        </button>
    );
    };

export default FollowingButton;
