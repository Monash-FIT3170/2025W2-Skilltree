import SimpleSchema from 'meteor/aldeed:simple-schema';
import { Schemas } from '/imports/api/Schemas';
import { SkillTreeCollection } from '../collections/SkillTree';

Schemas.SkillPositionSchema = new SimpleSchema({
  x: {
    type: Number,
    label: 'X Position',
    min: 0,
    max: 1000
  },
  y: {
    type: Number,
    label: 'Y Position',
    min: 0,
    max: 1000
  }
});

Schemas.SkillDataSchema = new SimpleSchema({
  label: {
    type: String,
    label: 'Skill label',
    max: 200,
    min: 1
  }
});

Schemas.SkillNode = new SimpleSchema({
  id: {
    type: String,
    label: 'Skill ID',
    max: 60,
    min: 1
  },
  type: {
    type: String,
    label: 'Skill type',
    optional: true,
    allowedValues: ['input', 'output', 'default'] // we can add our custom node type here
  },
  data: {
    type: Schemas.SkillDataSchema, // Probs have to change this to have skill name and description
    label: 'Skill data'
  },
  position: {
    type: Schemas.SkillPositionSchema,
    label: 'Node position'
  }
});

Schemas.SkillEdge = new SimpleSchema({
  id: {
    type: String,
    label: 'Edge ID',
    max: 60,
    min: 1
  },
  source: {
    type: String,
    label: 'Source node ID',
    max: 60,
    min: 1
  },
  target: {
    type: String,
    label: 'Target node ID',
    max: 60,
    min: 1
  },
  animated: {
    type: Boolean,
    label: 'Is animated',
    optional: true
  }
});

// Define the schema for the SkillTreeCollection using SimpleSchema to Schemas (for reusability)
Schemas.SkillTree = new SimpleSchema({
  id: {
    type: String,
    label: 'SkillTree ID',
    max: 60,
    min: 1
  },
  title: {
    type: String,
    label: 'Title',
    max: 200,
    min: 1
  },
  image: {
    type: String,
    label: 'Image URL',
    regEx: SimpleSchema.RegEx.Url
  },
  description: {
    type: String,
    label: 'Description',
    max: 1000,
    min: 1
  },
  termsAndConditions: {
    type: SimpleSchema.Integer,
    label: 'Number of copies',
    min: 0
  },
  'tags.$': {
    type: String,
    label: 'Tags for this SkillTree',
    optional: true
  },
  'skillNodes.$': {
    type: Schemas.SkillNode,
    label: 'List of skill nodes'
  },
  'skillEdges.$': {
    type: Schemas.SkillEdge,
    label: 'List of skill edges'
  }
});

// Attach the defined schema (from Schemas) to the SkillTreeCollection
SkillTreeCollection.attachSchema(Schemas.SkillTree);
