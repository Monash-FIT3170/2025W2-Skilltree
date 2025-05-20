import { Meteor } from 'meteor/meteor';

Meteor.methods({
  async updateUserFields(user) {
    const userID = user._id;
    const userOnServer = await Meteor.users.findOneAsync(userID);

    const googleEmail = userOnServer?.services?.google?.email;
    const googleVerified = userOnServer?.services?.google?.verified_email;
    const givenName = userOnServer?.services?.google?.given_name;
    const familyName = userOnServer?.services?.google?.family_name;
    const dob = null;

    if (!googleEmail) {
      throw new Meteor.Error('missing-email', 'Google email is missing');
    }

    const updateFields = {
      username: userID, //default username will be your userid, user can change it later
      emails: [
        {
          address: googleEmail,
          verified: googleVerified || false
        }
      ],
      profile: {
        givenName: givenName,
        familyName: familyName,
        dateOfBirth: dob,
        lastLogin: new Date(),
        updatedAt: new Date(),
        membership_tier: 'Community'
      }
    };

    return await Meteor.users.updateAsync(
      { _id: userID },
      { $set: updateFields }
    );
  }
});
