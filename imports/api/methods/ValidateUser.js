import { Meteor } from 'meteor/meteor';
import { emailRegex, passwordRegex, userNameRegex } from '/imports/api/Schemas';

Meteor.methods({
  async validateNewUser(userOptions) {
    console.log(userOptions);

    //Validate the email:
    if (!emailRegex.test(userOptions.email)) {
      throw new Meteor.Error(
        'invalid-email',
        'The input email format is invalid!'
      );
    }

    //Check if the email has already been in use:
    const existingEmail = await Meteor.users.findOneAsync({
      'emails.address': userOptions.email
    });

    if (existingEmail) {
      throw new Meteor.Error(
        'already-in-use-email',
        'This email has already been used!'
      );
    }

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

    return { success: true };
  }
});
