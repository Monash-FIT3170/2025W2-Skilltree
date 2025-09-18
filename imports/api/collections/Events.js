import { Mongo } from 'meteor/mongo';

// Create & export a new MongoDB collection for Events
export const EventCollection = new Mongo.Collection('events');