import { Meteor } from 'meteor/meteor';
import { Regex } from '/imports/utils/Regex';

Meteor.methods({
  async validateStep3(userOptions) {
    const errors = {};

    // Validate given name
    if (
      !userOptions.profile.givenName ||
      !Regex.name.test(userOptions.profile.givenName)
    ) {
      errors.givenName =
        'First name invalid: Use only letters, hyphens, apostrophes, and spaces.';
    }

    // Validate family name
    if (
      !userOptions.profile.familyName ||
      !Regex.name.test(userOptions.profile.familyName)
    ) {
      errors.familyName =
        'Last name invalid: Use only letters, hyphens, apostrophes, and spaces.';
    }

    // Validate date of birth
    const dob = new Date(userOptions.profile.dateOfBirth);
    const today = new Date();

    if (isNaN(dob.getTime())) {
      errors.dateOfBirth = 'Date of birth is not a valid date.';
    } else if (dob > today) {
      errors.dateOfBirth = 'Date of birth cannot be in the future.';
    }

    if (Object.keys(errors).length > 0) {
      return { success: false, errors };
    }

    return { success: true };
  }
});
