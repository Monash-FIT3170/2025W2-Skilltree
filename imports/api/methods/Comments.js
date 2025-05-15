import { Meteor } from 'meteor/meteor';
import { CommentsCollection } from '/imports/api/collections/Comments'; // SampleCollection
import { check } from 'meteor/check';

// Basic methods for Comments
Meteor.methods({
  'comments.insert'(username, comment) {
    check(username, String);
    check(comment, String);

    return CommentsCollection.insert({
      username,
      comment,
      createdAt: new Date()
    });
  },

  'comments.remove'(commentId) {
    check(commentId, String);
    return CommentsCollection.remove(commentId);
  }
});
