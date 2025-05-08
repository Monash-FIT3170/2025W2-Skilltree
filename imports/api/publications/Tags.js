import { Meteor } from 'meteor/meteor';
import { TagsCollection } from '/imports/api/collections/Tags';

// Schema
import '/imports/api/schemas/Tags'; // Enable Sample Schema Validation (demonstration)

// Publish the publication named as "tags" from the backend, lets clients (front-end JSX) subscribe to the data in the SampleCollection for real time changes
Meteor.publish('tags', () => TagsCollection.find());
