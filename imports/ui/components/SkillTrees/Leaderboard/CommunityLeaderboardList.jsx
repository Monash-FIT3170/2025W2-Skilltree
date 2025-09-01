import React, { useState, useEffect, useRef } from 'react';
import { Meteor } from 'meteor/meteor';

import { List, ListItem, Badge, Button } from 'flowbite-react';

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
  // current user
  const currUser = Meteor.userId()

  const userRef = useRef(null)
  const [isVisible,setIsVisible] = useState(false)
  const [isInList, setIsInList] = useState(false)

  const callbackFunction = (entries) => {
    const [ entry ] = entries
    setIsVisible(entry.isIntersecting)
    console.log(isVisible)
  }

  const options = {
    root: null,
    rootMarge: "0px",
    threshold: 0.01
  }

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

  const scrollToUser = () => {
    if (userRef.current){
      userRef.current.scrollIntoView({behavior: "smooth", block: "center"});
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options)
    
    if (userRef.current){
      setIsInList(true)
      observer.observe(userRef.current);
    }

    // cleanup function when component unmounts
    return () => {
      if (userRef.current){
        observer.unobserve(userRef.current)
      }
    }

  },[userRef, options])



  return (
    <List unstyled className="divide-y divide-gray-200 relative space-y-0">
      {users.map((user, index) => {
        if (user._id === currUser){
          return (
              <ListItem
                key={user._id}
                ref={userRef}
                className="bg-green-100 py-3"
                onClick={() => console.log(user)}
              >
                <div className="flex items-center">
                  <div class="flex w-2/20 items-center justify-center-safe">
                    <Badge
                      color="green"
                      size="sm"
                      className="rounded-full p-1.5 w-[4ch] tabular-nums items-center justify-center inline-flex hover:bg-green-100"
                      clearTheme={{hover: true}}
                    >
                      {String(index + 1)}
                    </Badge>
                  </div>
                  <div 
                    className="flex w-3/20 items-center justify-center-safe"
                  >
                    {`${user.username}`}
                  </div>
                  <div
                    className="flex w-6/20 items-center justify-center-safe"
                  >
                    {`${user.profile ? user.profile[filter] : -1}`}
                  </div>
                </div>
              </ListItem>
          )
        } else {
            return (
              <ListItem
                key={user._id}
                className="py-3"
                onClick={() => console.log(user)}
              >
                <div className="flex items-center">
                  <div class="flex w-2/20 items-center justify-center-safe">
                    <Badge
                      color="green"
                      size="sm"
                      className="rounded-full p-1.5 w-[4ch] tabular-nums items-center justify-center inline-flex hover:bg-green-100"
                    >
                      {String(index + 1)}
                    </Badge>
                  </div>
                  <div 
                    className="flex w-3/20 items-center justify-center-safe"
                  >
                    {`${user.username}`}
                  </div>
                  <div
                    className="flex w-6/20 items-center justify-center-safe"
                  >
                    {`${user.profile ? user.profile[filter] : -1}`}
                  </div>
                </div>
              </ListItem>
            );
        }
      })}
      {isInList && 
        <div className='fixed bottom-1/6 left-1/2 transform -translate-x-1/2 z-50'>
          {!isVisible && 
            <Button
              onClick={scrollToUser}
              pill
              className='cursor-pointer text-lg font-bold text-white leading-none !font-sans flex items-center gap-3 px-6 py-3 bg-[#328E6E] rounded-[22px] transition-all duration-200 hover:bg-[#2a7a5e] focus:outline-none focus:ring-0 object-cover '
            >Scroll to me
            </Button>
          }
        </div>
      }
    </List>
  );
};