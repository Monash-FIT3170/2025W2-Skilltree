import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';

Meteor.methods({
  'accounts.forgotPassword'(options) {
    check(options, { email: String });

    // Use Meteor's built-in forgotPassword
    return Accounts.forgotPassword(options);
  }
});
