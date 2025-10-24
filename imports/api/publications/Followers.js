import { Meteor } from 'meteor/meteor';
import { FollowersCollection } from '/imports/api/collections/Followers';

//Import for validation
import '/imports/api/schemas/Followers';

Meteor.publish('followers', () => FollowersCollection.find());

Meteor.startup(async () => {
  await FollowersCollection.removeAsync({});

  //This is not real data and is not used, its just here to publish the collection on mongoDB compass
  const mockFollowerRelationship = {
    followerUserId: 'The person that is following',
    followingUserId: 'The person being followed',
    createdAt: new Date()
  };

  FollowersCollection.insertAsync(mockFollowerRelationship);
});
