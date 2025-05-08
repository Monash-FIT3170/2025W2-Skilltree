import { Mongo } from 'meteor/mongo';

// Create & export a new MongoDB collection for tags
export const TagsCollection = new Mongo.Collection('tags');