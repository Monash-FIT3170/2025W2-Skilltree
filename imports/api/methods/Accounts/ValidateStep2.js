import { Meteor } from 'meteor/meteor';
import { Regex } from '/imports/utils/Regex';

Meteor.methods({
  async validateStep2(userOptions) {
    const errors = {};
    //Validate the password:
    if (!Regex.password.test(userOptions.password)) {
      errors.password = `Password is invalid:
                        - Minimum 8 characters
                        - Maximum 64 characters
                        - Must include uppercase, lowercase, number, and special character`;
    }

    if (Object.keys(errors).length > 0) {
      return { success: false, errors };
    }

    return { success: true };
  }
});
