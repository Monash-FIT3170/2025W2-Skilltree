import { Mongo } from 'meteor/mongo';

// Create & export a new MongoDB collection named 'user'
export const UsersCollection = new Mongo.Collection('user');
