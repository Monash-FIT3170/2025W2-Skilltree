import { Meteor } from 'meteor/meteor';
import { ProofCollection } from '/imports/api/collections/Proof'; //ProofCollection

// Define Meteor Methods for SampleCollection (client-side calls)
Meteor.methods({
  async proofUpload(data) {
    await ProofCollection.insertAsync({
      title: data.title,
      author: data.author,
      caption: data.caption,
      filepath: data.filepath,
      uploadedAt: data.uploadedAt
    });
  }
});
