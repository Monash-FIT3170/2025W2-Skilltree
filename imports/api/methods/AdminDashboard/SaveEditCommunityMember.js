import { Meteor } from 'meteor/meteor';
import { SkillTreeProgressCollection } from '/imports/api/collections/SkillTreeProgress';

Meteor.methods({
  async saveEditCommunityMemberModal(userId, skillTreeId, formData) {
    if (!this.userId) {
      throw new Meteor.Error(
        'not-authorised',
        'Must be logged in before proceeding!'
      );
    }

    /*
        SECTION 1: Updating roles in skilltreeprogress + skilltree role arrays
        */

    //Permission check: To be able to save community info changes for a member, you need to be an admin of this skilltree community
    const currentAdminProgress = await SkillTreeProgressCollection.findOneAsync(
      {
        userId: this.userId,
        communityId: skillTreeId
      }
    );
    console.log('LOL');
    console.log(currentAdminProgress);

    if (
      !currentAdminProgress ||
      !currentAdminProgress.roles.includes('admin')
    ) {
      throw new Meteor.Error(
        'insufficient-permissions',
        'You do not have permission to edit user roles'
      );
    }

    //Ensure that this formData.roles always HAS USER ROLE
    if (!formData.roles.includes('user')) {
      formData.roles.push('user');
    }

    //Find target user's skilltree progress for input skilltreeId
    const currentSkillTreeProgress =
      await SkillTreeProgressCollection.findOneAsync({
        userId: userId,
        communityId: skillTreeId
      });

    if (!currentSkillTreeProgress) {
      throw new Meteor.Error(
        'user-not-found',
        'User not found in this skill tree'
      );
    }

    //Update user's skilltreeprogress colllection
    await SkillTreeProgressCollection.updateAsync(
      { userId: userId, communityId: skillTreeId },
      { $set: { roles: formData.roles } }
    );

    return {
      success: true,
      message: 'All edit changes have been successfully updated!'
    };
  }
});
