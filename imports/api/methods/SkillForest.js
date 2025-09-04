import { Meteor } from 'meteor/meteor';
import { SkillForestCollection } from '/imports/api/collections/SkillForest';
import { check } from 'meteor/check';

Meteor.methods({
  async insertSkillforest(skillforest) {
    check(skillforest, {
      title: String,
      description: String,
      skilltreeIds: [String]
    });
    // Attach owner field only if userId exists
    const userId = this.userId;
    const skillforestWithOwner = userId ? { ...skillforest, owner: userId } : skillforest;
    return await SkillForestCollection.insertAsync(skillforestWithOwner);
  },

  async getSkillforest(skillforestId) {
    const skillforest = await SkillForestCollection.findOneAsync({
      _id: skillforestId
    });
    if (this.userId && !skillforest) {
      throw new Meteor.Error(
        'skillforest-not-found',
        'SkillForest not found for ID: ' + skillforestId
      );
    }
    return skillforest;
  },

  async updateSkillforestTitle(skillforestId, newTitle) {
    check(skillforestId, String);
    check(newTitle, String);
    if (!this.userId) throw new Meteor.Error('not-authorized');
    return await SkillForestCollection.updateAsync(
      { _id: skillforestId },
      { $set: { title: newTitle } }
    );
  },

  async updateSkillforestDescription(skillforestId, newDescription) {
    check(skillforestId, String);
    check(newDescription, String);
    if (!this.userId) throw new Meteor.Error('not-authorized');
    return await SkillForestCollection.updateAsync(
      { _id: skillforestId },
      { $set: { description: newDescription } }
    );
  },

  async updateSkillforestSkilltreeIds(skillforestId, newSkilltreeIds) {
    check(skillforestId, String);
    check(newSkilltreeIds, [String]);
    if (!this.userId) throw new Meteor.Error('not-authorized');
    return await SkillForestCollection.updateAsync(
      { _id: skillforestId },
      { $set: { skilltreeIds: newSkilltreeIds } }
    );
  },

  async updateUserCreatedCommunities(skillforestId) {
    check(skillforestId, String);
    const userId = this.userId;
    if (!userId) throw new Meteor.Error('not-authorized');
    await Meteor.users.updateAsync(userId, {
      $addToSet: { 'profile.createdCommunities': skillforestId }
    });
    return true;
  }
});
