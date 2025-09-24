import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Spinner } from 'flowbite-react';
import { check } from 'meteor/check';
import { EventCollection } from '/imports/api/collections/Events';
import { useSubscribe, useFind } from 'meteor/react-meteor-data/suspense';

export const JoinEventButton = ({ eventId, skillTreeId }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const userId = Meteor.userId();

  useEffect(() => {
    setIsLoading(true);
    const loadingCheck = async () => {
      const subscriptionStatus = await checkSubscription(skillTreeId)(userId);
      setIsSubscribed(subscriptionStatus);
    };
    loadingCheck();
    setIsLoading(false);
  }, []);

  // check if user is subscribed
  const checkSubscription = skillTreeId => async userId => {
    // find user in skilltree
    try {
      const user = await Meteor.callAsync(
        'skilltrees.findUser',
        skillTreeId,
        userId
      );
      return !!user;
    } catch (error) {
      console.log('Error finding user');
      console.log(error);
    }
  };

  useSubscribe('events');
  const checkJoined =
    useFind(EventCollection, [
      { _id: { $eq: eventId }, participants: { $in: [userId] } },
      { fields: { _id: 1 } }
    ])[0] ?? null;

  const isJoined = !!checkJoined;

  const denyJoin = () => {
    alert('You must be subscribed to the skilltree to join the event.');
  };

  /**
   * Adds user to the event
   * @returns void
   */
  const addUser = async () => {
    try {
      // Add user to the event
      return await Meteor.callAsync('addUser', userId, eventId);
    } catch (error) {
      console.log('Error adding user to event');
      console.log(error);
    }
  };

  const removeUser = async () => {
    try {
      // Remove user from the event
      return await Meteor.callAsync('removeUser', userId, eventId);
    } catch (error) {
      console.log('Error removing user from event');
      console.log(error);
    }
  };

  // subscribe a user to a skilltree
  const joinEvent = async e => {
    e.preventDefault();

    setIsLoading(true);

    // Add  user to skilltree's subscriber list and create/activate the subscription
    await addUser();

    // add user to skilltree
    try {
      await Meteor.callAsync('updateSubscribedCommunities', skillTreeId);
    } catch (error) {
      console.log('Error subscribing');
      console.log(error);
    }

    const subscribeStatus = await checkSubscription(skillTreeId)(userId);
    console.log(subscribeStatus);
    setIsSubscribed(subscribeStatus);
    setIsLoading(false);
  };

  // unsubscribe a user from a skilltree
  const leaveEvent = async e => {
    e.preventDefault();

    setIsLoading(true);

    // Remove user from skilltree's subscriber list and deactivate the subscription
    await removeUser();

    // remove skill tree from user profile
    try {
      await Meteor.callAsync('removeSubscribedCommunities', skillTreeId);
    } catch (error) {
      console.log('Error unsubscribing');
      console.log(error);
    }

    const subscribeStatus = await checkSubscription(skillTreeId)(userId);
    console.log(subscribeStatus);
    setIsSubscribed(subscribeStatus);

    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <button className="block py-2 pl-3 pr-4 md:p-0">
        <div className="text-white bg-gray-500 px-3 py-2 rounded flex items-center gap-2">
          <Spinner size="sm" aria-label="Loading spinner" />
          Loading...
        </div>
      </button>
    );
  }

  return (
    <button
      disabled={isLoading || !isSubscribed}
      className="block py-2 pl-3 pr-4 md:p-0 cursor-pointer"
      onClick={!isSubscribed ? denyJoin : isJoined ? leaveEvent : joinEvent}
    >
      <div
        className={`px-3 py-2 rounded ${
          isLoading || !isSubscribed
            ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
            : isJoined
              ? 'bg-red-600/85 hover:bg-red-700 text-white'
              : 'bg-white hover:bg-gray-200 text-black'
        }`}
      >
        {isJoined ? 'Leave Event' : 'Join Event'}
      </div>
    </button>
  );
};
