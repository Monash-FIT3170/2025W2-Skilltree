import assert from "assert";
import { Meteor } from 'meteor/meteor';
import '/imports/api/methods/PostMethods'; // Load Post Collection Methods 
import { PostCollection } from '/imports/api/collections/PostCollection'; // Post collection

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

const PostRemove = async post_id => {
    const res = await Meteor.callAsync('removePost',post_id);
}

const test_id_1 = 'a1b2c3d4';
const test_id_2 = "a2b3c4d5";

const test_post_1 = {
    _id: test_id_1,
    title: "Test Post 1",
    description: "Desc",
    verification: 1,
    user: "User",
    date: new Date(),
};

const test_post_2 = {
    _id: test_id_2,
    title: "Test Post 2",
    description: "Desc",
    verification: 1,
    user: "User",
    date: new Date(),
};

before( async function(){
    PostCollection.removeAsync({});
})

describe("Post Method", function () {
    describe("#insertPost", function () {
        it('should return ' + test_id_1 + ' if inserted correctly', async function () {
            const res = await PostInsert(test_post_1);
            assert.strictEqual(test_id_1,res);
        });
    });
    describe("#findPostID", function () {
        it('should return a post object with the same id as given', async function () {
            const res = await PostFind(test_id_1);
            assert.strictEqual(test_id_1,res._id);
        })
    });
    describe("#addVerification", function (){
        it('should add verification points to a post', async function () {
            const res = await AddVerification(test_id_1)(5);
            const post = await PostFind(test_id_1);
            assert.strictEqual(post.verification,6)
        })
    });
    describe("#getAllPost", function (){
        it('should return an array of size 2', async function () {
            await PostInsert(test_post_2);
            const posts = await PostGet();
            const size = posts.length;
            assert.strictEqual(size,2);
        })
    });
    describe("#removePost", function (){
        it('it should remove the specified post', async function () {
            await PostRemove(test_id_2);
            const posts = await PostGet();
            const size = posts.length;
            assert.strictEqual(size,1);
        })
    });
});