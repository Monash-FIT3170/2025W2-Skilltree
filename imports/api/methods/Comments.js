import { Meteor } from 'meteor/meteor';
import { CommentsCollection } from '/imports/api/collections/Comments';
import { check } from 'meteor/check';

Meteor.methods({
  async addComment(comment) {
    // Update comment author's comment count
    // This assumes usernames are unique.
    Meteor.users.updateAsync(
      { username: comment.username },
      { $inc: { 'profile.commentNumTEMP': 1 } }
    );

    return await CommentsCollection.insertAsync(comment);
  },

  async removeComment(commentId) {
    check(commentId, String);

    // Update comment author's comment count
    // This assumes usernames are unique.
    const comment = await CommentsCollection.findOneAsync({ _id: commentId });
    if (comment) {
      Meteor.users.updateAsync(
        { username: comment.username },
        { $inc: { 'profile.commentNumTEMP': -1 } }
      );
    }

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

  // retrieve all comments associated with a proof
  async getAllComments(proofId) {
    const comment = await CommentsCollection.find({
      proofId: proofId
    }).fetchAsync();

    return comment;
  },

  async getCommentsForProof(proofId) {
    return await CommentsCollection.find({ proofId }).fetchAsync();
  }
});
