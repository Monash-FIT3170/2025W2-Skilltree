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
  async findPostID(postId) {
    return await PostCollection.findOneAsync({ _id: postId });
  },

  // get all posts as an array
  async getAllPost() {
    return await PostCollection.find({}).fetchAsync();
  },

  // add verification points to a post
  async addVerification(postId, points) {
    const post = await PostCollection.findOneAsync({ _id: postId });

    if (post) {
      return await PostCollection.updateAsync(
        { _id: postId },
        {
          $inc: { verification: points }
        }
      );
    }
  },

  // remove specific post
  async removePost(postId) {
    const res = await PostCollection.removeAsync({ _id: postId });

    return res;
  },

  // remove all posts
  async removeAllPosts() {
    return await PostCollection.removeAsync({});
  }
});
