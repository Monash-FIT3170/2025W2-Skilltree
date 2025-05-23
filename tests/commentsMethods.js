import assert from 'assert';
import { Meteor } from 'meteor/meteor';
import '/imports/api/methods/Comments';
import { CommentsCollection } from '/imports/api/collections/Comments'; // Comment collection

// _id
const COMMENT_ID_1 = 'abcd12345';
const TEST_ID_1 = 'a1b2c3d4';
const TEST_ID_2 = 'a2b3c4d5';

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
