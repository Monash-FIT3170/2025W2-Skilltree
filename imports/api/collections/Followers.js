import { Mongo } from 'meteor/mongo';

// Create & export a new MongoDB collection
export const FollowersCollection = new Mongo.Collection('followers');
