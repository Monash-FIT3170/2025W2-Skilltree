import { Meteor } from 'meteor/meteor';
import { EventCollection } from '/imports/api/collections/Events';
import { ProofCollection } from '../collections/Proof';
import { SubscriptionsCollection } from '../collections/Subscriptions';
import { SkillTreeCollection } from '../collections/SkillTree';
import { check } from 'meteor/check';

Meteor.methods({
    /**
     * Method to get an event by its unique _id
     * 
     * @param {String} eventId _id of event
     * @returns document containing event from query
     */
    async getEvent(eventId){
        return await EventCollection.findOneAsync(
            {_id: eventId}
        )
    },

    /**
     * Create an event given an event object
     * 
     * @param {Object} event event object with data
     * @returns _id of the newly created event
     */
    async createEvent(event){
        const skilltree = await SkillTreeCollection.findOneAsync(
            {_id: event.skilltreeId}
        )
        if (!skilltree){
            throw new Meteor.Error('skilltree-not-found', "Skilltree does not exist")
        }

        return await EventCollection.insertAsync(event)
    },

    /**
     * Adds a user to an event 
     * 
     * @param {String} userId _id of user being added
     * @param {String} eventId _id of event where user is being added
     * @returns number of documents affected
     */
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

    /**
     * Starts an event
     * 
     * @param {String} eventId _id of event
     * @returns number of documents affected
     */
    async startEvent(eventId) {
        check(eventId, String)

        // check event exists
        const eventExists = await EventCollection.findOneAsync({_id: eventId})
        if (!eventExists) {
            throw new Meteor.Error('event-not-found', "Event does not exist")
        }

        return await EventCollection.updateAsync({_id: eventId},{$set: {active: true}})
    },

    /**
     * Stops event and awards trophies if the event is ranked
     * Currently takes maxTrophies and gives 1 less to each lower position (min 1)
     * 
     * @param {String} eventId _id of event
     * @returns number of documents affected
     */
    async stopEvent(eventId) {
        check(eventId, String)

        // check event exists
        const eventObject = await EventCollection.findOneAsync({_id: eventId})
        if (!eventObject) {
            throw new Meteor.Error('event-not-found', "Event does not exist")
        }

        const res = await EventCollection.updateAsync({_id: eventId},{$set: {active: false}})

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
        }

        return res
    },

    /**
     * Add proof for an event 
     * 
     * @param {Object} proof proof to be inserted
     * @param {String} eventId _id of event
     * @returns _id of proof inserted
     */
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