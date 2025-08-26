import { Meteor } from 'meteor/meteor';
import { SubscriptionCollection } from '/imports/api/collections/Subscription';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';
import { check } from 'meteor/check';

Meteor.methods({
  async getSubscription(skillTreeId) {
    check(skillTreeId, String);
    const existing = await SubscriptionCollection.findOneAsync({
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
    progressTreeEdges = null
  ) {
    check(skillTreeId, String);
    if (progressTreeNodes !== null) check(progressTreeNodes, [Object]);
    if (progressTreeEdges !== null) check(progressTreeEdges, [Object]);

    //Get template tree for unsubscribed user
    const baseTree = await SkillTreeCollection.findOneAsync({
      _id: skillTreeId
    });
    if (progressTreeNodes == null && progressTreeEdges == null) {
      progressTreeNodes = baseTree.skillNodes;
      progressTreeEdges = baseTree.skillEdges;
    }

    const existing = await SubscriptionCollection.findOneAsync({
      userId: this.userId,
      skillTreeId
    });

    if (existing) {
      return await SubscriptionCollection.updateAsync(
        { userId: this.userId, skillTreeId: skillTreeId },
        {
          $set: {
            skillNodes: progressTreeNodes,
            skillEdges: progressTreeEdges
          }
        }
      );
    } else {
      return await SubscriptionCollection.insertAsync({
        userId: this.userId,
        skillTreeId,
        skillNodes: progressTreeNodes,
        skillEdges: progressTreeEdges
      });
    }
  },

  async removeSubscription(skillTreeId) {
    check(skillTreeId, String);
    const existing = await SubscriptionCollection.findOneAsync({
      userId: this.userId,
      skillTreeId
    });

    if (existing) {
      // Corrected remove query: remove by userId and skillTreeId
      return await SubscriptionCollection.removeAsync({
        userId: this.userId,
        skillTreeId: skillTreeId
      });
    } else {
      return null;
    }
  }
});
