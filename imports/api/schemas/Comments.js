import SimpleSchema from 'meteor/aldeed:simple-schema';
import { Schemas } from '/imports/api/Schemas';
import { CommentsCollection } from '/imports/api/collections/Comments';

// Define the schema for the CommentsCollection using SimpleSchema to Schemas (for reusability)
Schemas.Comments = new SimpleSchema({
  username: {
    type: String,
    label: 'Username',
    max: 50,
    min: 1
  },
  comment: {
    type: String,
    label: 'Comment text',
    max: 500, // Limit comment length
    min: 1
  },
  proofId: {
    type: String,
    label: 'Associated Proof ID',
    optional: true // If you want to associate comments with specific proofs
  },
  createdAt: {
    type: Date,
    label: 'Creation date',
    defaultValue: new Date()
  }
});

// Attach the defined schema (from Schemas) to the CommentsCollection
CommentsCollection.attachSchema(Schemas.Comments);
