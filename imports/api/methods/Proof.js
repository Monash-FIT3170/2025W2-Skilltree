import { Meteor } from 'meteor/meteor';
import { ProofCollection } from '/imports/api/collections/Proof'; //ProofCollection

// Define Meteor Methods for ProofCollection (client-side calls)
Meteor.methods({
  async proofUpload(data) {
    await ProofCollection.insertAsync({
      title: data.title,
      author: data.author,
      communityId: data.communityId,
      caption: data.caption,
      link: data.link,
      uploadedAt: data.uploadedAt
    });
  }
});
