import { Meteor } from 'meteor/meteor';
import { FollowersCollection } from '/imports/api/collections/Followers';
import { check } from 'meteor/check';

Meteor.methods({
  async insertFollower(followerData) {
    check(followerData, {
      followerUserId: String,
      followingUserId: String
    });

    if (followerData.followerUserId === followerData.followingUserId) {
      throw new Meteor.Error('invalid-follow', 'You cannot follow yourself');
    }

    // Check if already following
    const existingFollow = await FollowersCollection.findOneAsync({
      followerUserId: followerData.followerUserId,
      followingUserId: followerData.followingUserId
    });

    if (existingFollow) {
      throw new Meteor.Error(
        'already-following',
        'You are already following this user'
      );
    }

    const followRecord = {
      ...followerData,
      createdAt: new Date()
    };

    const result = await FollowersCollection.insertAsync(followRecord);
    return result;
  },

  async removeFollower(followerData) {
    check(followerData, {
      followerUserId: String,
      followingUserId: String
    });

    const result = await FollowersCollection.removeAsync(followerData);
    return result;
  }
});
