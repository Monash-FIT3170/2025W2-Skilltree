import React from 'react';
import { useOutletContext } from 'react-router-dom';

export const ProfileOverview = () => {
  //Use the passed parameters in outlet context
  const { targetUserId, followingIds, followersIds } = useOutletContext();

  return <div></div>;
};
