import assert from 'assert';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import '/imports/api/methods/Events';
import { EventCollection } from '/imports/api/collections/Events';
import { ProofCollection } from '../imports/api/collections/Proof';
import { SkillTreeCollection } from '../imports/api/collections/SkillTree';

const TEST_ID_1 = 'abcd1234';

const TEST_ID_2 = '1234abcd';

const skilltreeId1 = 'abcdefghijklmnop';

var testUser;

const testEvent = {
  _id: TEST_ID_1,
  skilltreeId: skilltreeId1,
  title: 'Dribbling',
  description: 'Demonstrate your dribbling skills',
  maxTrophies: 5,
  active: false,
  participants: []
};

const testProof1 = {
  _id: TEST_ID_2,
  title: 'Test Proof 1',
  description: 'Desc',
  verification: 1,
  user: testUser,
  date: new Date()
};

const skillTree1 = {
  _id: skilltreeId1,
  title: 'Basketball',
  image:
    'https://media.istockphoto.com/id/1636022764/photo/basketball-ball.jpg?s=612x612&w=0&k=20&c=NVi1V5dCAZKUHdrhnRq-G5t8XSvZE1YXvgw8NxX3N0I=',
  description: 'Learn dribbling to shooting.',
  termsAndConditions:
    'This SkillTree is intended for sports training purposes.',
  tags: ['basketball', 'sports', 'ball'],
  skillNodes: [
    {
      id: '0',
      type: 'root',
      data: {
        label: 'root',
        description: 'root',
        progressXp: null,
        requirements: 'root',
        xpPoints: null
      },
      position: { x: 0, y: 0 }
    },
    {
      id: '1',
      type: 'view-node-unlocked',
      data: {
        label: 'basic dribbling 🏀',
        description: 'Learn how to dribble the basketball effectively.',
        progressXp: 10,
        requirements: 'Upload a video of yourself dribbling for 10 seconds',
        xpPoints: 10
      },
      position: { x: 200, y: 300 }
    },
    {
      id: '2',
      type: 'view-node-unlocked',
      data: {
        label: 'Layup 🏃‍♂️',
        description:
          ' A close-range shot taken by driving toward the basket and laying the ball off the backboard.',
        progressXp: 6,
        requirements: 'Upload a video of yourself',
        xpPoints: 10
      },
      position: { x: 200, y: 200 }
    },
    {
      id: '3',
      type: 'view-node-locked',
      data: {
        label: 'Spin Move 😵',
        description: 'Learn how to do a spin move.',
        progressXp: 0,
        requirements: 'Upload a video of yourself',
        xpPoints: 20
      },
      position: { x: 200, y: 100 }
    },
    {
      id: '4',
      type: 'view-node-unlocked',
      data: {
        label: 'Agility 💨',
        description: 'Learn how to be agile.',
        progressXp: 34,
        requirements:
          'Upload a video of yourself doing the illinois agility test',
        xpPoints: 50
      },
      position: { x: 0, y: 100 }
    },
    {
      id: '5',
      type: 'view-node-unlocked',
      data: {
        label: 'Shooting Form 🎯',
        description: 'Learn how to do proper shooting form.',
        progressXp: 20,
        requirements: 'Upload a video of yourself',
        xpPoints: 20
      },
      position: { x: -200, y: 300 }
    },
    {
      id: '6',
      type: 'view-node-unlocked',
      data: {
        label: 'Free Throws 💸',
        description: 'Learn how to do free throws.',
        progressXp: 6,
        requirements: 'Upload a video of yourself',
        xpPoints: 20
      },
      position: { x: -150, y: 200 }
    },
    {
      id: '7',
      type: 'view-node-locked',
      data: {
        label: 'Three Pointers 💧',
        description: 'Learn how to do a spin move.',
        progressXp: 0,
        requirements: 'Upload a video of yourself',
        xpPoints: 20
      },
      position: { x: -250, y: 100 }
    },
    {
      id: '8',
      type: 'view-node-unlocked',
      data: {
        label: 'Mid Range 🥶',
        description: 'Learn how to do a spin move.',
        progressXp: 4,
        requirements: 'Upload a video of yourself',
        xpPoints: 20
      },
      position: { x: -350, y: 200 }
    }
  ],
  skillEdges: [
    { id: 'e1', source: '0', target: '7' },
    { id: 'e2', source: '0', target: '4' },
    { id: 'e3', source: '0', target: '3' },
    { id: 'e4', source: '3', target: '2' },
    { id: 'e5', source: '2', target: '1' },
    { id: 'e6', source: '7', target: '6' },
    { id: 'e7', source: '7', target: '8' },
    { id: 'e8', source: '6', target: '5' },
    { id: 'e9', source: '8', target: '5' }
  ],
  admins: ['basketballpro'],
  subscribers: ['playerA', 'playerB']
};

const SkillTreeInsert = async skillTree => {
  return await Meteor.callAsync('skilltrees.insertAsync', skillTree);
};

const EventGet = async eventId => {
  return await Meteor.callAsync('getEvent', eventId);
};

before(async function () {
  testUser = await Accounts.createUserAsync({
    username: 'Test'
  });
});

describe('Events Methods', function () {
  describe('createEvent', function () {
    it('creates an event in the Skilltree', async function () {
      await SkillTreeInsert(skillTree1);
      const res = await Meteor.callAsync('createEvent', testEvent);
      assert.strictEqual(res, TEST_ID_1);
    });
  });

  describe('getEvent', function () {
    it('retrieves event by ID', async function () {
      const eventObj = await getEvent(TEST_EVENT_ID);
      assert.strictEqual(eventObj._id, TEST_EVENT_ID);
      assert.strictEqual(eventObj.skilltreeId, testEvent.skilltreeId);
      assert.strictEqual(eventObj.title, testEvent.title);
      assert.strictEqual(eventObj.description, testEvent.description);
      assert.strictEqual(eventObj.maxTrophies, testEvent.maxTrophies);
      assert.strictEqual(eventObj.active, testEvent.active);
      assert.deepStrictEqual(eventObj.participants, testEvent.participants);
    });
  });

  describe('addUser', function () {
    it('adds a user to an event', async function () {
      await Meteor.callAsync(
        'skilltrees.subscribeUser',
        skilltreeId1,
        testUser
      );

      const res = await Meteor.callAsync('addUser', testUser, TEST_ID_1);
      const eventObject = await EventGet(TEST_ID_1);
      assert.strictEqual(res, 1);
      assert.ok(eventObject.participants.includes(testUser));
    });
  });

  describe('removeUser', function () {
    it('removes user from an event', async function () {
      const res = await Meteor.callAsync('removeUser', testUser, TEST_ID_1);
      const eventObject = await EventGet(TEST_ID_1);
      assert.strictEqual(res, 1);
      const containsUser = eventObject.participants.includes(testUser);
      assert.ok(!containsUser);
    });
  });

  describe('startEvent', function () {
    it('starts the event', async function () {
      const res = await Meteor.callAsync('startEvent', TEST_ID_1);
      assert.strictEqual(res, 1);
      const eventObject = await EventGet(TEST_ID_1);
      assert.ok(eventObject.active);
    });
  });

  describe('stopEvent', function () {
    it('stops the event', async function () {
      const res = await Meteor.callAsync('stopEvent', TEST_ID_1);
      assert.strictEqual(res, 1);
      const eventObject = await EventGet(TEST_ID_1);
      assert.ok(!eventObject.active);
    });
  });

  describe('addProof', function () {
    it('adds proof to event', async function () {
      testProof1.user = testUser;
      await Meteor.callAsync(
        'skilltrees.subscribeUser',
        skilltreeId1,
        testUser
      );

      const resUser = await Meteor.callAsync('addUser', testUser, TEST_ID_1);
      const resProof = await Meteor.callAsync(
        'addProof',
        testProof1,
        TEST_ID_1
      );
      const proof = await ProofCollection.findOneAsync({ _id: TEST_ID_2 });
      assert.strictEqual(proof.eventId, TEST_ID_1);
    });
  });
});

after(async function () {
  SkillTreeCollection.removeAsync({ _id: skilltreeId1 });
});
