import { Meteor } from 'meteor/meteor';
import { CommentsCollection } from '/imports/api/collections/Comments';

Meteor.methods({
  // add comment to collection
  async addComment(comment) {
    return await CommentsCollection.insertAsync(comment);
  },

  // remove comment from collection
  async removeComment(comment_id) {
    return await CommentsCollection.removeAsync({_id: comment_id});
  },

  // edit comment in collection
  async editComment(commentId, newText) {
    return await CommentsCollection.updateAsync({_id: commentId}, {
      $set: {comment: newText}
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

  // retrieve comment from comment_id
  async getComment(comment_id) {
    return await CommentsCollection.findOneAsync({ _id: comment_id })
  },

  // retrieve all comments associated with a post
  async getAllComments(post_id) {
    const comment = await CommentsCollection.find({ postId: post_id }.fetchAsync());

    return comment;
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
