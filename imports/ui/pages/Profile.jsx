import React from 'react';
import { Outlet } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { AuthContext } from '/imports/utils/contexts/AuthContext';
import { useFind } from 'meteor/react-meteor-data/suspense';
import { use } from 'chai';

export const Profile = () => {

  const { profileUserId } = useParams();            // from URL
  const { userId: loggedInUserId } = useContext(AuthContext).userId; // from auth
  const [finalUserId, setFinalUserId] = useState(null);
  
    // If it's blank → fallback to logged in user
    // If it's a username → look up the real ID
  useEffect(() => {
      if (!profileUserId) {
        // /profile/ → show logged-in user profile
        setFinalUserId(loggedInUserId);
      } else {
        // /profile/12345 → assume already a valid ID
        setFinalUserId(profileUserId);
      }
    }, [profileUserId, loggedInUserId]);
  
    // if (!finalUserId) return <div>Loading profile…</div>;
  
  
  return (
    <>
      {/* Profile Page*/}
      {/* TODO: Anything consistent among all profiles goes here */}
      <div>
        <h1>Profile Page</h1>
        <p>Showing profile for user ID: {profileUserId}</p>
        <p>Logged in as user ID: {loggedInUserId}</p>
        {/* later you’ll plug in followers/following/overview here */}
      </div>
      <Outlet /> {/* switches ProfileContent by /profile/:profileUsername/ */}
    </>
  );
};
