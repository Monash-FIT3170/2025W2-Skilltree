import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const RequestsCollection = new Mongo.Collection('requests');

if (Meteor.isServer) {
  Meteor.startup(async () => {
    try {
      await RequestsCollection.rawCollection().createIndex(
        { requesterUserId: 1, requesteeUserId: 1 },
        { unique: true }
      );
    } catch (e) {
      console.error('Error creating index on RequestsCollection:', e);
    }
  });
}
