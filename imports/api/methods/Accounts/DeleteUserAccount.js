import { Meteor } from 'meteor/meteor';

Meteor.methods({
  async deleteUserAccount() {
    // Check if user is authenticated
    if (!this.userId) {
      throw new Meteor.Error(
        'not-authorised',
        'You must be logged in to delete your account.'
      );
    }

    try {
      // Find if the user account exists
      const userAccount = await Meteor.users.findOneAsync(this.userId);

      if (!userAccount) {
        throw new Meteor.Error(
          'account-not-found',
          'User account does not exist!'
        );
      }

      // Remove the user account
      await Meteor.users.removeAsync(this.userId);

      return { success: true, message: 'Account deleted successfully' };
    } catch (error) {
      if (error instanceof Meteor.Error) {
        throw error;
      }

      console.error('Error deleting user account:', error);
      throw new Meteor.Error(
        'deletion-failed',
        'Failed to delete account. Please try again.'
      );
    }
  }
});
