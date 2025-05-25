import { Meteor } from 'meteor/meteor';
import { Regex } from '/imports/utils/Regex';

Meteor.methods({
  async validateStep2(userOptions) {
    //Validate the password:
    if (!Regex.password.test(userOptions.password)) {
      throw new Meteor.Error(
        'invalid-password',
        `Password is invalid:
      - Minimum 8 characters
      - Maximum 64 characters
      - Must include uppercase, lowercase, number, and special character`
      );
    }

    return { success: true };
  }
});
