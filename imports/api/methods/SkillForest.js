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
    const skillforestWithOwner = userId
      ? { ...skillforest, owner: userId }
      : skillforest;
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
    return await SkillForestCollection.updateAsync(
      { _id: skillforestId },
      { $set: { title: newTitle } }
    );
  },

  async updateSkillforestDescription(skillforestId, newDescription) {
    check(skillforestId, String);
    check(newDescription, String);
    return await SkillForestCollection.updateAsync(
      { _id: skillforestId },
      { $set: { description: newDescription } }
    );
  },

  async updateSkillforestskilltreeIds(skillforestId, newskilltreeIds) {
    check(skillforestId, String);
    check(newskilltreeIds, [String]);
    return await SkillForestCollection.updateAsync(
      { _id: skillforestId },
      { $set: { skilltreeIds: newskilltreeIds } }
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
