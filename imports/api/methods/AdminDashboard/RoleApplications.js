import { Meteor } from 'meteor/meteor';
import { RoleApplicationCollection } from '/imports/api/collections/RoleApplications';
import { SkillTreeProgressCollection } from '/imports/api/collections/SkillTreeProgress';

Meteor.methods({
  async approveRoleApplication(applicationId, skillTreeId) {
    //Check if the current user has admin privileges
    if (!this.userId) {
      throw new Meteor.Error(
        'not-authorised',
        'Must be logged in before proceeding!'
      );
    }

    //Permission check: To be able to save community info changes for a member, you need to be an admin of this skilltree community
    const currentAdminProgress = await SkillTreeProgressCollection.findOneAsync(
      {
        userId: this.userId,
        skillTreeId: skillTreeId
      }
    );

    if (
      !currentAdminProgress ||
      !currentAdminProgress.roles.includes('admin')
    ) {
      throw new Meteor.Error(
        'insufficient-permissions',
        'You do not have permission to edit user roles'
      );
    }

    return RoleApplicationCollection.updateAsync(applicationId, {
      $set: {
        status: 'approved',
        updatedAt: new Date()
      }
    });
  },

  async rejectRoleApplication(applicationId, skillTreeId) {
    //Check if the current user has admin privileges
    if (!this.userId) {
      throw new Meteor.Error(
        'not-authorised',
        'Must be logged in before proceeding!'
      );
    }

    //Permission check: To be able to save community info changes for a member, you need to be an admin of this skilltree community
    const currentAdminProgress = await SkillTreeProgressCollection.findOneAsync(
      {
        userId: this.userId,
        skillTreeId: skillTreeId
      }
    );

    if (
      !currentAdminProgress ||
      !currentAdminProgress.roles.includes('admin')
    ) {
      throw new Meteor.Error(
        'insufficient-permissions',
        'You do not have permission to edit user roles'
      );
    }

    return RoleApplicationCollection.updateAsync(applicationId, {
      $set: {
        status: 'rejected',
        updatedAt: new Date()
      }
    });
  }
});
