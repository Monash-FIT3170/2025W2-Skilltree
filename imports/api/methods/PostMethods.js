import { Meteor } from 'meteor/meteor';
import { PostCollection } from '/imports/api/collections/PostCollection'; // Post collection
import { PostSchema } from '/imports/api/schemas/PostSchema'; // Post schema

Meteor.methods({
    // method to insert a post
    // returns ID of post or null
    async insertPost(post){
        try{
            // validate post
            PostSchema.validate(post);
        } catch(error) {
            console.log("Invalid post")
            return null
        }
   
        // insert post into collection
        return await PostCollection.insertAsync(post);
    },

    // find a post by ID
    // returns document object or null
    async findPostID(post_id){
        return await PostCollection.findOneAsync({_id: post_id});
    },

    // get all posts as an array 
    async getAllPost(){
        return await PostCollection.find({}).fetchAsync();
    },

    // add verification points to a post
    async addVerification(post_id,points){
        const post = await self.findPostID(post_id);

        if (post){
            return await PostCollection.updateAsync(post_id, {
                $set: {verification: post.verification + points}}
            )
        }
    },
})