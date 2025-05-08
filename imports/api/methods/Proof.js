import { Meteor } from 'meteor/meteor';
import { ProofCollection } from '/imports/api/collections/Proof'; //ProofCollection

// Define Meteor Methods for SampleCollection (client-side calls)
Meteor.methods({
  async proofUpload(title, filename) {
    console.log('proofUpload meteor method ');
    await ProofCollection.insertAsync({
      title: title,
      filename: filename
    });
  }
});
