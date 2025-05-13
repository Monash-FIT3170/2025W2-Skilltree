import { Meteor } from 'meteor/meteor';
import { PostCollection } from '/imports/api/collections/PostCollection';

// Schema
import '/imports/api/schemas/PostSchema';

// Publish the publication named as "post" from the backend, lets clients (front-end JSX) subscribe to the data in the SampleCollection for real time changes
Meteor.publish('post', () => PostCollection.find());

// [Mock Data] via Meteor Startup
Meteor.startup(async () => {
  // Insert a sample post into PostCollection with schema validation
  await PostCollection.removeAsync({}); // Drop collection content to update and avoid dupes (debug)
  await PostCollection.insertAsync({
    title: 'Test',
    description: 'Hello',
    verification: 1,
    user: 'User',
    date: new Date(),
    evidence: 'Evidence',
  });
});
