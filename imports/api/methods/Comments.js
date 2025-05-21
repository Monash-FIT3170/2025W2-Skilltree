import { Meteor } from 'meteor/meteor';
import { CommentsCollection } from '/imports/api/collections/Comments'; // SampleCollection
import { check } from 'meteor/check';

// Basic methods for Comments
Meteor.methods({
  async commentInsert(username, comment, postid) {
    check(username, String);
    check(comment, String);
    check(postid, String);
    console.log('commentInsert', username, comment, postid);
 
    await CommentsCollection.insertAsync({
      username: username,
      comment: comment,
      postId: postid,
      createdAt: new Date()
    });
  },

  // 'comments.remove'(commentId) {
  //   check(commentId, String);
  //   return CommentsCollection.remove(commentId);
  // }
});
