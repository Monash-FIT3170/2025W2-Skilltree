import { Meteor } from 'meteor/meteor';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';

//Method to search for SkillTree's/Communities using regex
Meteor.methods({
  searchSkillTrees(keyword) {
    if (!keyword) return SkillTreeCollection.find({}).fetch();

    const regex = new RegExp(keyword, 'i'); // not case sensitiv e

    return SkillTreeCollection.find({
      $or: [
        { title: { $regex: regex } },
        { description: { $regex: regex } },
        { tags: { $regex: regex } }
      ]
    }).fetch();
  }
});
