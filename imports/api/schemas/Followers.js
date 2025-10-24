import SimpleSchema from 'meteor/aldeed:simple-schema';
import { Schemas } from '/imports/api/Schemas';

//Import the Followers collection
import { FollowersCollection } from '/imports/api/collections/Followers';

Schemas.Followers = new SimpleSchema({
  followerUserId: {
    type: String,
    label: 'Who is Following'
  },
  followingUserId: {
    type: String,
    label: 'Who is being followed'
  },
  createdAt: {
    type: Date,
    label: 'Followship creation date',
    defaultValue: new Date()
  }
});

//Attach schema to collection
FollowersCollection.attachSchema(Schemas.Followers);
