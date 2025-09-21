import React from 'react';
import { Outlet } from 'react-router-dom';

export const ProfileContent = () => {
  const followersIds = [];
  const followingIds = [];
  const targetUserId = '';
  return (
    <div>
      <Outlet context={{ followingIds, followersIds, targetUserId }} />
    </div>
  );
};
