import React from 'react';
import { Outlet, useParams } from 'react-router-dom';

export const ProfileContent = () => {
  const { profileUsername } = useParams(); // Get profileUsername from URL
  // TODO: fetch FollowersCollection via useFind using profileUsername as query
  const followersIds = []; // Result of fetch
  const followingIds = []; // Result of fetch

  return (
    <>
      {/* Profile content goes here, profile details, header etc */}
      {/* switches overview/following/followers by url, pass IDs */}
      <Outlet context={{ followingIds, followersIds }} />;
    </>
  );
};
