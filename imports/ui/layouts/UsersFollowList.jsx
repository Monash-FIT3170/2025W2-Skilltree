/*
UsersFollowList is a layout container for both the followers and following list

We include the list of user o row/card components here

*/

import { useOutletContext } from 'react-router-dom';

export const UsersFollowList = ({
  type,
  followingIds = '',
  followersIds = ''
}) => {
  const outletContext = useOutletContext();
  const contextFollowingIds = outletContext?.followingIds || [];
  const contextFollowersIds = outletContext?.followersIds || [];

  //If the props are provided (like used outside of the outlet as a reusable component), otherwise use context
  const finalFollowingIds =
    followingIds !== '' ? followingIds : contextFollowingIds;
  const finalFollowersIds =
    followersIds !== '' ? followersIds : contextFollowersIds;

  return <div></div>;
};
