import SimpleSchema from 'meteor/aldeed:simple-schema';
import { Schemas } from '/imports/api/Schemas';

// Schema References (Nested/Dependencies)
import '/imports/api/schemas/AuthorSample'; // AuthorSample
import { ForumCollection } from '../collections/Forum';

Schemas.Message = new SimpleSchema({
  content: {
    type: String,
    label: 'Message Content',
    max: 1000
  },
  userId: {
    type: String,
    label: 'User ID'
  }
});

Schemas.Forum = new SimpleSchema({
  forumId: {
    type: Number,
    label: 'Forum ID',
    optional: true
  },
  title: {
    type: String,
    label: 'Title',
    max: 200
  },
  skillTreeName: {
    type: String,
    label: 'Skilltree Name'
  },
  messages: {
    type: Array,
    label: 'Messages',
    optional: true,
    defaultValue: []
  },
  'messages.$': {
    type: Schemas.Message,
    label: 'Message'
  }
});

// Attach the defined schema (from Schemas) to the SampleCollection
ForumCollection.attachSchema(Schemas.Forum);
