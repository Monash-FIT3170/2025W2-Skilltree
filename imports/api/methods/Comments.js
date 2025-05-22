import { Meteor } from 'meteor/meteor';
import { CommentsCollection } from '/imports/api/collections/Comments';
import { check } from 'meteor/check';

Meteor.methods({
  async commentInsert(username, comment, postid) {
    check(username, String);
    check(comment, String);
    check(postid, String);

    await CommentsCollection.insertAsync({
      username: username,
      comment: comment,
      postId: postid,
      createdAt: new Date()
    });
  },

  async deleteComment(commentId) {
    check(commentId, String);

    const result = await CommentsCollection.removeAsync(commentId);
    if (result === 0) {
      throw new Meteor.Error(
        'not-found',
        'Comment not found or already removed'
      );
    }
    return result;
  },

  async editComment(commentId, newText) {
    check(commentId, String);
    check(newText, String);

    await CommentsCollection.updateAsync(commentId, {
      $set: { comment: newText }
    });
  }
});
