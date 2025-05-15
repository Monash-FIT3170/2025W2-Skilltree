import { Mongo } from 'meteor/mongo';

// Create the Comments collection
export const CommentsCollection = new Mongo.Collection('comments');
