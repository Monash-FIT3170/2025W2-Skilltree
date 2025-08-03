import { Meteor } from 'meteor/meteor';
import { SkillForestCollection } from '/imports/api/collections/SkillForest';
import { Schemas } from '/imports/api/Schemas';
import { check } from 'meteor/check';

Meteor.methods({
  async 'skillforests.insert'(skillforest) {
    Schemas.SkillForest.validate(skillforest);
    return await SkillForestCollection.insertAsync(skillforest);
  },

  async 'skillforests.get'(skillforestId) {
    const skillforest = await SkillForestCollection.findOneAsync({
      _id: skillforestId
    });
    if (!skillforest) {
      throw new Meteor.Error(
        'skillforest-not-found',
        'SkillForest not found for ID: ' + skillforestId
      );
    }
    return skillforest;
  },

  async 'skillforests.updateTitle'(skillforestId, newTitle) {
    check(skillforestId, String);
    check(newTitle, String);
    return await SkillForestCollection.updateAsync(
      { _id: skillforestId },
      { $set: { title: newTitle } }
    );
  },

  async 'skillforests.updateDescription'(skillforestId, newDescription) {
    check(skillforestId, String);
    check(newDescription, String);
    return await SkillForestCollection.updateAsync(
      { _id: skillforestId },
      { $set: { description: newDescription } }
    );
  },

  async 'skillforests.updateSkilltreeIds'(skillforestId, newSkilltreeIds) {
    check(skillforestId, String);
    check(newSkilltreeIds, Array[String]);
    return await SkillForestCollection.updateAsync(
      { _id: skillforestId },
      { $set: { skilltreeIds: newSkilltreeIds } }
    );
  }
});
