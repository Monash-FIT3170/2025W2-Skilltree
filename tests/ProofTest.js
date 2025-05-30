import assert from 'assert';
import { Meteor } from 'meteor/meteor';
import '/imports/api/methods/Proof'; // Load Proof Collection Methods
import { ProofCollection } from '/imports/api/collections/Proof'; // Proof collection

// methods
const ProofInsert = async proof => {
  const res = await Meteor.callAsync('insertProof', proof);
  return res;
};

const ProofFind = async proof_id => {
  const res = await Meteor.callAsync('findProofID', proof_id);
  return res;
};

const ProofGet = async () => {
  const res = await Meteor.callAsync('getAllProof');
  return res;
};

const AddVerification = proof_id => async points => {
  const res = await Meteor.callAsync('addVerification', proof_id, points);
};

const ProofRemove = async proof_id => {
  const res = await Meteor.callAsync('removeProof', proof_id);
};

const test_id_1 = 'a1b2c3d4';
const test_id_2 = 'a2b3c4d5';

const test_proof_1 = {
  _id: test_id_1,
  title: 'Test Proof 1',
  description: 'Desc',
  verification: 1,
  user: 'User',
  date: new Date()
};

const test_proof_2 = {
  _id: test_id_2,
  title: 'Test Proof 2',
  description: 'Desc',
  verification: 1,
  user: 'User',
  date: new Date()
};

before(async function () {
  ProofCollection.removeAsync({});
});

describe('Proof Method', function () {
  describe('#insertProof', function () {
    it(
      'should return ' + test_id_1 + ' if inserted correctly',
      async function () {
        const res = await ProofInsert(test_proof_1);
        assert.strictEqual(test_id_1, res);
      }
    );
  });
  describe('#findProofID', function () {
    it('should return a proof object with the same id as given', async function () {
      const res = await ProofFind(test_id_1);
      assert.strictEqual(test_id_1, res._id);
    });
  });
  describe('#addVerification', function () {
    it('should add verification points to a proof', async function () {
      const res = await AddVerification(test_id_1)(5);
      const proof = await ProofFind(test_id_1);
      assert.strictEqual(proof.verification, 6);
    });
  });
  describe('#getAllProof', function () {
    it('should return an array of size 2', async function () {
      await ProofInsert(test_proof_2);
      const proofs = await ProofGet();
      const size = proofs.length;
      assert.strictEqual(size, 2);
    });
  });
  describe('#removeProof', function () {
    it('it should remove the specified proof', async function () {
      await ProofRemove(test_id_2);
      const proofs = await ProofGet();
      const size = proofs.length;
      assert.strictEqual(size, 1);
    });
  });
});
