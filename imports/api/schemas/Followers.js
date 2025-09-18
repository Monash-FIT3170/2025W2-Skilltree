import SimpleSchema from 'meteor/aldeed:simple-schema';
import { Schemas } from '/imports/api/Schemas';

//Import the Followers collection
import { FollowersCollection } from '/imports/api/collections/Followers';

Schemas.Followers = new SimpleSchema({});

//Attach schema to collection
FollowersCollection.attachSchema(Schemas.Followers);
