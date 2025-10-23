import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';

import { Spinner } from 'flowbite-react';

import { useFind, useSubscribe } from 'meteor/react-meteor-data/suspense';

import { SkillTreeCollection } from '/imports/api/collections/SkillTree';

export const SubscribeButton = ({ skilltreeId }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const userId = Meteor.userId();

  useSubscribe('skilltrees');
  const skilltree = useFind(
    SkillTreeCollection,
    [
      {
        _id: {
          $eq: skilltreeId
        },
        subscribers: userId
      },
      {
        fields: {
          _id: 1,
        },
        
      }
    ],
    [skilltreeId]
  )[0];

  useEffect(()=>{
    setIsSubscribed(!!skilltree)
    setIsLoading(false)
  }, [skilltree])
  
  // check if user is subscribed
  const checkSubscription = skilltreeId => async userId => {
    // find user in skilltree
    try {
      const user = await Meteor.callAsync(
        'skilltrees.findUser',
        skilltreeId,
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
      Meteor.callAsync('saveSubscription', skilltreeId);
      console.log('saved base tree');

      // Add user to list of the skilltree's subscribers
      return await Meteor.callAsync(
        'skilltrees.subscribeUser',
        skilltreeId,
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
      Meteor.callAsync('removeSubscription', skilltreeId, userId);
      // Remove user from list of the skilltree's subscribers
      return await Meteor.callAsync(
        'skilltrees.unsubscribeUser',
        skilltreeId,
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
      await Meteor.callAsync('updateSubscribedCommunities', skilltreeId);
    } catch (error) {
      console.log('Error subscribing');
      console.log(error);
    }

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
      await Meteor.callAsync('removeSubscribedCommunities', skilltreeId);
    } catch (error) {
      console.log('Error unsubscribing');
      console.log(error);
    }

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
