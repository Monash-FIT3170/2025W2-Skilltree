import { Mongo } from 'meteor/mongo';

// Create & export a new MongoDB collection named 'user'
export const UsersProfileCollection = new Mongo.Collection('users_profile');
