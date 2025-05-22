import SimpleSchema from 'meteor/aldeed:simple-schema';
import { Schemas } from '/imports/api/Schemas';
import { PostCollection } from '/imports/api/collections/PostCollection';

// Nested schema
import '/imports/api/schemas/Comments'; // comments
import '/imports/api/schemas/Proof'; // proof

Schemas.Post = new SimpleSchema({
  title: {
    type: String,
    label: 'Post Title',
    min: 1,
    max: 300
  },
  description: {
    type: String,
    label: 'Post description',
    max: 1000,
    optional: true
  },
  verification: {
    type: SimpleSchema.Integer,
    label: 'Verification points'
  },
  user: {
    type: String, // placeholder
    label: 'User who submitted post'
  },
  date: {
    type: Date,
    label: 'Date post was made'
  },
  proof: {
    type: Schemas.Proof, // placeholder
    label: 'Proof of practice'
  },
  comments: {
    type: Array, 
    label: 'Post comments',
    optional: true,
    defaultValue: [],
  },
  'comments.$': {
    type: Schemas.Comments, // comments schema
    label: 'Comment',
  },
});

PostCollection.attachSchema(Schemas.Post);
