import React from 'react';
import { Meteor } from 'meteor/meteor';

import { List, ListItem, Badge } from 'flowbite-react';

import { useSubscribeSuspense } from 'meteor/communitypackages:react-router-ssr';
import { useFind } from 'meteor/react-meteor-data/suspense';

import { SkillTreeCollection } from '/imports/api/collections/SkillTree';

/**
 * CommunityLeaderboardList.jsx
 *
 * Renders a list component that displays users in a SkillTree
 *
 * @component
 * @example
 * // Example usage
 * <CommunityLeaderboardList skillTreeId = {id}></CommunityLeaderboardList>
 *
 * @param {skillTreeId} _id of SkillTree to exctract users from
 * @param {filter} filter field from user.profile to sort by (String)
 *
 * @returns List of users inside skilltree
 */
export const CommunityLeaderboardList = ({ skillTreeId, filter }) => {
  // useFind to query user data
  useSubscribeSuspense('skilltrees');
  const targetSkillTree = useFind(
    SkillTreeCollection,
    [
      {
        _id: {
          $eq: skillTreeId
        }
      },
      {
        fields: {
          subscribers: 1,
          title: 1
        }
      }
    ],
    [skillTreeId]
  )[0];

  useSubscribeSuspense('usernames', targetSkillTree?.subscribers ?? []);
  const users = useFind(
    Meteor.users,
    [
      { _id: { $in: targetSkillTree?.subscribers ?? [] } },
      {
        fields: { username: 1, [`profile.${filter}`]: 1 },
        sort: { [`profile.${filter}`]: -1 }
      }
    ],
    [targetSkillTree?.subscribers]
  );

  return (
    <List unstyled className="divide-y divide-gray-200">
      {users.map((user, index) => {
        return (
          <ListItem
            key={user._id}
            className="pb-3"
            onClick={() => console.log(user)}
          >
            <div className="flex items-center space-x-4">
              <Badge
                color="green"
                size="sm"
                className="rounded-full p-1.5 w-[4ch] tabular-nums items-center justify-center inline-flex"
              >
                {String(index + 1)}
              </Badge>
              <span>{`${user.username}`}</span>
              <span>{`${user.profile ? user.profile[filter] : -1}`}</span>
            </div>
          </ListItem>
        );
      })}
    </List>
  );
};
