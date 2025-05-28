import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Button } from 'flowbite-react';

export const SubscribeButton = ({ skillTreeId }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const userId = Meteor.userId();

  // check if user is subscribed
  const checkSubscription = async () => {
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
      await Meteor.callAsync('skilltrees.subscribeUser', skillTreeId, userId);
    } catch (error) {
      console.log('Subscription error');
      console.log(error);
    }
  };

  // call meteor method skilltrees.unsubscribeUser
  // const unsubscribeUser = async () => {
  //     try{
  //         return await Meteor.call('skilltrees.unsubscribeUser',skillTreeId,userId);
  //     } catch (error) {
  //         console.log('Unsubscription error')
  //     }
  // }

  // call meteor method skilltrees.findUser
  //   const findUser = async () => {
  //     try {
  //       return await Meteor.call('skilltrees.findUser', skillTreeId, userId);
  //     } catch (error) {
  //       console.log('Error finding user');
  //     }
  //   };

  // subscribe a user to a skilltree
  const subscribeUserToSkilltree = async e => {
    e.preventDefault();

    // subscribe user to skilltree
    await subscribeUser();

    // add user to skilltree
    try {
      const res = await Meteor.callAsync(
        'updateSubscribedCommunities',
        skillTreeId
      );
      console.log(res);
    } catch (error) {
      console.log('Error subscribing');
      console.log(error);
    }

    setIsSubscribed(checkSubscription());
  };

  // unsubscribe a user from a skilltree
  // const unsubscribeUserFromSkilltree = async () => {
  //     setLoading(true)

  //     // remove user from skilltree
  //     unsubscribeUser();

  //     try{
  //         await Meteor.call("updateFieldAbstract", { $pull: { "profile.subscribedCommunities": skillTreeId }})
  //     } catch (error) {
  //         console.log('Error unsubscribing')
  //         console.log(error)
  //     }
  //     console.log(Meteor.user())

  //     setIsSubscribed(checkSubscription())

  //     setLoading(false)

  // };

  // useEffect(() => {
  //     console.log(isSubscribed)
  //     console.log(userId)
  //     const res = checkSubscription()
  //     console.log(res)
  // }, [])

  return (
    <Button
      color="green"
      pill
      type="submit"
      onClick={subscribeUserToSkilltree}
      className="position-relative bg-[#328E6E] text-xl font-bold mt-2text-white text-2xl font-semibold leading-none !font-sans flex items-center gap-3 px-6 py-3 bg-[#328E6E] rounded-[22px] transition-all duration-200 hover:bg-[#2a7a5e]"
      disabled={isSubscribed}
    >
      {'Subscribe'}
    </Button>
  );
};
