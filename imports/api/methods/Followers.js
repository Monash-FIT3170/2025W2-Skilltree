import { Meteor } from 'meteor/meteor';
import { FollowersCollection } from '/imports/api/collections/Followers';
import { check } from 'meteor/check';

Meteor.methods({
  async insertFollower(followerData) {
    check(followerData, {
      followerUserId: String,
      followingUserId: String
    });

    console.log('insertFollower called with:', followerData);

    if (followerData.followerUserId === followerData.followingUserId) {
      throw new Meteor.Error('invalid-follow', 'You cannot follow yourself');
    }

    // Check if already following
    const existingFollow = await FollowersCollection.findOneAsync({
      followerUserId: followerData.followerUserId,
      followingUserId: followerData.followingUserId
    });

    if (existingFollow) {
      console.log('Already following - found existing:', existingFollow);
      throw new Meteor.Error(
        'already-following',
        'You are already following this user'
      );
    }

    const followRecord = {
      ...followerData,
      createdAt: new Date()
    };

    console.log('Inserting follow record:', followRecord);
    const result = await FollowersCollection.insertAsync(followRecord);
    console.log('Insert result:', result);
    return result;
  },

  async removeFollower(followerData) {
    check(followerData, {
      followerUserId: String,
      followingUserId: String
    });

    console.log('removeFollower called with:', followerData);

    const result = await FollowersCollection.removeAsync(followerData);
    console.log('Remove result:', result);
    return result;
  }
});
