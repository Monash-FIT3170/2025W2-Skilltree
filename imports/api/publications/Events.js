import { Meteor } from 'meteor/meteor';
import { EventCollection } from '/imports/api/collections/Events';

Meteor.publish('events', () => EventCollection.find());

Meteor.startup(async () => {
  const dummyEvents = [
    {
      _id: 'dribbling_basketball',
      skilltreeId: 'basketball',
      title: 'Dribbling contest',
      description:
        'Dribble the ball as many times between the legs for 1 minute',
      maxTrophies: 55,
      active: true,
      participants: []
    },
    {
      _id: 'speedclimbing_contest',
      skilltreeId: 'Climbing',
      title: 'Speedclimbing contest',
      description: 'Climb the wall as fast as you can',
      maxTrophies: 55,
      active: true,
      participants: []
    }
  ];

  // Insert dummy data if collection is empty
  const collectionCount = await EventCollection.find().countAsync();

  if (collectionCount == 0) {
    for (const dummyEvent of dummyEvents) {
      await EventCollection.insertAsync(dummyEvent);
    }
  }
});
