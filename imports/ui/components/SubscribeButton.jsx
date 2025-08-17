import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useFind } from 'meteor/react-meteor-data/suspense';
import { Button, Spinner } from 'flowbite-react';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';

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
      Meteor.callAsync('saveSkillTreeProgress', skillTreeId);
      console.log('saved base tree');

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

    // subscribe user to skilltree
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
      <div className="flex flex-wrap items-start gap-2 w-15/100">
        <Button className="cursor-pointer w-full position-relative mt-2 text-white text-2xl font-semibold leading-none !font-sans flex items-center gap-3 px-6 py-3 bg-[#328E6E] rounded-[22px] transition-all duration-200 hover:bg-[#2a7a5e] focus:outline-none focus:ring-0">
          <Spinner
            size="sm"
            aria-label="Info spinner example"
            className="me-3"
          ></Spinner>
          Loading ...
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-start gap-2 w-15/100">
      {isSubscribed ? (
        <Button
          color="green"
          pill
          type="submit"
          onClick={unsubscribeUserFromSkilltree}
          className="cursor-pointer w-full position-relative mt-2 text-white text-2xl font-semibold leading-none !font-sans flex items-center gap-3 px-6 py-3 bg-[#328E6E] rounded-[22px] transition-all duration-200 hover:bg-[#2a7a5e] focus:outline-none focus:ring-0"
        >
          Unsubscribe
        </Button>
      ) : (
        <Button
          color="green"
          pill
          type="submit"
          onClick={subscribeUserToSkilltree}
          className="cursor-pointer w-full position-relative mt-2 text-white text-2xl font-semibold leading-none !font-sans flex items-center gap-3 px-6 py-3 bg-[#328E6E] rounded-[22px] transition-all duration-200 hover:bg-[#2a7a5e] focus:outline-none focus:ring-0"
        >
          Subscribe
        </Button>
      )}
    </div>
  );
};
