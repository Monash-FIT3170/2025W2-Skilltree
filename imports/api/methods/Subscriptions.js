import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';
import { SubscriptionsCollection } from '/imports/api/collections/Subscriptions';

// TODO: POSTING A PROOF AUTO-SUBSCRIBES YOU FOR SOME REASON BUT THIS DOESN'T UPDATE ON THE SUBSCRIBE BUTTON
Meteor.methods({
  async getSubscription(skilltreeId) {
    check(skilltreeId, String);
    const existing = await SubscriptionsCollection.findOneAsync({
      userId: this.userId,
      skilltreeId
    });

    if (existing) {
      return existing;
    } else {
      return null;
    }
  },

  async saveSubscription(
    skilltreeId,
    progressTreeNodes = null,
    progressTreeEdges = null,
    totalXp = null
  ) {
    console.log(
      'saveSubscription called, progressTreeNodes at start: ',
      progressTreeNodes
    );
    check(skilltreeId, String);
    if (progressTreeNodes !== null) check(progressTreeNodes, [Object]);
    if (progressTreeEdges !== null) check(progressTreeEdges, [Object]);
    if (totalXp !== null) check(totalXp, Number);

    //Get template tree for unsubscribed user
    const baseTree = await SkillTreeCollection.findOneAsync({
      _id: skilltreeId
    });

    const existing = await SubscriptionsCollection.findOneAsync({
      userId: this.userId,
      skilltreeId
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
        { userId: this.userId, skilltreeId: skilltreeId },
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
        skilltreeId,
        skillNodes: progressTreeNodes,
        skillEdges: progressTreeEdges,
        totalXp: 0,
        roles: ['user'],
        numComments: 0,
        active: true
      });
    }
  },

  async removeSubscription(skilltreeId) {
    check(skilltreeId, String);
    const existing = await SubscriptionsCollection.findOneAsync({
      userId: this.userId,
      skilltreeId
    });

    if (existing) {
      return await SubscriptionsCollection.updateAsync(
        { userId: this.userId, skilltreeId: skilltreeId },
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

  async incrementXP(skilltreeId, sign) {
    check(skilltreeId, String);
    const existing = await SubscriptionsCollection.findOneAsync({
      userId: this.userId,
      skilltreeId
    });

    if (existing) {
      return await SubscriptionsCollection.updateAsync(
        { userId: this.userId, skilltreeId: skilltreeId },
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

  async updateSkillTreeProgress(skilltreeId, userId, updateOperation) {
    console.log('updateSkillTreeProgress called');
    check(skilltreeId, String);
    check(userId, String);
    check(updateOperation, Object);

    const existing = await SubscriptionsCollection.findOneAsync({
      userId: userId,
      skilltreeId
    });

    if (!existing) {
      throw new Meteor.Error('user-does-not-exist', 'User does not exist!');
    }

    if (existing) {
      return await SubscriptionsCollection.updateAsync(
        { userId: userId, skilltreeId: skilltreeId },
        updateOperation
      );
    }
  }
});
