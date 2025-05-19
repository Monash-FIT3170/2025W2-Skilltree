import { Mongo } from 'meteor/mongo';

// Create & export a new MongoDB collection named 'post'
export const PostCollection = new Mongo.Collection('post');
