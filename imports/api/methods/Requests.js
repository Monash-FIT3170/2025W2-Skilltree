// /imports/api/requests/server/methods.js
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { RequestsCollection } from '/imports/api/collections/Requests';
import { FollowersCollection } from '/imports/api/collections/Followers';

Meteor.methods({
  'requests.send'(requesteeUserId) {
    check(requesteeUserId, String);
    if (!this.userId) throw new Meteor.Error('not-authorized');
    if (this.userId === requesteeUserId)
      throw new Meteor.Error('invalid', 'Cannot request yourself');

    // prevent duplicates
    const exists = RequestsCollection.findOne({
      requesterUserId: this.userId,
      requesteeUserId
    });
    if (exists) return exists._id;

    return RequestsCollection.insert({
      requesterUserId: this.userId,
      requesteeUserId,
      createdAt: new Date()
    });
  },

  'requests.cancel'(requestId) {
    check(requestId, String);
    if (!this.userId) throw new Meteor.Error('not-authorized');
    const req = RequestsCollection.findOne({ _id: requestId });
    if (!req || req.requesterUserId !== this.userId)
      throw new Meteor.Error('not-authorized');
    RequestsCollection.remove({ _id: requestId });
  },

  'requests.accept'(requestId) {
    check(requestId, String);
    if (!this.userId) throw new Meteor.Error('not-authorized');
    const req = RequestsCollection.findOne({ _id: requestId });
    if (!req || req.requesteeUserId !== this.userId)
      throw new Meteor.Error('not-authorized');

    // create follow and remove request
    FollowersCollection.insert({
      followerUserId: req.requesterUserId,
      followingUserId: req.requesteeUserId,
      createdAt: new Date()
    });
    RequestsCollection.remove({ _id: requestId });
  },

  'requests.decline'(requestId) {
    check(requestId, String);
    if (!this.userId) throw new Meteor.Error('not-authorized');
    const req = RequestsCollection.findOne({ _id: requestId });
    if (!req || req.requesteeUserId !== this.userId)
      throw new Meteor.Error('not-authorized');
    RequestsCollection.remove({ _id: requestId });
  }
});
