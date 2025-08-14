import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';

import { Avatar, List, ListItem, Badge } from "flowbite-react";

import { useSubscribeSuspense } from 'meteor/communitypackages:react-router-ssr';
import { useFind } from 'meteor/react-meteor-data/suspense';

import { SkillTreeCollection } from '/imports/api/collections/SkillTree';

export const CommunityLeaderboardList = ({skillTreeId}) => {
    // Code to extract skilltree from database using id
    useSubscribeSuspense('skilltrees', skillTreeId);
    const skillTrees = useFind(SkillTreeCollection, [
        { _id: { $eq: skillTreeId } }
    ]);
    const targetSkillTree = skillTrees[0];

  const [usernameList, setUsernameList] = useState([]);

  // Load data before page renders
  useEffect(() => {
    const processUserIdList = async userIdList => {
      console.log(userIdList);
      console.log(userIdList.length);
      const usernameList = [];
      for (var i = 0; i < userIdList.length; i++) {
        const username = await getUserName(userIdList[i]);
        usernameList.push(username);
      }
      setUsernameList(usernameList);
    };

    processUserIdList(targetSkillTree.subscribers);
  }, [targetSkillTree]);

  // Get username from user id
    const getUserName = async userId => {
        const user = await Meteor.callAsync('getUsers', userId);

        console.log(user);

        // solely for filtering dummy data
        if (!user) {
        return userId;
        }

        return user.username;
    };

    return (
        <List unstyled className='divide-y divide-gray-200' >
            {usernameList.map((username,index) => {
                return <ListItem key={username} className='pb-3'>
                  <div className='flex items-center space-x-4'>
                    <Badge color='green' size='sm' className='rounded-half'>{String(index+1)}</Badge>
                    <div>{String(username)}</div>
                  </div>
                </ListItem>
            })}
        </List>
    )

}