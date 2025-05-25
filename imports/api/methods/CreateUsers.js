import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'; //we are using Meteor's account-base package. It gives us the ability to create new users

Meteor.methods({
  async createNewUser(userOptions) {
    try {
      //Create the new Skill Tree User
      const userID = await Accounts.createUserAsync(userOptions);
      return userID;
    } catch (error) {
      throw new Meteor.Error(
        'create-user-failed',
        error.reason || 'Creating New User Failed!'
      );
    }
  }
});
