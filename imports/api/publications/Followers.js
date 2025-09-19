import { Meteor } from 'meteor/meteor';
import { FollowersCollection } from '/imports/api/collections/Followers';

//Import for validation
import '/imports/api/schemas/Followers';

Meteor.publish('followers', () => FollowersCollection.find());

Meteor.startup(async () => {
  await FollowersCollection.removeAsync({});
});
