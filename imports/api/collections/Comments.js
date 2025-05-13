// imports/api/collections/Comments.js
import { Mongo } from 'meteor/mongo';
// import { check } from 'meteor/check';

// Create the Comments collection
export const CommentsCollection = new Mongo.Collection('comments');



// // Allow client-side operations if needed
// // Note: Usually you would control this through methods for security
// if (Meteor.isServer) {
//   // Publishing the collection is done in publications.js
//   // This space can be used for server-only logic
// }