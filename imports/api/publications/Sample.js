import { Meteor } from 'meteor/meteor';
import { SampleCollection } from '/imports/api/collections/Sample';

// Schema
import '/imports/api/schemas/Sample'; // Enable Sample Schema Validation (demonstration)

// Publish the publication named as "sample" from the backend, lets clients (front-end JSX) subscribe to the data in the SampleCollection for real time changes
Meteor.publish('sample', () => SampleCollection.find());

// [Mock Data] via Meteor Startup
Meteor.startup(async () => {
  // Insert a sample document into the SampleCollection with schema validation
  await SampleCollection.removeAsync({}); // Drop collection content to update and avoid dupes (debug)
  await SampleCollection.insertAsync({
    title: 'Ulysses',
    author: 'James Joyce',
    copies: 2 // Try changing to -1 to see validation error!
  });
});
