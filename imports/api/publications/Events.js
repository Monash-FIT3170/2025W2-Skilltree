import { Meteor } from 'meteor/meteor';
import { EventCollection } from '/imports/api/collections/Events';

Meteor.publish('events', () => EventCollection.find());

Meteor.startup(async () => {
  // drop table
  await EventCollection.removeAsync({});

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
      skilltreeId: 'Climbing',
      title: 'Speedclimbing contest',
      description: 'Climb the wall as fast as you can',
      maxTrophies: 55,
      active: true,
      participants: []
    }
  ];

  for (const dummyEvent of dummyEvents) {
    await EventCollection.insertAsync(dummyEvent);
  }
});
