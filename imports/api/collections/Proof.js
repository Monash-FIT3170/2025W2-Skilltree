import { Mongo } from 'meteor/mongo';

// Create & export a new MongoDB collection named 'sample'
export const ProofCollection = new Mongo.Collection('proof');
