// import { Meteor } from 'meteor/meteor';
// import { SampleCollection } from '/imports/api/collections/Sample'; // SampleCollection

// // Define Meteor Methods for SampleCollection (client-side calls)
// Meteor.methods({
//   async sampleCopiesInc(sampleId, amount) {
//     const sample = await SampleCollection.findOneAsync(
//       { _id: sampleId },
//       { fields: { copies: 1 } }
//     );
//     await SampleCollection.updateAsync(sampleId, {
//       $set: { copies: sample.copies + amount } // $inc validation doesn't work. Use $set to workaround, see https://github.com/Meteor-Community-Packages/meteor-collection2/issues/12
//     });
//     // await SampleCollection.updateAsync(sampleId, { $inc: { copies: amount } }); // $inc directly increments copies field by the amount, (validation not working)
//   }
// });

import { Meteor } from 'meteor/meteor';
import { SampleCollection } from '/imports/api/collections/Sample';

Meteor.methods({
  async sampleCopiesInc(sampleId, amount) {
    const sample = await SampleCollection.findOneAsync(
      { _id: sampleId },
      { fields: { copies: 1 } }
    );
    await SampleCollection.updateAsync(sampleId, {
      $set: { copies: sample.copies + amount }
    });
  },

  // 👍 Upvote Method
  async sampleUpvote(sampleId) {
    const sample = await SampleCollection.findOneAsync(
      { _id: sampleId },
      { fields: { upvotes: 1 } }
    );
    await SampleCollection.updateAsync(sampleId, {
      $set: { upvotes: (sample.upvotes || 0) + 1 }
    });
  },

  // 👎 Downvote Method
  async sampleDownvote(sampleId) {
    const sample = await SampleCollection.findOneAsync(
      { _id: sampleId },
      { fields: { downvotes: 1 } }
    );
    await SampleCollection.updateAsync(sampleId, {
      $set: { downvotes: (sample.downvotes || 0) + 1 }
    });
  }
});
