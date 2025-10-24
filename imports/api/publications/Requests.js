import { Meteor } from 'meteor/meteor';
import { RequestsCollection } from '/imports/api/collections/Requests';

// Publishes all requests where the current user is either the requester or the requestee
Meteor.publish('requests.mine', function () {
  if (!this.userId) return this.ready();

  return RequestsCollection.find({
    $or: [{ requesterUserId: this.userId }, { requesteeUserId: this.userId }]
  });
});

// Publishes the request status between the current user and a specific profile
Meteor.publish('requests.forProfile', function (profileUserId) {
  if (!profileUserId) return this.ready();

  return RequestsCollection.find({
    requesterUserId: this.userId,
    requesteeUserId: profileUserId
  });
});
