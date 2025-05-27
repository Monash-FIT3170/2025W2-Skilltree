import { Meteor } from 'meteor/meteor';
import { Regex } from '/imports/utils/Regex';

Meteor.methods({
  async validateStep1(userOptions) {
    const errors = {};

    // Validate the email
    if (!Regex.email.test(userOptions.email)) {
      errors.email = 'The input email format is invalid!';
    } else {
      const existingEmail = await Meteor.users.findOneAsync({
        'emails.address': userOptions.email
      });
      if (existingEmail) {
        errors.email = 'This email has already been used!';
      }
    }

    // Validate the username
    if (!Regex.username.test(userOptions.username)) {
      errors.username = `Username is invalid
                        - Minimum 3 characters
                        - Maximum 20 characters
                        - Can only contain lowercase, uppercase, digits, hyphens, underscores`;
    } else {
      const existingUsername = await Meteor.users.findOneAsync({
        username: userOptions.username
      });
      if (existingUsername) {
        errors.username = 'Username is already in use';
      }
    }

    if (Object.keys(errors).length > 0) {
      return { success: false, errors };
    }

    return { success: true };
  }
});
