import { Mongo } from 'meteor/mongo';

// Create & export a new MongoDB collection for SkillTrees
export const SkillTreeCollection = new Mongo.Collection('skilltrees');
