import { Meteor } from 'meteor/meteor';
import { passwordRegex } from '/imports/api/Regex';

Meteor.methods({
  async validateStep2(userOptions) {
    console.log(userOptions);

    //Validate the password:
    if (!passwordRegex.test(userOptions.password)) {
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
