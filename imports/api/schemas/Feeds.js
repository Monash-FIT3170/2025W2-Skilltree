// /imports/api/schemas/Feeds.js
import SimpleSchema from 'meteor/aldeed:simple-schema';
import { Schemas } from '/imports/api/Schemas';
import { FeedsCollection } from '/imports/api/collections/Feeds';

Schemas.Feeds = new SimpleSchema({
  userId: {
    type: String,
    label: 'Whose feed this belongs to'
  },
  activityId: {
    type: String,
    label: 'Reference to the activity'
  },
  actorId: {
    type: String,
    label: 'Who performed the action'
  },
  createdAt: {
    type: Date,
    label: 'When the activity happened',
    defaultValue: new Date()
  }
});

/*
FeedsCollection.createIndex({ userId: 1, createdAt: -1 });
FeedsCollection.createIndex({ activityId: 1 });
*/

FeedsCollection.attachSchema(Schemas.Feeds);
