import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { ProofCollection } from '/imports/api/collections/Proof'; // Post collection

Meteor.methods({
  // method to insert a post
  // returns ID of post or null
  async insertPost(post) {
    // insert post into collection
    const res = await ProofCollection.insertAsync(post);

    return res;
  },

  // find a post by ID
  // returns document object or null
  async findPostID(post_id) {
    return await ProofCollection.findOneAsync({ _id: post_id });
  },

  // get all posts as an array
  async getAllPost() {
    return await ProofCollection.find({}).fetchAsync();
  },

  // add verification points to a post
  async addVerification(post_id, points) {
    const post = await ProofCollection.findOneAsync({ _id: post_id });

    if (post) {
      return await ProofCollection.updateAsync(
        { _id: post_id },
        {
          $inc: { verification: points }
        }
      );
    }
  },

  // remove specific post
  async removePost(post_id) {
    const res = await ProofCollection.removeAsync({ _id: post_id });

    return res;
  },

  // remove all posts
  async removeAllPosts() {
    return await ProofCollection.removeAsync({});
  },
  //   // UPVOTE without requiring login
  // async 'post.upvote'(postId) {
  //   check(postId, String);

  //   const post = await ProofCollection.findOneAsync({ _id: postId });
  //   if (!post) throw new Meteor.Error('Post not found');

  //   return await ProofCollection.updateAsync(
  //     { _id: postId },
  //     { $inc: { upvotes: 1 } }
  //   );
  // },

  // // DOWNVOTE without requiring login
  // async 'post.downvote'(postId) {
  //   check(postId, String);

  //   const post = await ProofCollection.findOneAsync({ _id: postId });
  //   if (!post) throw new Meteor.Error('Post not found');

  //   return await ProofCollection.updateAsync(
  //     { _id: postId },
  //     { $inc: { downvotes: 1 } }
  //   );
  // }

  async 'post.upvote'(postId) {
    check(postId, String);
    const userId = this.userId;
    if (!userId) throw new Meteor.Error('Not authorised');

    const post = await ProofCollection.findOneAsync({ _id: postId });
    if (!post) throw new Meteor.Error('Post not found');

    const isUpvoted = post.upvoters?.includes(userId);
    const isDownvoted = post.downvoters?.includes(userId);

    // Remove vote
    if (isUpvoted) {
      return await ProofCollection.updateAsync(
        { _id: postId },
        {
          $pull: { upvoters: userId },
          $inc: { upvotes: -1 }
        }
      );
    }

    const update = {
      $addToSet: { upvoters: userId },
      $inc: { upvotes: 1 }
    };

    if (isDownvoted) {
      update.$pull = { downvoters: userId };
      update.$inc.downvotes = -1;
    }

    return await ProofCollection.updateAsync({ _id: postId }, update);
  },

  async 'post.downvote'(postId) {
    check(postId, String);
    const userId = this.userId;
    if (!userId) throw new Meteor.Error('Not authorised');

    const post = await ProofCollection.findOneAsync({ _id: postId });
    if (!post) throw new Meteor.Error('Post not found');

    const isDownvoted = post.downvoters?.includes(userId);
    const isUpvoted = post.upvoters?.includes(userId);

    if (isDownvoted) {
      return await ProofCollection.updateAsync(
        { _id: postId },
        {
          $pull: { downvoters: userId },
          $inc: { downvotes: -1 }
        }
      );
    }

    const update = {
      $addToSet: { downvoters: userId },
      $inc: { downvotes: 1 }
    };

    if (isUpvoted) {
      update.$pull = { upvoters: userId };
      update.$inc.upvotes = -1;
    }

    return await ProofCollection.updateAsync({ _id: postId }, update);
  }
});
