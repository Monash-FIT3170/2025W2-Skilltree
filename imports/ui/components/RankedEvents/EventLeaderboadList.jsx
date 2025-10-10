import { Meteor } from 'meteor/meteor';
import React from 'react';

import { Avatar, Badge } from 'flowbite-react';

import { useFind, useSubscribe } from 'meteor/react-meteor-data/suspense';

import { ProofCollection } from '/imports/api/collections/Proof';

/**
 * EventLeaderboardList.jsx
 * 
 * Render a leaderboard component displaying a podium with ranks of users in the event
 * 
 * @component
 * @example
 * // Example usage
 * <EventLeaderboardList eventId = {eventId}/>
 * 
 * @param {String} eventId _id of event
 * 
 * @returns Component containing leaderboard
 */
export const EventLeaderboardList = ({ eventId }) => {
  // find all proofs with event ID
  useSubscribe('proof');
  const proofs = useFind(
    ProofCollection,
    [
      { eventId: { $eq: eventId } },
      { fields: { username: 1, user: 1, upvotes: 1 }, sort: { upvotes: -1 } }
    ],
    [eventId]
  );

  const userIds = proofs?.map(entry => entry.user) ?? [];

  useSubscribe('users');
  const profiles = useFind(
    Meteor.users,
    [{ _id: { $in: userIds } }, { fields: { 'profile.avatarUrl': 1 } }],
    [userIds]
  );

  // map user profile to proof
  const leaderboard = proofs?.map(proof => ({
    ...proof,
    ...profiles?.find(profile => profile._id === proof.user)
  }));

  const podiumStyle = [
    { bg: '#AAA9AD', text: '🥈', height: '60' },
    { bg: '#D3AF37', text: '🥇', height: '85' },
    { bg: '#A97142', text: '🥉', height: '50' }
  ];

  // filter podium users
  const podium = leaderboard.slice(0, 3);

  for (let i = podium.length; i < 3; i++) {
    podium.push({});
  }

  var tmp = podium[1];
  podium[1] = podium[0];
  podium[0] = tmp;

  return (
    <div>
      <div className="grid grid-cols-3 gap-1 w-full justify-end-safe items-end">
        {podium.map((entry, index) => {
          console.log(entry);

          return (
            <div
              className="flex flex-col items-center gap-2.5"
              key={entry.user ? entry.user : ''}
            >
              <Avatar
                img={entry.profile?.avatarUrl}
                rounded
                size="lg"
                className="border-2 border-green-300 rounded-full"
              />
              <div className="text-lg font-bold !font-sans">
                <div>{`${entry.username ? entry.username : ''}`}</div>
              </div>
              <div
                className={`h-${podiumStyle[index].height} flex w-full flex-col items-center justify-center rounded-t-xl bg-[${podiumStyle[index].bg}] font-semibold`}
              >
                <div className="text-4xl">{podiumStyle[index].text}</div>
                <div className="text-2xl">{`${entry.upvotes ? entry.upvotes + ' upvotes' : ''}`}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="py-3">
        {leaderboard?.slice(3).map((entry, index) => {
          return (
            <div className="flex flex-col items-center w-full" key={entry.user}>
              <div className="flex items-center w-full">
                <div className="flex w-2/20 items-center justify-center-safe">
                  <Badge
                    color="green"
                    size="sm"
                    className="rounded-full p-1.5 w-[4ch] tabular-nums items-center justify-center inline-flex hover:bg-green-100"
                  >
                    {String(index + 4)}
                  </Badge>
                </div>
                <div className="flex w-4/20 items-center justify-center-safe">
                  <Avatar
                    img={entry.profile?.avatarUrl}
                    rounded
                    size="md"
                    className="border-2 border-green-300 rounded-full"
                  />
                </div>
                <div className="flex w-12/20 items-center justify-center-safe">
                  {`${entry.username}`}
                </div>
                <div className="flex w-17/20 items-center justify-center-safe">
                  {entry.upvotes} upvotes
                </div>
              </div>
              <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-200 w-full" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
