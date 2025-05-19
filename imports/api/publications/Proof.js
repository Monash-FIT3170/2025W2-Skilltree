import { Meteor } from 'meteor/meteor';
import { ProofCollection } from '/imports/api/collections/Proof';

// Schema
import '/imports/api/schemas/Proof'; // Enable Proof Schema Validation (demonstration)

// Publish the publication named as "proof" from the backend, lets clients (front-end JSX) subscribe to the data in the ProofCollection for real time changes
Meteor.publish('proof', () => ProofCollection.find());
