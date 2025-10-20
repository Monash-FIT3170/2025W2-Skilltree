import assert from 'assert';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import '/imports/api/methods/Events';
import { EventCollection } from '/imports/api/collections/Events';
import { ProofCollection } from '/imports/api/collections/Proof';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';

const TEST_ID_1 = 'abcd1234';
const TEST_ID_2 = '1234abcd';
const SKILLTREE_ID = 'abcdefghijklmnop';

let testUser;

const testEvent = {
  _id: TEST_ID_1,
  skilltreeId: SKILLTREE_ID,
  title: 'Dribbling',
  description: 'Demonstrate your dribbling skills',
  maxTrophies: 5,
  participants: []
};

const testProof = {
  _id: TEST_ID_2,
  title: 'Test Proof 1',
  description: 'Desc',
  verification: 1,
  user: null, // set after creating testUser
  date: new Date()
};

const skillTree = {
  _id: SKILLTREE_ID,
  title: 'Basketball',
  image:
    'https://media.istockphoto.com/id/1636022764/photo/basketball-ball.jpg?s=612x612&w=0&k=20&c=NVi1V5dCAZKUHdrhnRq-G5t8XSvZE1YXvgw8NxX3N0I=',
  description: 'Learn dribbling to shooting.',
  termsAndConditions: 'This SkillTree is intended for sports training purposes.',
  tags: ['basketball', 'sports', 'ball'],
  skillNodes: [],
  skillEdges: [],
  admins: ['basketballpro'],
  subscribers: ['playerA', 'playerB']
};

const insertSkillTree = async st => Meteor.callAsync('skilltrees.insertAsync', st);
const getEvent = async eventId => Meteor.callAsync('getEvent', eventId);

before(async function () {
  testUser = await Accounts.createUserAsync({ username: 'Test' });
  testProof.user = testUser;
});

describe('Events Methods', function () {

  describe('createEvent', function () {
    it('creates an event in the Skilltree', async function () {
      await insertSkillTree(skillTree);
      const res = await Meteor.callAsync('createEvent', testEvent);
      assert.strictEqual(res, TEST_ID_1);
    });
  });

  describe('getEvent', function () {
    it('retrieves event with eventId', async function () {
      const res = await getEvent(TEST_ID_1);

      assert.strictEqual(res._id, TEST_ID_1);
      assert.strictEqual(res.skilltreeId, SKILLTREE_ID);
      assert.strictEqual(res.title, testEvent.title);
      assert.strictEqual(res.description, testEvent.description);
      assert.strictEqual(res.maxTrophies, testEvent.maxTrophies);
      assert.strictEqual(res.active, true); // matches createEvent behavior
      assert.ok(res.createdAt instanceof Date);
      assert.deepStrictEqual(res.participants, []);
    });
  });

  describe('addUser', function () {
    it('adds a user to an event', async function () {
      await Meteor.callAsync('skilltrees.subscribeUser', SKILLTREE_ID, testUser);
      const res = await Meteor.callAsync('addUser', testUser, TEST_ID_1);
      assert.strictEqual(res, 1);

      const eventObj = await getEvent(TEST_ID_1);
      assert.ok(eventObj.participants.includes(testUser));
    });
  });

  describe('removeUser', function () {
    it('removes user from an event', async function () {
      const res = await Meteor.callAsync('removeUser', testUser, TEST_ID_1);
      assert.strictEqual(res, 1);

      const eventObj = await getEvent(TEST_ID_1);
      assert.ok(!eventObj.participants.includes(testUser));
    });
  });

  describe('startEvent', function () {
    it('starts the event', async function () {
      const res = await Meteor.callAsync('startEvent', TEST_ID_1);
      assert.strictEqual(res, 1);

      const eventObj = await getEvent(TEST_ID_1);
      assert.ok(eventObj.active);
    });
  });

  describe('stopEvent', function () {
    it('stops the event', async function () {
      const res = await Meteor.callAsync('stopEvent', TEST_ID_1);
      assert.strictEqual(res, 1);

      const eventObj = await getEvent(TEST_ID_1);
      assert.ok(!eventObj.active);
    });
  });

  describe('addProof', function () {
    it('adds proof to event', async function () {
      // Ensure user is subscribed and added
      await Meteor.callAsync('skilltrees.subscribeUser', SKILLTREE_ID, testUser);
      await Meteor.callAsync('addUser', testUser, TEST_ID_1);

      const resProof = await Meteor.callAsync('addProof', testProof, TEST_ID_1);
      assert.strictEqual(resProof, TEST_ID_2);

      const proof = await ProofCollection.findOneAsync({ _id: TEST_ID_2 });
      assert.strictEqual(proof.eventId, TEST_ID_1);
      assert.strictEqual(proof.user, testUser);
    });
  });

});

after(async function () {
  await EventCollection.removeAsync({ _id: TEST_ID_1 });
  await ProofCollection.removeAsync({ _id: TEST_ID_2 });
  await SkillTreeCollection.removeAsync({ _id: SKILLTREE_ID });
});
