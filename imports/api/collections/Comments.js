// imports/api/collections/Comments.js
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

// Create the Comments collection
export const CommentsCollection = new Mongo.Collection('comments');

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

// Allow client-side operations if needed
// Note: Usually you would control this through methods for security
if (Meteor.isServer) {
  // Publishing the collection is done in publications.js
  // This space can be used for server-only logic
}
