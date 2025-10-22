import React from 'react';
import { Outlet } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '/imports/utils/contexts/AuthContext';
import { useFind } from 'meteor/react-meteor-data/suspense';
import { use } from 'chai';
import { Avatar } from 'flowbite-react';
import { useSubscribe } from 'meteor/react-meteor-data/suspense';
import { Meteor } from 'meteor/meteor';
import { User } from '/imports/utils/User';
import { FollowersCollection } from '/imports/api/collections/Followers';
import FollowingButton from '../components/Profile/FollowingButton';
import { ProfileContent } from '../components/Profile/ProfileContent';

export const Profile = () => {
  const { profileUsername } = useParams(); // from URL
  const loggedInUserId = useContext(AuthContext); // from auth

  // Subscribe to users data
  useSubscribe('users');

  const loggedInUser = User(['username']);
  const loggedInUsername = loggedInUser?.username;

  const [finalUserId, setFinalUserId] = useState(null);

  const profileUser = User(['username', 'profile.avatarUrl'], finalUserId); // Gets a specific user's data

  // If it's blank → fallback to logged in user
  // If it's a username → look up the real ID
  useEffect(() => {
    if (!profileUsername) {
      // /profile/ → show logged-in user profile
      setFinalUserId(loggedInUsername);
    } else {
      // /profile/12345 → assume already a valid ID
      setFinalUserId(profileUsername);
    }
  }, [profileUsername, loggedInUsername]);

  const profileUserInfo = useFind(Meteor.users, [
    { username: finalUserId },
    {
      fields: {
        _id: 1,
        username: 1,
        emails: 1
      }
    }
  ])[0];

  // profile user ID (in database)
  const profileUserId = profileUserInfo?._id;

  // follower logic
  useSubscribe('followers');

  // Get all followers (people following this user)
  const followers = useFind(FollowersCollection, [
    { followingUserId: { $eq: profileUserId } },
    {
      fields: {
        _id: 1,
        followerUserId: 1,
        followingUserId: 1,
        createdAt: 1
      }
    }
  ]);

  // Get all following (people this user follows)
  const following = useFind(FollowersCollection, [
    { followerUserId: { $eq: profileUserId } },
    {
      fields: {
        _id: 1,
        followerUserId: 1,
        followingUserId: 1,
        createdAt: 1
      }
    }
  ]);

  const followerCount = followers.length;
  const followingCount = following.length;

  return (
    <>
      {/* Profile Page*/}
      <div className="bg-green-400 p-8 lg mb-4 flex justify-start">
        <Avatar
          alt="User Profile Picture"
          size="lg"
          icon={
            <svg>
              <path d="M10 10a4 4 0 100-8 4 4 0 000 8zM2 16a6 6 0 1112 0H2z" />
            </svg>
          }
          rounded
        />
        <div className="pl-5 flex-grow">
          <div className="flex items-center gap-3">
            <p className="text-2xl font-bold text-white">{finalUserId}</p>
            {loggedInUserId && loggedInUserId !== profileUserId && (
              <FollowingButton
                userId={loggedInUserId}
                toFollowId={profileUserId}
              />
            )}
          </div>
          <p className="text-white mt-2">
            Followers: <strong>{followerCount}</strong>{' '}
            <span className="ml-4"> </span>Following:{' '}
            <strong>{followingCount}</strong>
          </p>
        </div>
      </div>
      <div>
        <ProfileContent />
      </div>
      {/* later you’ll plug in followers/following/overview here */}
      {/* </div> */}
      <Outlet /> {/* switches ProfileContent by /profile/:profileUsername/ */}
    </>
  );
};
