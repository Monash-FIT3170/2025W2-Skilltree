import { Meteor } from 'meteor/meteor';
import { ProofCollection } from '/imports/api/collections/Proof';
import { check } from 'meteor/check';

// Define Meteor Methods for ProofCollection (client-side calls)
Meteor.methods({
  // method to insert a proof
  // returns ID of proof or null
  async insertProof(proof) {
    // insert proof into collection
    const res = await ProofCollection.insertAsync(proof);

    return res;
  },

  // find a proof by ID
  // returns document object or null
  async findProofID(proofId) {
    return await ProofCollection.findOneAsync({ _id: proofId });
  },

  // get all proofs as an array
  async getAllProof() {
    return await ProofCollection.find({}).fetchAsync();
  },

  // add verification points to a proof
  async addVerification(proofId, points) {
    const proof = await ProofCollection.findOneAsync({ _id: proofId });

    if (proof) {
      return await ProofCollection.updateAsync(
        { _id: proofId },
        {
          $inc: { verification: points }
        }
      );
    }
  },

  // remove specific proof
  async removeProof(proofId) {
    const res = await ProofCollection.removeAsync({ _id: proofId });

    return res;
  },

  // remove all proofs
  async removeAllProofs() {
    return await ProofCollection.removeAsync({});
  },
//   // UPVOTE without requiring login
// async 'post.upvote'(postId) {
//   check(postId, String);

//   const post = await PostCollection.findOneAsync({ _id: postId });
//   if (!post) throw new Meteor.Error('Post not found');

//   return await PostCollection.updateAsync(
//     { _id: postId },
//     { $inc: { upvotes: 1 } }
//   );
// },

// // DOWNVOTE without requiring login
// async 'post.downvote'(postId) {
//   check(postId, String);

//   const post = await PostCollection.findOneAsync({ _id: postId });
//   if (!post) throw new Meteor.Error('Post not found');

//   return await PostCollection.updateAsync(
//     { _id: postId },
//     { $inc: { downvotes: 1 } }
//   );
// }

  async 'proof.upvote'(proofId) {
  check(proofId, String);
  const userId = this.userId;
  if (!userId) throw new Meteor.Error('Not authorised');

  const proof = await ProofCollection.findOneAsync({ _id: proofId });
  if (!proof) throw new Meteor.Error('Post not found');

  const isUpvoted = proof.upvoters?.includes(userId);
  const isDownvoted = proof.downvoters?.includes(userId);

  // Remove vote
  if (isUpvoted) {
    return await ProofCollection.updateAsync(
      { _id: proofId },
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

  return await ProofCollection.updateAsync({ _id: proofId }, update);
},

async 'proof.downvote'(proofId) {
  check(proofId, String);
  const userId = this.userId;
  if (!userId) throw new Meteor.Error('Not authorised');

  const proof = await ProofCollection.findOneAsync({ _id: proofId });
  if (!proof) throw new Meteor.Error('proof not found');

  const isDownvoted = proof.downvoters?.includes(userId);
  const isUpvoted = proof.upvoters?.includes(userId);

  if (isDownvoted) {
    return await ProofCollection.updateAsync(
      { _id: proofId },
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

  return await ProofCollection.updateAsync({ _id: proofId }, update);
}

});
