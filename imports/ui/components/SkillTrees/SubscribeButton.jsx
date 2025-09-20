import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Spinner } from 'flowbite-react';

export const SubscribeButton = ({ skillTreeId }) => {
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

  // call meteor method skilltrees.subscribeUser
  const subscribeUser = async () => {
    try {
      // Create/activate the subscription document itself
      Meteor.callAsync('saveSubscription', skillTreeId);
      console.log('saved base tree');

      // Add user to list of the skilltree's subscribers
      return await Meteor.callAsync(
        'skilltrees.subscribeUser',
        skillTreeId,
        userId
      );
    } catch (error) {
      console.log('Subscription error');
      console.log(error);
    }
  };

  // call meteor method skilltrees.unsubscribeUser
  const unsubscribeUser = async () => {
    try {
      // Deactivate the subscription document itself
      Meteor.callAsync('removeSubscription', skillTreeId, userId);
      // Remove user from list of the skilltree's subscribers
      return await Meteor.callAsync(
        'skilltrees.unsubscribeUser',
        skillTreeId,
        userId
      );
    } catch (error) {
      console.log(error);
      console.log('Unsubscription error');
    }
  };

  // subscribe a user to a skilltree
  const subscribeUserToSkilltree = async e => {
    e.preventDefault();

    setIsLoading(true);

    // Add  user to skilltree's subscriber list and create/activate the subscription
    await subscribeUser();

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
  const unsubscribeUserFromSkilltree = async e => {
    e.preventDefault();

    setIsLoading(true);

    // Remove user from skilltree's subscriber list and deactivate the subscription
    await unsubscribeUser();

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
      <a className="block py-2 pl-3 pr-4 md:p-0">
        <div className="text-white bg-gray-500 px-3 py-2 rounded flex items-center gap-2">
          <Spinner size="sm" aria-label="Loading spinner" />
          Loading...
        </div>
      </a>
    );
  }

  return (
    <a
      className="block py-2 pl-3 pr-4 md:p-0 cursor-pointer"
      onClick={
        isSubscribed ? unsubscribeUserFromSkilltree : subscribeUserToSkilltree
      }
    >
      <div
        className={`px-3 py-2 rounded ${
          isSubscribed
            ? 'bg-red-600/85 hover:bg-red-700 text-white'
            : 'bg-white hover:bg-gray-200 text-black'
        }`}
      >
        {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
      </div>
    </a>
  );
};
