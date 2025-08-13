import { Meteor } from 'meteor/meteor';
import { SkillTreeProgressCollection } from '/imports/api/collections/SkillTreeProgress';
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

  async saveSkillTreeProgress(
    skillTreeId,
    progressTreeNodes,
    progressTreeEdges
  ) {
    check(skillTreeId, String);
    check(progressTreeNodes, [Object]);
    check(progressTreeEdges, [Object]);

    const existing = await SkillTreeProgressCollection.findOneAsync({
      userId: this.userId,
      skillTreeId
    });

    if (existing) {
      return await SkillTreeProgressCollection.updateAsync(
        { userId: this.userId, communityId: skillTreeId },
        {
          $set: {
            skillNodes: progressTreeNodes,
            skillEdges: progressTreeEdges
          }
        }
      );
    } else {
      return await SkillTreeProgressCollection.insertAsync({
        userId: this.userId,
        skillTreeId,
        skillNodes: progressTreeNodes,
        skillEdges: progressTreeEdges
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
      return SkillTreeProgressCollection.remove(skillTreeId);
    } else {
      return null;
    }
  }
});
