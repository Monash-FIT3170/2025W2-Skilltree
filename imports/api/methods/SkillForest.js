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
      ? { ...skillforest, owner: userId, subscribers: [userId]}
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

    // Subscribe to the SkillForest
    await Meteor.callAsync('updateSubscribedCommunities', skillForestId);
    await SkillForestCollection.updateAsync(
      { _id: skillForestId },
      {
        $addToSet: { subscribers: this.userId },
        $set: { updatedAt: new Date() }
      }
    );

    if (skillForest.skilltreeIds && skillForest.skilltreeIds.length > 0) {
      for (const skillTreeId of skillForest.skilltreeIds) {
        // Check if user is already subscribed to this specific skill tree
        const skillTree = await SkillTreeCollection.findOneAsync(skillTreeId);

        if (
          skillTree &&
          (!skillTree.subscribers ||
            !skillTree.subscribers.includes(this.userId))
        ) {
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
        } else {
          console.log('Already subscribed to:', skillTreeId);
        }
      }
    }

    return {
      success: true
    };
  },

  // Unsubscribe from a SkillForest
  async unsubscribeFromSkillForest(skillForestId, selectedTreeIds) {
    check(skillForestId, String);
    check(selectedTreeIds, [String]);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    const skillForest = await SkillForestCollection.findOneAsync(skillForestId);
    if (!skillForest) {
      throw new Meteor.Error('skill-forest-not-found');
    }

    // Unsubscribe from the SkillForest itself
    await Meteor.callAsync('removeSubscribedCommunities', skillForestId);
    await SkillForestCollection.updateAsync(
      { _id: skillForestId },
      {
        $pull: { subscribers: this.userId },
        $set: { updatedAt: new Date() }
      }
    );

    // Unsubscribe from selected skill trees in the forest
    if (skillForest.skilltreeIds && skillForest.skilltreeIds.length > 0) {
      for (const skillTreeId of selectedTreeIds) {
        const skillTree = await SkillTreeCollection.findOneAsync(skillTreeId);

        if (
          skillTree &&
          skillTree.subscribers &&
          skillTree.subscribers.includes(this.userId)
        ) {
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
