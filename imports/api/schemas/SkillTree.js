import SimpleSchema from 'meteor/aldeed:simple-schema';
import { Schemas } from '/imports/api/Schemas';
import { SkillTreeCollection } from '../collections/SkillTree';

const skillDataSchema = new SimpleSchema({
  label: {
    type: String,
    label: 'Skill label',
    max: 200,
    min: 1
  },
  description: {
    type: String,
    label: 'Skill description',
    max: 1000,
    min: 1,
    optional: true
  },
  progressXp: {
    type: Number,
    label: 'Progress XP',
    optional: true,
    defaultValue: 0
  },
  xpPoints: {
    type: Number,
    label: 'XP Points',
    optional: true,
    defaultValue: 0
  },
  requirements: {
    type: String,
    label: 'Requirements to unlock this skill',
    max: 1000,
    min: 1,
    optional: true
  },
  onOpenEditor: {
    type: Function,
    label: 'Function to open the editor for this skill',
    optional: true
  }
});

const skillNodeSchema = new SimpleSchema({
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
    allowedValues: [
      'root',
      'input',
      'output',
      'default',
      'new-empty',
      'new-populated',
      'view-node-unlocked',
      'view-node-locked'
    ] // add our custom node types here
  },
  data: {
    type: skillDataSchema, // Probs have to change this to have skill name and description
    label: 'Skill data'
  },
  position: {
    type: Object,
    label: 'Node position'
  },
  'position.x': Number,
  'position.y': Number
});

const skillEdgeSchema = new SimpleSchema({
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
  title: {
    type: String,
    label: 'Title',
    max: 200,
    min: 1
  },
  image: {
    type: String,
    label: 'Image URL',
    regEx: SimpleSchema.RegEx.Url,
    optional: true
  },
  description: {
    type: String,
    label: 'Description',
    max: 1000,
    min: 1
  },
  termsAndConditions: {
    type: String,
    label: 'SkillTree terms and conditions',
    max: 1000,
    min: 1
  },
  tags: {
    type: Array,
    label: 'Tags for this SkillTree',
    optional: true
  },
  'tags.$': String,
  skillNodes: {
    type: Array,
    label: 'List of skill nodes'
  },
  'skillNodes.$': skillNodeSchema,
  skillEdges: {
    type: Array,
    label: 'List of skill edges'
  },
  'skillEdges.$': skillEdgeSchema,
  admins: {
    type: Array,
    label: 'User IDs of admins'
  },
  'admins.$': String,
  subscribers: {
    type: Array,
    label: 'User IDs of subscribers'
  },
  'subscribers.$': String
});

// Attach the defined schema (from Schemas) to the SkillTreeCollection
SkillTreeCollection.attachSchema(Schemas.SkillTree);
