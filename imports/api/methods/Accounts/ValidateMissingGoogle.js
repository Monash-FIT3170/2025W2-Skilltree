import { Meteor } from 'meteor/meteor';
import { Regex } from '/imports/utils/Regex';

/*
Validates the following fields that are apart of our schema, but not in googles:
1. username
2. dateofBirth
*/

Meteor.methods({
  async validateMissingGoogleFields(userOptions) {
    const errors = {};

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

    // Validate the date of birth
    const dob = new Date(userOptions.profile.dateOfBirth);
    const today = new Date();

    if (isNaN(dob.getTime())) {
      errors.dateOfBirth = 'Date of birth is not a valid date.';
    } else if (dob > today) {
      errors.dateOfBirth = 'Date of birth cannot be in the future.';
    }

    // If any errors exist, return them
    if (Object.keys(errors).length > 0) {
      return { success: false, errors };
    }

    return { success: true };
  }
});
