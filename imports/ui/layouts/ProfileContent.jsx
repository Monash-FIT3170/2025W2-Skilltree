import React from 'react';
import { Outlet, useParams } from 'react-router-dom';

export const ProfileContent = () => {
  const { profileUsername } = useParams(); // Get profileUsername from URL
  // TODO: fetch FollowersCollection via useFind using profileUsername as query
  const followersIds = []; // Result of fetch
  const followingIds = []; // Result of fetch

 return (
  <>
    <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
      {profileUsername}
    </h2>
    {/* Profile content goes here, profile details, header etc */}
    <Outlet context={{ followingIds, followersIds }} />
  </>
);
};
