import { Meteor } from 'meteor/meteor';
import { CommentsCollection } from '/imports/api/collections/Comments';

Meteor.methods({
  // add comment to collection
  async addComment(comment) {
    return await CommentsCollection.insertAsync(comment);
  },

  // remove comment from collection
  async removeComment(comment_id) {
    check(comment_id, String);

    const result = await CommentsCollection.removeAsync(comment_id);
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
    return await CommentsCollection.updateAsync({_id: commentId}, {
      $set: {comment: newText}
    });
  },

  // retrieve comment from comment_id
  async getComment(comment_id) {
    return await CommentsCollection.findOneAsync({ _id: comment_id })
  },

  // retrieve all comments associated with a post
  async getAllComments(post_id) {
    const comment = await CommentsCollection.find({ postId: post_id }.fetchAsync());

    return comment;
  },
});
