import { Meteor } from 'meteor/meteor';
import { CommentsCollection } from '/imports/api/collections/Comments'; // SampleCollection

// Basic methods for Comments
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
