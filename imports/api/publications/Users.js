import { Meteor } from "meteor/meteor";
import { UsersCollection } from "/imports/api/collections/Users";

// Schema
import "/imports/api/schemas/Users"; // Enable Users Schema Validation (demonstration)

// Publish the publication named as "users" from the backend, lets clients (front-end JSX) subscribe to the data in the UsersCollection for real time changes
Meteor.publish("users", () => UsersCollection.find());

// [Mock Data] via Meteor Startup
Meteor.startup(async () => {
  // Insert a sample document into the UsersCollection with schema validation
  // await UsersCollection.removeAsync({}); // Drop collection content to update and avoid dupes (debug)
  // await UsersCollection.insertAsync({});
});
