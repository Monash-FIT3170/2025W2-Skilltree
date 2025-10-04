import React from 'react';
import { Outlet } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { AuthContext } from '/imports/utils/contexts/AuthContext';
import { useFind } from 'meteor/react-meteor-data/suspense';
import { use } from 'chai';
import { Avatar} from 'flowbite-react';
import { useSubscribe } from 'meteor/react-meteor-data/suspense';
import { Meteor } from 'meteor/meteor';
import { User } from '/imports/utils/User';
import { FollowersCollection } from '/imports/api/collections/Followers';


export const Profile = () => {

  const { profileUsername } = useParams();            // from URL
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

    // follower logic
    useSubscribe('followers');

    console.log("collection is:", FollowersCollection);

    const followers = useFind(() => {
      if (!finalUserId) return [];
      return FollowersCollection.find({ followedUserId: finalUserId });
    }, [finalUserId]);

    // const following = useFind(() => {
    //   if (!finalUserId) return [];
    //   return FollowersCollection.find({ followerUserId: finalUserId });
    // }, [finalUserId]);

    // // Get counts
    // const followerCount = followers.length;
    // const followingCount = following.length;

  
  
  return (
    <>
      {/* Profile Page*/}
      {/* TODO: Anything consistent among all profiles goes here */}
      {/* <div className="max-w-3xl mx-auto px-4"> */}




      <div className="bg-green-400 p-8 lg mb-4 flex justify-start" >
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
        <p className="text-2xl font-bold text-white pl-5">{finalUserId}</p>

        {/* <p className="text-white pl-5">Followers: {followerCount} | Following: {followingCount}</p> */}
        </div>

        {/* later you’ll plug in followers/following/overview here */}

      {/* </div> */}
      <Outlet /> {/* switches ProfileContent by /profile/:profileUsername/ */}
    </>
  );
};
