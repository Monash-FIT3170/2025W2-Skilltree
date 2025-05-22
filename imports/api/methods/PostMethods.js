import { Meteor } from 'meteor/meteor';
import { PostCollection } from '/imports/api/collections/PostCollection'; // Post collection

Meteor.methods({
  // method to insert a post
  // returns ID of post or null
  async insertPost(post) {
    // insert post into collection
    const res = await PostCollection.insertAsync(post);

    return res;
  },

  // find a post by ID
  // returns document object or null
  async findPostID(post_id) {
    return await PostCollection.findOneAsync({ _id: post_id });
  },

  // get all posts as an array
  async getAllPost() {
    return await PostCollection.find({}).fetchAsync();
  },

  // add verification points to a post
  async addVerification(post_id, points) {
    const post = await PostCollection.findOneAsync({ _id: post_id });

    if (post) {
      return await PostCollection.updateAsync(post_id, {
        $set: { verification: post.verification + points }
      });
    }
  },

  // remove specific post
  async removePost(post_id) {
    const res = await PostCollection.removeAsync({ _id: post_id });

    return res;
  },

  // remove all posts
  async removeAllPosts() {
    return await PostCollection.removeAsync({});
  }
});
