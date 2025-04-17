import { Mongo } from 'meteor/mongo';
import { Schemas } from '/imports/api/collections/Schemas'
import SimpleSchema from "meteor/aldeed:simple-schema";
import 'meteor/aldeed:collection2/static';

// This would be placed in its own authorSample.js file (demonstration)
Schemas.AuthorSample = new SimpleSchema({ author: String})

// Create & export a new MongoDB collection named 'sample'
export const SampleCollection = new Mongo.Collection('sample');

// Define the schema for the SampleCollection using SimpleSchema to Schemas (for reusability)
Schemas.Sample = new SimpleSchema({ // See https://github.com/Meteor-Community-Packages/meteor-simple-schema/?tab=readme-ov-file#schema-rules
    title: {
      type: String,
      label: 'Title',
      max: 200,
    },
    author: {
      type: String,
      label: 'Author',
    },
    copies: {
      type: SimpleSchema.Integer,
      label: 'Number of copies',
      min: 0,
    },
    lastCheckedOut: {
      type: Date,
      label: 'Last date this book was checked out',
      optional: true,
    },
    summary: {
      type: String,
      label: 'Brief summary',
      optional: true,
      max: 1000,
    },
    'author.$': { // Array of authors (another collection)
        type: Schemas.AuthorSample, // Reuse the schema defined for the AuthorCollection
        optional: true,
    },
  }); // Example from https://github.com/Meteor-Community-Packages/meteor-collection2

// Attach the defined schema (from Schemas) to the SampleCollection
SampleCollection.attachSchema(Schemas.Sample);