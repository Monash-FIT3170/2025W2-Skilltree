import React from 'react';
import { useParams } from 'react-router-dom';

export const ProfileOverview = () => {
  const { profileUsername } = useParams(); // Get profileUsername
  // TODO: fetch other data here using profileUsername as query

  return (
    <>
      {/* Profile's user overview goes here (reuse skilltree/forest list components etc) */}
    </>
  );
};
