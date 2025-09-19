import { Meteor } from 'meteor/meteor';
import { EventCollection } from '/imports/api/collections/Events';
import { ProofCollection } from '../collections/Proof';
import { SubscriptionsCollection } from '../collections/Subscriptions';

Meteor.methods({
    async addUser(userId,eventId) {
        check(userId, String)
        check(eventId, String)

        // check user exists
        const user = await Meteor.users.findOneAsync({_id: userId})
        if (!user){
            throw new Meteor.Error('user-not-found', "User does not exist")
        }

        // check event exists
        const eventObject = await EventCollection.findOneAsync({_id: eventId})
        if (!eventObject){
            throw new Meteor.Error('event-not-found', "Event does not exist")
        }

        // verify user is subscribed to skilltree event is held on
        const subscribed = await Meteor.callAsync(
            'skilltrees.findUser',
            eventObject.skilltreeId,
            userId
        );
        if (!subscribed) {
            throw new Meteor.Error('user-not-subscribed', 'User is not subscribed to Skilltree')
        }

        return await EventCollection.updateAsync(
            {_id: eventId},
            {$addToSet: {participants: userId}}
        )
    },
    
    async removeUser(userId, eventId) {
        check(userId, String)
        check(eventId, String)

        // check event exists
        const eventExists = await EventCollection.findOneAsync({_id: eventId})
        if (!eventExists) {
            throw new Meteor.Error('event-not-found', "Event does not exist")
        }

        // check user participating in event
        const user = await EventCollection.findOneAsync(
            {
                _id: eventId,
                participants: { $in: [userId] }
            }
        )
        if (!user) {
            throw new Meteor.Error('user-not-found', "User is not participating in event")
        }

        // remove user from event
        return await EventCollection.updateAsync(
            { _id: eventId },
            { $pull: { participants: userId } }
        )
    },

    async startEvent(eventId) {
        check(eventId, String)

        // check event exists
        const eventExists = await EventCollection.findOneAsync({_id: eventId})
        if (!eventExists) {
            throw new Meteor.Error('event-not-found', "Event does not exist")
        }

        return await EventCollection.updateAsync({_id: eventId},{$set: {active: true}})
    },

    async stopEvent(eventId) {
        check(eventId, String)

        // check event exists
        const eventObject = await EventCollection.findOneAsync({_id: eventId})
        if (!eventObject) {
            throw new Meteor.Error('event-not-found', "Event does not exist")
        }

        await EventCollection.updateAsync({_id: eventId},{$set: {active: false}})

        // distribute trophies if ranked event
        if (eventObject.maxTrophies > 0){
            // get all proofs with eventId
            const proofs = await ProofCollection.find(
                {skillTreeId: {$eq: eventId}},
                {sort: {upvotes: -1}, fields: {user: 1}}
            ).fetchAsync()

            var calc = eventObject.maxTrophies

            for (const proof of proofs){
                calc = Math.max(calc, 1)
                
                await SubscriptionsCollection.updateAsync(
                    {userId: proof.user},
                    {$inc: {trophies: calc}}
                )

                calc -= 1
            }

            return
        }
    },

    async addProof(proof,eventId) {
        check(proof.user, String);
        check(eventId, String);

        // get event object
        const eventObject = await EventCollection.findOneAsync({_id: eventId},{fields: {skilltreeId: 1}});

        // validate event exists
        if (!eventObject) {
            throw new Meteor.Error('event-not-found', "Event does not exist")
        }

        // verify user is subscribed
        const subscribed = await Meteor.callAsync(
            'skilltrees.findUser',
            eventObject.skilltreeId,
            proof.user
        );
        if (!subscribed) {
            throw new Meteor.Error('user-not-subscribed', 'User is not subscribed to Skilltree')
        }

        // add proof with event id
        proof.skillTreeId = eventId
        return await ProofCollection.insertAsync(proof);
    },
});