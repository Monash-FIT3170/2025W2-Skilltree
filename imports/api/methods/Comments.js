import { Meteor } from 'meteor/meteor';
import { CommentsCollection } from '/imports/api/collections/Comments';
import { check } from 'meteor/check';

Meteor.methods({
  // add comment to collection
  async addComment(comment) {
    return await CommentsCollection.insertAsync(comment);
  },

  // remove comment from collection
  async removeComment(commentId) {
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

  // edit comment in collection
  async editComment(commentId, newText) {
    check(commentId, String);
    check(newText, String);
    return await CommentsCollection.updateAsync(
      { _id: commentId },
      {
        $set: { comment: newText }
      }
    );
  },

  // retrieve comment from commentId
  async getComment(commentId) {
    return await CommentsCollection.findOneAsync({ _id: commentId });
  },

  // retrieve all comments associated with a post
  async getAllComments(postId) {
    const comment = await CommentsCollection.find({
      postId: postId
    }).fetchAsync();

    return comment;
  }
});
