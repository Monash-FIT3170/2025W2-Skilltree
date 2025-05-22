import assert from "assert";
import { Meteor } from 'meteor/meteor';
import '/imports/api/methods/Comments';
import { CommentsCollection } from '/imports/api/collections/Comments'; // Comment collection

// _id
const comment_id_1 = "abcd12345"
const test_id_1 = 'a1b2c3d4';
const test_id_2 = "a2b3c4d5";

const new_text = "This comment is edited"

// dummy data
const comment_1 = {
    _id: comment_id_1,
    username: 'User 1',
    comment: 'Hello World',
    postId: test_id_1,
    createdAt: new Date(), 
}

const comment_2 = {
    username: 'User 2',
    comment: 'Hello World',
    postId: test_id_2,
    createdAt: new Date(), 
}

const comment_3 = {
    username: 'User 3',
    comment: 'Hello World',
    postId: test_id_1,
    createdAt: new Date(), 
}

const comment_4 = {
    username: 'User 4',
    comment: 'Hello World',
    postId: test_id_2,
    createdAt: new Date(), 
}

const CommentAdd = async comment => {
    const res = await Meteor.call('addComment', comment);
    return res;
}

const CommentGetAll = async post_id => {
    const res = await Meteor.call('getAllComments', post_id);
    return res;
}

const CommentGet = async comment_id => {
    const res = await Meteor.call('getComment', comment_id);
    return res;
}

const CommentRemove = async comment_id => {
    const res = await Meteor.call('removeComment', comment_id);
    return res;
}

const CommentEdit = comment_id => async new_text => {
    const res = await Meteor.call('editComment', comment_id, new_text);
    return res;
}

before(
    async function () {
        // drop collection
        await CommentsCollection.removeAsync({});
    }
)

describe("Comment methods", function () {
    describe("addComment", function () {
        it("should add a comment to the database", async function () {
            const res = await CommentAdd(comment_1);
            assert.strictEqual(res,comment_id_1);
        })
    })
    describe("getComment", function () {
        it("should retrieve a comment that has been inserted", async function () {
            const res = await CommentGet(comment_id_1);
            assert.deepStrictEqual(res, comment_1)
        })
    })
    describe("editComment", function () {
        it("should edit the contents of a comment", async function () {
            await CommentEdit(comment_id_1)(new_text);
            const res = await CommentGet(comment_id_1);
            assert.strictEqual(res.comment, new_text);
        })
    })
    describe("removeComment", function () {
        it("should remove comment from database", async function () {
            const res = await CommentRemove(comment_id_1);
            assert.strictEqual(res,1);
        })
    })
    describe("getAllComments", function () {
        it("should return all comments from database associated with a post", async function () {
            await CommentAdd(comment_1);
            await CommentAdd(comment_2);
            await CommentAdd(comment_3);
            await CommentAdd(comment_4);
            const res = await CommentGetAll(test_id_1);
            assert.strictEqual(res.length, 2);
        })
    })
})