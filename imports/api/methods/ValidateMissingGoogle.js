import { Meteor } from 'meteor/meteor';
import { emailRegex, userNameRegex } from '/imports/api/Schemas';

Meteor.methods({
  async validateMissingGoogleFields(userOptions) {

    //Validate the username:
    if (!userNameRegex.test(userOptions.username)) {
      throw new Meteor.Error(
        'invalid-username',
        `Username is invalid
        -Minimum 3 characters
        -Maximum 20 characters
        -Can only contain lowercase, uppercase, digits, hyphens, underscores`
      );
    }

    const existingUsername = await Meteor.users.findOneAsync({
      username: userOptions.username
    });

    if (existingUsername) {
      throw new Meteor.Error('username-taken', 'Username is already in use');
    }

    //Validate the date of birth
    const dob = new Date(userOptions.profile.dateOfBirth);
    const today = new Date();

    if (isNaN(dob.getTime())) {
      throw new Meteor.Error(
        'invalid-dob',
        'Date of birth is not a valid date.'
      );
    }

    if (dob > today) {
      throw new Meteor.Error(
        'future-dob',
        'Date of birth cannot be in the future.'
      );
    }

    return { success: true };
  }
});
