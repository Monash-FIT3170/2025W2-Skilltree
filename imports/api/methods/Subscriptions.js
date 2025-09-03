import { Meteor } from 'meteor/meteor';
import { SubscriptionsCollection } from '/imports/api/collections/Subscriptions';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';
import { check } from 'meteor/check';

// TODO: POSTING A PROOF AUTO-SUBSCRIBES YOU FOR SOME REASON BUT THIS DOESN'T UPDATE ON THE SUBSCRIBE BUTTON
Meteor.methods({
  async getSubscription(skillTreeId) {
    check(skillTreeId, String);
    const existing = await SubscriptionsCollection.findOneAsync({
      userId: this.userId,
      skillTreeId
    });

    if (existing) {
      return existing;
    } else {
      return null;
    }
  },

  async saveSubscription(
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

    const existing = await SubscriptionsCollection.findOneAsync({
      userId: this.userId,
      skillTreeId
    });

    if (existing) {
      const newTotalXp = totalXp !== null ? totalXp : existing.totalXp;

      return await SubscriptionsCollection.updateAsync(
        { userId: this.userId, skillTreeId: skillTreeId },
        {
          $set: {
            skillNodes: progressTreeNodes,
            skillEdges: progressTreeEdges,
            active: true,
            totalXp: newTotalXp
          }
        }
      );
    } else {
      return await SubscriptionsCollection.insertAsync({
        userId: this.userId,
        skillTreeId,
        skillNodes: progressTreeNodes,
        skillEdges: progressTreeEdges,
        totalXp: 0,
        numComments: 0,
        active: true
      });
    }
  },

  async removeSubscription(skillTreeId) {
    check(skillTreeId, String);
    const existing = await SubscriptionsCollection.findOneAsync({
      userId: this.userId,
      skillTreeId
    });

    if (existing) {
      return await SubscriptionsCollection.updateAsync(
        { userId: this.userId, skillTreeId: skillTreeId },
        {
          $set: {
            active: false
          }
        }
      );
    } else {
      return null;
    }
  },

  async incrementXP(skillTreeId, sign) {
    check(skillTreeId, String);
    const existing = await SubscriptionsCollection.findOneAsync({
      userId: this.userId,
      skillTreeId
    });

    if (existing) {
      return await SubscriptionsCollection.updateAsync(
        { userId: this.userId, skillTreeId: skillTreeId },
        {
          $inc: {
            totalXp: sign * 1
          }
        }
      );
    } else {
      return null;
    }
  }
});
