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


export const Profile = () => {

  const { profileUsername } = useParams();            // from URL
  const loggedInUserId = useContext(AuthContext); // from auth
  
  // Subscribe to users data
  useSubscribe('users');
  const loggedInUser = User(['username']);
  const loggedInUsername = loggedInUser?.username;
  
  // Find user by _id - handle null case properly
  // const users = useFind(() => {
  //   if (!loggedInUserId) return [];
  //   return Meteor.users.find({ _id: loggedInUserId });
  // }, [loggedInUserId]);
  
  // const user = users[0];
  // const loggedInUsername = user?.username;

  const [finalUserId, setFinalUserId] = useState(null);
  
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

  // const profileUser = useFind(() =>
  //   Meteor.users.find(
  //     { username: finalUserId }),
  //   [finalUserId]
  // )[0];
  
  
  return (
    <>
      {/* Profile Page*/}
      {/* TODO: Anything consistent among all profiles goes here */}
      <div>
        <h1>Profile Page</h1>
        <p>Showing profile for user ID: {finalUserId}</p>
        <p>Logged in as user ID: {finalUserId}</p>
        {/* later you’ll plug in followers/following/overview here */}
      </div>
      <Outlet /> {/* switches ProfileContent by /profile/:profileUsername/ */}
    </>
  );
};
