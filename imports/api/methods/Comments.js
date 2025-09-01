import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { ProofCollection } from '../collections/Proof';
import { SubscriptionsCollection } from '../collections/Subscriptions';
import { CommentsCollection } from '/imports/api/collections/Comments';

Meteor.methods({
  async addComment(comment) {
    // Gets the user id of the commenter
    // This assumes usernames are unique.
    const user = await Meteor.users.findOneAsync(
      { username: comment.username },
      { fields: { _id: 1 } }
    );
    const userId = user._id;

    // Get the skilltreeId through the proof the comment is on
    const proof = await ProofCollection.findOneAsync(
      { _id: comment.proofId },
      { fields: { skillTreeId: 1 } }
    );
    const { skillTreeId } = proof;

    // Update the user's subcsription's numComments
    SubscriptionsCollection.updateAsync(
      {
        skillTreeId: skillTreeId,
        userId: userId
      },
      {
        $inc: { numComments: 1 }
      }
    );

    return await CommentsCollection.insertAsync(comment);
  },

  async removeComment(commentId) {
    check(commentId, String);

    const comment = await CommentsCollection.findOneAsync({
      _id: commentId
    });

    // Gets the user id of the commenter
    // This assumes usernames are unique.
    const user = await Meteor.users.findOneAsync(
      { username: comment.username },
      { fields: { _id: 1 } }
    );
    const userId = user._id;

    // Get the skilltreeId through the proof the comment is on
    const proof = await ProofCollection.findOneAsync(
      { _id: comment.proofId },
      { fields: { skillTreeId: -1 } }
    );
    const { skillTreeId } = proof;

    // Update the user's subcsription's numComments
    SubscriptionsCollection.updateAsync(
      {
        skillTreeId: skillTreeId,
        userId: userId
      },
      {
        $inc: { numComments: -1 }
      }
    );

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
