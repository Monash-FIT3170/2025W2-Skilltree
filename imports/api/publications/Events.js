import { Meteor } from 'meteor/meteor';
import { EventCollection } from '/imports/api/collections/Events';

Meteor.publish('events', () => EventCollection.find());

Meteor.startup(async () => {
    // drop table
    await SubscriptionsCollection.removeAsync({});

    const dummyEvents = [{
        skilltreeId: 'basketball',
        title: 'Dribbling contest',
        description: 'Dribble the ball as many times between the legs for 1 minute',
        maxTrophies: 55,
        active: true,
        participants: [],
    }];

    for (const dummyEvent of dummyEvents) {
        await EventCollection.insertAsync(dummyEvent);
    }
})