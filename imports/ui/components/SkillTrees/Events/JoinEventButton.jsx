import { Meteor } from 'meteor/meteor';
import { useFind, useSubscribe } from 'meteor/react-meteor-data/suspense';
import React from 'react';
import { EventCollection } from '/imports/api/collections/Events';

export const JoinEventButton = ({ eventId, skillTreeId, disabled }) => {
  const userId = Meteor.userId();

  useSubscribe('events');
  const checkJoined =
    useFind(EventCollection, [
      { _id: { $eq: eventId }, participants: { $in: [userId] } },
      { fields: { _id: 1 } }
    ])[0] ?? null;

  const isJoined = !!checkJoined;

  const denyJoin = () => {
    alert(
      'You must be subscribed to the skilltree to join or leave the event.'
    );
  };

  /**
   * Adds user to the event
   * @returns void
   */
  const joinEvent = async () => {
    try {
      // Add user to the event
      return await Meteor.callAsync('addUser', userId, eventId);
    } catch (error) {
      console.log('Error adding user to event');
      console.log(error);
    }
  };

  const leaveEvent = async () => {
    try {
      // Remove user from the event
      return await Meteor.callAsync('removeUser', userId, eventId);
    } catch (error) {
      console.log('Error removing user from event');
      console.log(error);
    }
  };

  return (
    <button
      className="block py-2 pl-3 pr-4 md:p-0 cursor-pointer"
      onClick={disabled ? denyJoin : isJoined ? leaveEvent : joinEvent}
    >
      <div
        className={`px-3 py-2 rounded ${
          disabled
            ? 'w-full sm:w-auto bg-gray-400 text-gray-200 font-semibold py-2 px-4 rounded-lg shadow hover:bg-[#2a7d60] transition-colors'
            : isJoined
              ? 'w-full sm:w-auto bg-white text-black font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors'
              : 'w-full sm:w-auto bg-[#328E6E] text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-[#2a7d60] transition-colors'
        }`}
      >
        {isJoined ? 'Leave Event' : 'Join Event'}
      </div>
    </button>
  );
};
