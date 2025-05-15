import { Meteor } from 'meteor/meteor';
import { fullNameRegex } from '/imports/api/Schemas';

Meteor.methods({
  async validateUserPersonal(userOptions) {
    console.log(userOptions);

    //Validate the fullname
    if (!fullNameRegex.test(userOptions.profile.fullName)) {
      throw new Meteor.Error(
        'invalid-fullname',
        'The input full name is invalid!'
      );
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

    //Validate the bio
    if (userOptions.profile.bio && userOptions.profile.bio.length > 200) {
      throw new Meteor.Error(
        'invalid-bio',
        'Bio exceeds word limit: 300 characters!'
      );
    }

    return { success: true };
  }
});
