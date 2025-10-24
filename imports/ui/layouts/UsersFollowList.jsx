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
  // Check if props are omitted ('' as default val), then use passed context values if so.
  const finalFollowingIds =
    followingIds === '' ? useOutletContext()?.followingIds || [] : followingIds;
  const finalFollowersIds =
    followersIds === '' ? useOutletContext()?.followersIds || [] : followersIds;

  // The userIds list to use based on given 'type' prop value.
  const userIds = type == 'following' ? finalFollowingIds : finalFollowersIds;

  return (
    <>
      {/* List structure UI goes here (table/container? etc) */}
      {/* TODO: Map userIds (userId -> <UserCard ids={userIds}>, (row?) etc */}
    </>
  );
};
