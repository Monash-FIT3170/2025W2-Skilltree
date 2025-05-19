import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import { ProofCollection } from '/imports/api/collections/Proof';
import '/imports/api/methods/Proof';

// Testing proofUpload Meteor method
describe('proofUpload method', function () {
  const proofOne = {
    title: 'Test Proof',
    author: 'Test Author',
    communityId: 'community123',
    caption: 'A test caption.',
    link: 'https://example.com/test.png',
    uploadedAt: new Date()
  };
  // Reset the ProofCollection in the test database before each test
  beforeEach(async function () {
    await ProofCollection.removeAsync({});
  });

  // Test whether the method successfully inserts a proof document in the 'proof' collection
  // Does not seem to go through the Schema which is odd.
  it('should insert new proof document', async function () {
    // Get the method handler
    const method = Meteor.server.method_handlers['proofUpload'];

    // Call the method as if from an authenticated user
    await method.apply({}, [proofOne]);

    const proof = await ProofCollection.findOneAsync({ title: 'Test Proof' });

    expect(proof).to.exist;
    expect(proof).to.include({
      title: proofOne.title,
      author: proofOne.author,
      communityId: proofOne.communityId,
      caption: proofOne.caption,
      link: proofOne.link
    });
  });
  // TODO Should also implement tests checking that inserts that don't match the schema fail, but for now the method itself
  // TODO: doesn't seem to respect the schema at all - might be some way to do it via imports?
});
