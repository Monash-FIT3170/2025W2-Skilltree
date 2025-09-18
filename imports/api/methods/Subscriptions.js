import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';
import { SubscriptionsCollection } from '/imports/api/collections/Subscriptions';

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
    console.log(
      'saveSubscription called, progressTreeNodes at start: ',
      progressTreeNodes
    );
    check(skillTreeId, String);
    if (progressTreeNodes !== null) check(progressTreeNodes, [Object]);
    if (progressTreeEdges !== null) check(progressTreeEdges, [Object]);
    if (totalXp !== null) check(totalXp, Number);

    //Get template tree for unsubscribed user
    const baseTree = await SkillTreeCollection.findOneAsync({
      _id: skillTreeId
    });

    const existing = await SubscriptionsCollection.findOneAsync({
      userId: this.userId,
      skillTreeId
    });

    if (existing) {
      console.log('updating existing subscription');
      const newTotalXp = totalXp !== null ? totalXp : existing.totalXp;

      const updated = { active: true, totalXp: newTotalXp };
      if (progressTreeNodes) {
        updated.skillNodes = progressTreeNodes;
      }
      if (progressTreeEdges) {
        updated.skillEdges = progressTreeEdges;
      }

      return await SubscriptionsCollection.updateAsync(
        { userId: this.userId, skillTreeId: skillTreeId },
        {
          $set: updated,
          $addToSet: {
            roles: { $each: ['user', 'expert'] }
          }
        }
      );
    } else {
      console.log('creating new subscription');
      if (progressTreeNodes == null && progressTreeEdges == null) {
        progressTreeNodes = baseTree.skillNodes;
        progressTreeEdges = baseTree.skillEdges;
      }
      return await SubscriptionsCollection.insertAsync({
        userId: this.userId,
        skillTreeId,
        skillNodes: progressTreeNodes,
        skillEdges: progressTreeEdges,
        totalXp: 0,
        roles: ['user'],
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
  },

  async updateSkillTreeProgress(skillTreeId, userId, updateOperation) {
    console.log('updateSkillTreeProgress called');
    check(skillTreeId, String);
    check(userId, String);
    check(updateOperation, Object);

    const existing = await SubscriptionsCollection.findOneAsync({
      userId: userId,
      skillTreeId
    });

    if (!existing) {
      throw new Meteor.Error('user-does-not-exist', 'User does not exist!');
    }

    if (existing) {
      return await SubscriptionsCollection.updateAsync(
        { userId: userId, skillTreeId: skillTreeId },
        updateOperation
      );
    }
  }
});
