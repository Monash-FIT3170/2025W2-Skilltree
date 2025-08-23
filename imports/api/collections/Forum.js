import { Mongo } from 'meteor/mongo';

// Create & export a new MongoDB collection named 'sample'
export const ForumCollection = new Mongo.Collection('forum');
