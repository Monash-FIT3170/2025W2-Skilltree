import SimpleSchema from 'meteor/aldeed:simple-schema';
import { Schemas } from '/imports/api/Schemas';
import { TagsCollection } from '/imports/api/collections/Tags'; // TagsCollection

// Schema References (Nested/Dependencies)
import '/imports/api/schemas/Tags'; // Tags

// Define the schema for the TagsCollection using SimpleSchema to Schemas (for reusability)
// See https://github.com/Meteor-Community-Packages/meteor-simple-schema/?tab=readme-ov-file#schema-rules
Schemas.Tags = new SimpleSchema({
  name: {
    type: String,
    label: 'tag',
    max: 30,
    min: 3
  },
  type: {
    type: String,
    enum: ['default', 'custom'],
    required: true
  }
}); // Example from https://github.com/Meteor-Community-Packages/meteor-collection2

// Attach the defined schema (from Schemas) to the SampleCollection
TagsCollection.attachSchema(Schemas.Tags);
