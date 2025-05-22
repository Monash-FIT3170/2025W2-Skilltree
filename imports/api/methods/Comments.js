import { Meteor } from 'meteor/meteor';
import { CommentsCollection } from '/imports/api/collections/Comments';
import { check } from 'meteor/check';

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
