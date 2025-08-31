import { Meteor } from 'meteor/meteor';
import { SkillTreeProgressCollection } from '/imports/api/collections/SkillTreeProgress';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';
import { check } from 'meteor/check';

Meteor.methods({
  async getSkillTreeProgress(skillTreeId) {
    check(skillTreeId, String);
    const existing = await SkillTreeProgressCollection.findOneAsync({
      userId: this.userId,
      skillTreeId
    });

    if (existing) {
      return existing;
    } else {
      return null;
    }
  },

  async getAllSkillTreeProgress(skillTreeId) {
    check(skillTreeId, String);

    return SkillTreeProgressCollection.find({
      skillTreeId: skillTreeId
    }).fetchAsync();
  },

  async saveSkillTreeProgress(
    skillTreeId,
    progressTreeNodes = null,
    progressTreeEdges = null,
    totalXp = null
  ) {
    check(skillTreeId, String);
    if (progressTreeNodes !== null) check(progressTreeNodes, [Object]);
    if (progressTreeEdges !== null) check(progressTreeEdges, [Object]);
    if (totalXp !== null) check(totalXp, Number);

    //Get template tree for unsubscribed user
    const baseTree = await SkillTreeCollection.findOneAsync({
      _id: skillTreeId
    });
    if (progressTreeNodes == null && progressTreeEdges == null) {
      progressTreeNodes = baseTree.skillNodes;
      progressTreeEdges = baseTree.skillEdges;
    }

    const existing = await SkillTreeProgressCollection.findOneAsync({
      userId: this.userId,
      skillTreeId
    });

    if (existing) {
      const newTotalXp = totalXp !== null ? totalXp : existing.totalXp;

      return await SkillTreeProgressCollection.updateAsync(
        { userId: this.userId, skillTreeId: skillTreeId },
        {
          $set: {
            skillNodes: progressTreeNodes,
            skillEdges: progressTreeEdges,
            totalXp: newTotalXp
          }
        }
      );
    } else {
      return await SkillTreeProgressCollection.insertAsync({
        userId: this.userId,
        skillTreeId,
        skillNodes: progressTreeNodes,
        skillEdges: progressTreeEdges,
        totalXp: 0
      });
    }
  },

  async removeSkillTreeProgress(skillTreeId) {
    check(skillTreeId, String);
    const existing = await SkillTreeProgressCollection.findOneAsync({
      userId: this.userId,
      skillTreeId
    });

    if (existing) {
      // Corrected remove query: remove by userId and skillTreeId
      return await SkillTreeProgressCollection.removeAsync({
        userId: this.userId,
        skillTreeId: skillTreeId
      });
    } else {
      return null;
    }
  }
});
