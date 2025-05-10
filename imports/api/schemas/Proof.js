import SimpleSchema from 'meteor/aldeed:simple-schema';
import { Schemas } from '/imports/api/Schemas';
import { ProofCollection } from '/imports/api/collections/Proof'; // ProofCollection

// Schema References (Nested/Dependencies)

// Define the schema for the authorSample using SimpleSchema to Schemas (for reusability)
Schemas.Proof = new SimpleSchema({
  title: {
    type: String,
    label: 'Title',
    max: 50
  },
  author: {
    type: String,
    label: 'Author'
  },
  communityId: {
    type: String,
    label: 'Community'
  },
  caption: {
    type: String,
    label: 'Caption',
    max: 200
  },
  link: {
    type: String,
    label: 'Link',
    max: 200
  },
  uploadedAt: {
    type: Date,
    label: 'Date uploaded'
  }
});

// Attach the schema
ProofCollection.attachSchema(Schemas.Proof);
