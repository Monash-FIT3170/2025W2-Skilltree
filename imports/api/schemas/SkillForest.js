import SimpleSchema from 'meteor/aldeed:simple-schema';
import { Schemas } from '/imports/api/Schemas';
import { SkillForestCollection } from '/imports/api/collections/SkillForest';

Schemas.SkillForest = new SimpleSchema({
  title: {
    type: String,
    label: 'SkillForest title',
    max: 200,
    min: 1
  },
  description: {
    type: String,
    label: 'SkillForest description',
    max: 1000,
    min: 1
  },
  skilltreeIds: {
    type: Array,
    label: 'List of skilltree IDs'
  },
  'skilltreeIds.$': String
});

SkillForestCollection.attachSchema(Schemas.SkillForest);
