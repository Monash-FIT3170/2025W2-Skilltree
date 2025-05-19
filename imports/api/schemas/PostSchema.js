import SimpleSchema from 'meteor/aldeed:simple-schema';
import { Schemas } from '/imports/api/Schemas';
import { PostCollection } from '/imports/api/collections/PostCollection';

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
  evidence: {
    type: String, // placeholder
    label: 'Proof of practice'
  }
});

PostCollection.attachSchema(Schemas.Post);
