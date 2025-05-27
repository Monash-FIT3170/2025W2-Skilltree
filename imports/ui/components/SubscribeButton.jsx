import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Button } from 'flowbite-react';

export const SubscribeButton = ({ skillTreeId }) => {
    const [isSubscribed, setIsSubscribed] = useState(false)
    const userId = Meteor.userId();

    
    const checkSubscription = async () => {
        try{
            const user = await Meteor.call('skilltrees.findUser',skillTreeId,userId);
            console.log(user)
        } catch (error) {
            console.log('Error finding user');
        }
    }

    const handleUpload = async e => {
        e.preventDefault();

        console.log(setIsSubscribed(checkSubscription()))

        // 
        try {
            const user = await Meteor.call('skilltrees.subscribeUser',skillTreeId,userId);
            console.log("Brk1")
            console.log(user)
        } catch (error) {
            console.log(error)
        }

        // 
        try{
            const user = await Meteor.call("updateSubscribedCommunities", skillTreeId);
            console.log("Brk2")
            console.log(user)
        } catch (error) {
            console.log('Error subscribing')
        }

        console.log(setIsSubscribed(checkSubscription()))
    }

    // call meteor method skilltrees.subscribeUser
    const subscribeUser = async () => {
        try{
            const res = await Meteor.call('skilltrees.subscribeUser',skillTreeId,userId);
        } catch (error) {
            console.log('Subscription error')
        }
    }

    // call meteor method skilltrees.unsubscribeUser
    // const unsubscribeUser = async () => {
    //     try{
    //         return await Meteor.call('skilltrees.unsubscribeUser',skillTreeId,userId);
    //     } catch (error) {
    //         console.log('Unsubscription error')
    //     }
    // }

    // call meteor method skilltrees.findUser
    const findUser = async () => {
        try{
            return await Meteor.call('skilltrees.findUser',skillTreeId,userId);
        } catch (error) {
            console.log('Error finding user')
        }
    }

    // subscribe a user to a skilltree
    const subscribeUserToSkilltree = async e => {
        e.preventDefault()

        // subscribe user to skilltree
        await subscribeUser();
        console.log(Meteor.user())
        console.log(skillTreeId)
        
        // add user to skilltree
        try{
            const res = await Meteor.call("updateSubscribedCommunities", skillTreeId)
            console.log(res)
        } catch (error) {
            console.log('Error subscribing')
        }

        setIsSubscribed(checkSubscription())
        

        console.log(Meteor.user())
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

    return(
            <Button
            color="green"
            pill
            type="submit"
            onClick={subscribeUserToSkilltree}
            >
                {"Subscribe"}
            </Button>

    )

};
