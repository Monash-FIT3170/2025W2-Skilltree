import SimpleSchema from 'meteor/aldeed:simple-schema';
import { Schemas } from '/imports/api/Schemas';
import { TagsCollection } from '/imports/api/collections/Tags'; // TagsCollection

// Schema References (Nested/Dependencies)
import '/imports/api/schemas/Tags'; // Tags

// Define the schema for the TagsCollection using SimpleSchema to Schemas (for reusability)

Schemas.Tags = new SimpleSchema({
  tagname: {
    type: String,
    label: 'tag',
    max: 30,
    min: 3
  },
  type: {
    type: String,
    allowedValues: ['default', 'custom'],
    required: true
  }
});

// Attach the defined schema (from Schemas) to the SampleCollection
TagsCollection.attachSchema(Schemas.Tags);
