import assert from 'assert';
import { Meteor } from 'meteor/meteor';
import '/imports/api/methods/Comments';
import { CommentsCollection } from '/imports/api/collections/Comments'; // Comment collection
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';
import { ProofCollection } from '/imports/api/collections/Proof';

const userId = 'testUserId';

const skillTreeId1 = 'dfaZsdfasdfdsf';
const skillTree1 = {
  _id: skillTreeId1,
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
  subscribers: [
    'playerA',
    'playerB',
    userId,
    'User 1',
    'User 2',
    'User 3',
    'User 4'
  ]
};

// _id

const TEST_ID_1 = 'a1Zb2c3d4';
const TEST_ID_2 = 'a2Zb3c4d5';

// THESE BEING PICKED UP BY PROOF TESTS
const TEST_PROOF_1 = {
  _id: TEST_ID_1,
  title: 'Test Proof 1',
  description: 'Desc',
  verification: 1,
  user: userId,
  skillTreeId: skillTreeId1,
  date: new Date()
};

const TEST_PROOF_2 = {
  _id: TEST_ID_2,
  title: 'Test Proof 2',
  description: 'Desc',
  verification: 1,
  user: userId,
  skillTreeId: skillTreeId1,
  date: new Date()
};

const COMMENT_ID_1 = 'abcd12345';
const NEW_TEXT = 'This comment is edited';

// dummy data
const COMMENT_1 = {
  _id: COMMENT_ID_1,
  username: 'User 1',
  comment: 'Hello World',
  proofId: TEST_ID_1,
  createdAt: new Date()
};

const COMMENT_2 = {
  username: 'User 2',
  comment: 'Hello World',
  proofId: TEST_ID_2,
  createdAt: new Date()
};

const COMMENT_3 = {
  username: 'User 3',
  comment: 'Hello World',
  proofId: TEST_ID_1,
  createdAt: new Date()
};

const COMMENT_4 = {
  username: 'User 4',
  comment: 'Hello World',
  proofId: TEST_ID_2,
  createdAt: new Date()
};

// TODO i believe dummy proofs have skilltrees that dont exist, hence subscription check fails

const CommentAdd = async comment => {
  const res = await Meteor.call('addComment', comment);
  return res;
};

const CommentGetAll = async proofId => {
  const res = await Meteor.call('getAllComments', proofId);
  return res;
};

const CommentGet = async commentId => {
  const res = await Meteor.call('getComment', commentId);
  return res;
};

const CommentRemove = async commentId => {
  const res = await Meteor.call('removeComment', commentId);
  return res;
};

const CommentEdit = commentId => async newText => {
  const res = await Meteor.call('editComment', commentId, newText);
  return res;
};

before(async function () {
  // drop collection
  await CommentsCollection.removeAsync({});
  await SkillTreeCollection.removeAsync({});
  await ProofCollection.removeAsync({});
  await SkillTreeCollection.insertAsync(skillTree1);
  await ProofCollection.insertAsync(TEST_PROOF_1);
  await ProofCollection.insertAsync(TEST_PROOF_2);
});

describe('Comment methods', function () {
  describe('addComment', function () {
    it('should add a comment to the database', async function () {
      const res = await CommentAdd(COMMENT_1);
      assert.strictEqual(res, COMMENT_ID_1);
    });
  });
  describe('getComment', function () {
    it('should retrieve a comment that has been inserted', async function () {
      const res = await CommentGet(COMMENT_ID_1);
      assert.deepStrictEqual(res, COMMENT_1);
    });
  });
  describe('editComment', function () {
    it('should edit the contents of a comment', async function () {
      await CommentEdit(COMMENT_ID_1)(NEW_TEXT);
      const res = await CommentGet(COMMENT_ID_1);
      assert.strictEqual(res.comment, NEW_TEXT);
    });
  });
  describe('removeComment', function () {
    it('should remove comment from database', async function () {
      const res = await CommentRemove(COMMENT_ID_1);
      assert.strictEqual(res, 1);
    });
  });
  describe('getAllComments', function () {
    it('should return all comments from database associated with a proof', async function () {
      await CommentAdd(COMMENT_1);
      await CommentAdd(COMMENT_2);
      await CommentAdd(COMMENT_3);
      await CommentAdd(COMMENT_4);
      const res = await CommentGetAll(TEST_ID_1);
      assert.strictEqual(res.length, 2);
    });
  });
});


