import { Meteor } from 'meteor/meteor';
import { SkillForestCollection } from '/imports/api/collections/SkillForest';
import { check } from 'meteor/check';
import { SubscriptionsCollection } from '../collections/Subscriptions';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';

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

  async updateSkillforestSkilltreeIds(skillforestId, newSkilltreeIds) {
    check(skillforestId, String);
    check(newSkilltreeIds, [String]);
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
  },

  async subscribeToSkillForest(skillForestId) {
    check(skillForestId, String);

  if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    const skillForest = await SkillForestCollection.findOneAsync(skillForestId);
    if (!skillForest) {
      throw new Meteor.Error('skill-forest-not-found');
    }

    let subscriptionsCreated = 0;

  // Subscribe to the SkillForest
  await Meteor.callAsync('updateSubscribedCommunities', skillForestId);

    if (skillForest.skilltreeIds && skillForest.skilltreeIds.length > 0) {
      for (const skillTreeId of skillForest.skilltreeIds) {

      // Check if user is already subscribed to this specific skill tree
        const skillTree = await SkillTreeCollection.findOneAsync(skillTreeId);

          if (skillTree && (!skillTree.subscribers ||
            !skillTree.subscribers.includes(this.userId))) {

          // Add user to SkillTree subscribers array
          await SkillTreeCollection.updateAsync(
            { _id: skillTreeId },
            {
              $addToSet: { subscribers: this.userId },
              $set: { updatedAt: new Date() }
            }
          );

          // Update user profile
          await Meteor.callAsync('updateSubscribedCommunities', skillTreeId);

          // Create subscription entry
          await Meteor.callAsync('saveSubscription', skillTreeId);

          subscriptionsCreated++;
        } else {
          console.log('Already subscribed to:', skillTreeId);
        }
      }
    }


  return {
    success: true,
    message: subscriptionsCreated > 0
      ? `Subscribed to ${subscriptionsCreated} new skill trees in the forest`
          : 'Already subscribed to all skill trees in this forest'
    };
  },

  // Unsubscribe from a SkillForest
  async unsubscribeFromSkillForest(skillForestId) {
    check(skillForestId, String);
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    const skillForest = await SkillForestCollection.findOneAsync(skillForestId);
    if (!skillForest) {
      throw new Meteor.Error('skill-forest-not-found');
    }

    let unsubscriptions = 0;

    // Unsubscribe from the SkillForest itself
    await Meteor.callAsync('removeSubscribedCommunities', skillForestId);

    // Unsubscribe from all skill trees in the forest
    if (skillForest.skilltreeIds && skillForest.skilltreeIds.length > 0) {
      for (const skillTreeId of skillForest.skilltreeIds) {

        const skillTree = await SkillTreeCollection.findOneAsync(skillTreeId);

        if (skillTree && skillTree.subscribers && skillTree.subscribers.includes(this.userId)) {
          
          await SkillTreeCollection.updateAsync(
            { _id: skillTreeId },
            {
              $pull: { subscribers: this.userId },
              $set: { updatedAt: new Date() }
            }
          );

          await Meteor.callAsync('removeSubscribedCommunities', skillTreeId);

          await SubscriptionsCollection.removeAsync({
            userId: this.userId,
            skillTreeId: skillTreeId
          });

          unsubscriptions++;
        } else {
          console.log('Not subscribed to:', skillTreeId);
        }
      }
    }

    return {
      success: true
    };
  }
});