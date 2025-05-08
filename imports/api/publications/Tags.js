import { Meteor } from 'meteor/meteor';
import { TagsCollection } from '/imports/api/collections/Tags';

// Schema
import '/imports/api/schemas/Tags'; // Enable Sample Schema Validation (demonstration)'

// Publish the publication named as "tags" from the backend, lets clients (front-end JSX) subscribe to the data in the SampleCollection for real time changes
Meteor.publish('tags', () => TagsCollection.find());

// [Mock Data] via Meteor Startup
Meteor.startup(async () => {
  // Insert a sample document into the SampleCollection with schema validation
  await TagsCollection.removeAsync({}); // Drop collection content to update and avoid dupes (debug)
  await TagsCollection.insertAsync({
    tagname: 'sport',
    type: 'default'
  });
  await TagsCollection.insertAsync({
    tagname: 'music',
    type: 'default'
  });

  await TagsCollection.insertAsync({
    tagname: 'technology',
    type: 'default'
  });
});
