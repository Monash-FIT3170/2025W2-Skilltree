import { Meteor } from 'meteor/meteor';
import { ProofCollection } from '/imports/api/collections/Proof';

// Define Meteor Methods for ProofCollection (client-side calls)
Meteor.methods({
  // TODO combine top 2?
  async proofUpload(data) {
    await ProofCollection.insertAsync({
      title: data.title,
      author: data.author,
      communityId: data.communityId,
      caption: data.caption,
      link: data.link,
      uploadedAt: data.uploadedAt
    });
  },
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
  }
});
