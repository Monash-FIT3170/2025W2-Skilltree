import SimpleSchema from 'meteor/aldeed:simple-schema';
import { Schemas } from '/imports/api/Schemas';
import { ProofCollection } from '/imports/api/collections/Proof'; // ProofCollection

// Schema References (Nested/Dependencies)

// Define the schema for the Proof using SimpleSchema to Schemas (for reusability)
Schemas.Proof = new SimpleSchema({
  title: {
    type: String,
    label: 'Title',
    min: 1,
    max: 50
  },
  description: {
    type: String,
    label: 'Proof description',
    max: 1000,
    optional: true
  },
  user: {
    type: String, // placeholder
    label: 'User who submitted proof'
  },
  username: {
    type: String,
    label: 'Username of the user who submitted proof'
  },
  date: {
    type: Date,
    label: 'Date proof was made'
  },
  evidenceLink: {
    type: String,
    label: 'Link',
    max: 200
  },
  verification: {
    type: SimpleSchema.Integer,
    label: 'Verification points'
  },
  skillTreeId: {
    type: String,
    label: 'Skilltree'
  },
  subskill: {
    type: String,
    label: 'Sub-Skill',
    max: 1000,
    optional: true
  },
  upvotes: {
    type: SimpleSchema.Integer,
    defaultValue: 0,
    optional: true
  },
  downvotes: {
    type: SimpleSchema.Integer,
    defaultValue: 0,
    optional: true
  },
  upvoters: {
    type: Array,
    defaultValue: []
  },
  'upvoters.$': {
    type: String
  },
  downvoters: {
    type: Array,
    defaultValue: []
  },
  'downvoters.$': {
    type: String
  }
});

// Attach the schema
ProofCollection.attachSchema(Schemas.Proof);
