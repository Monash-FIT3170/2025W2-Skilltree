import { Meteor } from 'meteor/meteor';
import { SampleCollection } from '/imports/api/collections/Sample'; // SampleCollection (demonstration) 

// Meteor Startup
Meteor.startup(async () => {
  // Insert sample document to SampleCollection with Schema Validation (demonstration)
  await SampleCollection.removeAsync({}); // Drop collection content to update and avoid dupes (debug)
  // Insert a sample document into the SampleCollection with schema validation
  await SampleCollection.insertAsync({ title: 'Ulysses', author: 'James Joyce', copies: 2 }); // Try changing to -1 to see validation error! 
  // Publish the publication named as "sample" from the backend, lets clients (front-end JSX) subscribe to the data in the SampleCollection for real time changes
  Meteor.publish("sample", () => SampleCollection.find());
});