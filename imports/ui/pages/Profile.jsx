import React from 'react';
import { Outlet } from 'react-router-dom';

export const Profile = () => {
  return (
    <>
      {/* Profile Page*/}
      {/* TODO: Anything consistent among all profiles goes here */}
      <Outlet /> {/* switches ProfileContent by /profile/:profileUsername/ */}
    </>
  );
};
