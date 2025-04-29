import { Mongo, ObjectId } from 'meteor/mongo';

// Create & export a new MongoDB collection named 'post'
const PostCollection = new Mongo.Collection('post');

// Post Validation
// title, description, score, user, date, evidence_id
const validatePost = (post) => {
    if (!post.title) {
        console.log("Invalid title!\nTitle should not be empty");
        return false;
    }
    if (!post.user) {
        console.log("Invalid user!\nUser should not be empty");
        return false;
    }
    if (!post.date) {
        console.log("Invalid date!\nDate should not be empty");
    }
    return true;
}

// Post insertion
const insertPost = (post) => {
    if (validatePost(post)){
        PostCollection.insert(
            {
                _id: new ObjectId(),
                title: post.title,
                description: post.description,
                score: 0,
                user: post.user,
                date: post.date,
                evidence: post.evidence,
            }
        )
        return _id
    }
}

export default PostCollection;
