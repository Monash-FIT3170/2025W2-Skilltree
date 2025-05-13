import assert from "assert";
import { Meteor } from 'meteor/meteor';
import { useSubscribeSuspense } from 'meteor/communitypackages:react-router-ssr';
import { useFind } from 'meteor/react-meteor-data/suspense';
import { PostCollection } from "../imports/api/collections/PostCollection";

useSubscribeSuspense('post'); // Subscribe to the "post" publication, suspense waits and allows for subscribed data on SSR pre-rendering

// methods
const PostInsert = async post => {
    const res = await Meteor.callAsync('insertPost', post);
    return res;
};

const PostFind = async post_id => {
    const res = await Meteor.callAsync('findPostID', post_id);
    return res;
};

const PostGet = async () => {
    const res = await Meteor.callAsync('getAllPost');
    return res;
}

const AddVerification = post_id => async points => {
    const res = await Meteor.callAsync('addVerification',post_id,points);
}

const PostRemove = post_id => async post_id => {
    const res = await Meteor.callAsync('removePost',post_id);
}

const test_id_1 = a1b2c3d4;
const test_id_2 = a2b3c4d5;

const test_post_1 = {
    _id: test_id_1,
    title: "Test Post 1",
    description: "Desc",
    verification: 1,
    user: "User",
    date: new Date(),
    evidence: "Evidence",
};

const test_post_2 = {
    _id: test_id_2,
    title: "Test Post 2",
    description: "Desc",
    verification: 1,
    user: "User",
    date: new Date(),
    evidence: "Evidence",
};

const invalid_post = {
    title: 1,
    description: 1,
    verification: "string",
    user: 1,
    date: 1,
    evidence: 1,
}

describe("Post Method", function () {
    describe("#insertPost", function () {
        it('should return ' + test_id_1 + ' if inserted correctly', function () {
            const res = PostInsert(test_post_1);
            assert.strictEqual(test_id_1,res);
        });
    });
    describe("#findPostID", function () {
        it('should return a post object with the same id as given', function () {
            const res = PostFind(test_id_1);
            assert.strictEqual(test_id_1,res._id);
        })
    });
    describe("#addVerification", function (){
        it('should add verification points to a post', function () {
            const res = AddVerification(test_id_1)(5);
            const post = PostFind(test_id_1);
            assert.strictEqual(post.verification,6)
        })
    });
    describe("#getAllPost", function (){
        it('should return an array of size 2', function () {
            PostInsert(test_post_2);
            const posts = PostGet();
            const size = posts.length;
            assert.strictEqual(size,2);
        })
    });
    describe("#removePost", function (){
        it('it should remove the specified post', function () {
            PostRemove(test_id_2);
            const posts = PostGet();
            const size = posts.length;
            assert.strictEqual(size,1);
        })
    });
    describe('invalid insert', function (){
        it('post should not be inserted', function () {
            assert.ifError(PostInsert(invalid_post));
        })
    });
});