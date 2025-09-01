import SimpleSchema from 'meteor/aldeed:simple-schema';
import { Schemas } from '/imports/api/Schemas';
import { SubscriptionsCollection } from '../collections/Subscriptions';

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
  netUpvotesRequired: {
    type: Number,
    label: 'Net Upvotes Required to complete this skill',
    optional: true,
    defaultValue: 0
  },
  currentNetUpvotes: {
    type: Number,
    label: 'Current Net Upvotes',
    optional: true,
    defaultValue: 0
  },
  xpPoints: {
    type: Number,
    label: 'XP Points earned for completing this skill',
    optional: true,
    defaultValue: 0
  },
  proofId: {
    type: String,
    label: 'ID of the corresponding proof object for this skill',
    optional: true
  },
  verified: {
    type: Boolean,
    label: 'True if the proof for this skill has been verified',
    optional: true,
    defaultValue: false
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
    type: skillDataSchema,
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
Schemas.Subscription = new SimpleSchema({
  userId: {
    type: Number,
    label: 'Unique User ID'
  },
  skillTreeId: {
    type: Number,
    label: 'Unique Skill Tree ID'
  },
  active: {
    type: Boolean,
    label: 'Is Active',
    defaultValue: true
  },
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
  totalXp: {
    type: Number,
    label: 'Total XP Points earned by the user for this skilltree',
    defaultValue: 0
  },
  numComments: {
    type: Number,
    label:
      'Total number of comments made on pending proofs by the user for this skilltree',
    defaultValue: 0
  }
});

SubscriptionsCollection.attachSchema(Schemas.Subscription);
