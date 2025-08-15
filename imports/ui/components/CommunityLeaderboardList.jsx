import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';

import { Avatar, List, ListItem, Badge } from "flowbite-react";

import { useSubscribeSuspense } from 'meteor/communitypackages:react-router-ssr';
import { useFind } from 'meteor/react-meteor-data/suspense';

import { SkillTreeCollection } from '/imports/api/collections/SkillTree';

export const CommunityLeaderboardList = ({skillTreeId}) => {
  useSubscribeSuspense('skilltrees');
  const targetSkillTree = useFind(SkillTreeCollection,
    [
      { _id: { 
        $eq: skillTreeId 
      }},
      {fields: {
        subscribers: 1,
        title: 1
      }}
    ],
    [skillTreeId]
  )[0];

  console.log(targetSkillTree)

  useSubscribeSuspense('usernames',targetSkillTree?.subscribers ?? []);
  const users = useFind(
    Meteor.users,
    [
      { _id: { $in: targetSkillTree?.subscribers ?? [] } },
      { fields: { username: 1 } }
    ],
    [targetSkillTree?.subscribers]
  );

    return (
        <List unstyled className='divide-y divide-gray-200' >
            {users.map((user, index) => {
                return <ListItem key={user._id} className='pb-3'>
                  <div className='flex items-center space-x-4'>
                    <Badge color='green' size='sm' className='rounded-half'>{String(index+1)}</Badge>
                    <div>{String(user.username)}</div>
                  </div>
                </ListItem>
            })}
        </List>
    )

}