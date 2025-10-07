import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from '/imports/utils/contexts/AuthContext';

export const ProfileContent = () => {
  const { profileUsername } = useParams(); // Get profileUsername from URL
  const { profileUserId } = useParams();            // from URL
  const { userId: loggedInUserId } = useContext(AuthContext); // from auth
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
  // TODO: fetch FollowersCollection via useFind using profileUsername as query
  const followersIds = []; // Result of fetch
  const followingIds = []; // Result of fetch

 return (
  <>
   
    {/* Profile content goes here, profile details, header etc */}
    <Outlet context={{ followingIds, followersIds }} />
  </>
);
};
