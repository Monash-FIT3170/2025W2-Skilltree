// /imports/api/requests/server/methods.js
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

    // prevent duplicates
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

  async 'requests.cancel'(requestId) {
    check(requestId, String);
    if (!this.userId) throw new Meteor.Error('not-authorized');

    const req = await RequestsCollection.findOneAsync({ _id: requestId });
    if (!req || req.requesterUserId !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    await RequestsCollection.removeAsync({ _id: requestId });
    return true;
  },

  async 'requests.accept'(requestId) {
    check(requestId, String);
    if (!this.userId) throw new Meteor.Error('not-authorized');

    const req = await RequestsCollection.findOneAsync({ _id: requestId });
    if (!req || req.requesteeUserId !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    // create follow and remove request
    await FollowersCollection.insertAsync({
      followerUserId: req.requesterUserId,
      followingUserId: req.requesteeUserId,
      createdAt: new Date()
    });
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
  }
});
