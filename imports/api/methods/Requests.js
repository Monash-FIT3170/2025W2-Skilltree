import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { RequestsCollection } from '/imports/api/collections/Requests';
import { FollowersCollection } from '/imports/api/collections/Followers';

Meteor.methods({
  async 'requests.send'(requesteeUserId) {
    check(requesteeUserId, String);
    if (!this.userId) throw new Meteor.Error('not-authorized');
    if (this.userId === requesteeUserId) {
      throw new Meteor.Error('invalid', 'Cannot request yourself');
    }

    // ✅ NEW: already following? reject request
    const alreadyFollowing = await FollowersCollection.findOneAsync({
      followerUserId: this.userId,
      followingUserId: requesteeUserId
    });
    if (alreadyFollowing) {
      throw new Meteor.Error(
        'already-following',
        'You already follow this user'
      );
    }

    // Prevent duplicate pending requests
    const exists = await RequestsCollection.findOneAsync({
      requesterUserId: this.userId,
      requesteeUserId
    });
    if (exists) return exists._id;

    return await RequestsCollection.insertAsync({
      requesterUserId: this.userId,
      requesteeUserId,
      createdAt: new Date()
    });
  },

  async 'requests.accept'(requestId) {
    check(requestId, String);
    if (!this.userId) throw new Meteor.Error('not-authorized');

    const req = await RequestsCollection.findOneAsync({ _id: requestId });
    if (!req || req.requesteeUserId !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    // ✅ NEW: idempotent—if already following, don’t insert again
    const already = await FollowersCollection.findOneAsync({
      followerUserId: req.requesterUserId,
      followingUserId: req.requesteeUserId
    });
    if (!already) {
      await FollowersCollection.insertAsync({
        followerUserId: req.requesterUserId,
        followingUserId: req.requesteeUserId,
        createdAt: new Date()
      });
    }

    await RequestsCollection.removeAsync({ _id: requestId });
    return true;
  },

  async 'requests.decline'(requestId) {
    check(requestId, String);
    if (!this.userId) throw new Meteor.Error('not-authorized');

    const req = await RequestsCollection.findOneAsync({ _id: requestId });
    if (!req || req.requesteeUserId !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    await RequestsCollection.removeAsync({ _id: requestId });
    return true;
  },

  async 'requests.cancel'(requestId) {
    check(requestId, String);
    if (!this.userId) throw new Meteor.Error('not-authorized');

    const req = await RequestsCollection.findOneAsync({ _id: requestId });
    if (!req || req.requesterUserId !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    await RequestsCollection.removeAsync({ _id: requestId });
    return true;
  }
});
