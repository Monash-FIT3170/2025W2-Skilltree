import { Meteor } from 'meteor/meteor';

Meteor.methods({
  async mergeGoogleAccount() {
    const googleUser = await Meteor.users.findOneAsync(this.userId);

    //If the google email does not exist
    if (!googleUser?.services?.google?.email) {
      return {
        success: false,
        alreadyMerged: false,
        status: 'missingGoogleEmail'
      };
    }

    const googleEmail = googleUser?.services?.google?.email;

    // CASE 1: The user has logged in with Google, and already has a verified email and password set.
    // This means the manual and Google accounts have already been merged.

    if (
      googleUser.emails?.[0]?.address === googleEmail &&
      googleUser.emails?.[0]?.verified === true &&
      googleUser.services?.password?.bcrypt
    ) {
      return { success: true, alreadyMerged: true, status: 'alreadyMerged' };
    }

    // CASE 2: The user has logged in only with Google (verified email, no manual password set).
    // This means they never created a manual SkillTree account, only signed in with Google.
    if (
      googleUser.emails?.[0]?.address === googleEmail &&
      googleUser.emails?.[0]?.verified === true &&
      !googleUser.services?.password?.bcrypt
    ) {
      return {
        success: true,
        alreadyMerged: true,
        status: 'googleOnlyAccount'
      };
    }
    //CASE 3: If we reach here, that means the user has either:
    // 1. Set up a manual skill tree account but hasnt logged with the google account (same email)
    //2. Has not logged in with google and has not set up a manual account

    // Find manual user with the same email.
    const manualUser = await Meteor.users.findOneAsync({
      'emails.address': googleEmail,
      'services.google': { $exists: false }
    });

    //If they have no services.google, then they have not signed in with google nor set up an account
    //Thus, this means this is their first time logging in with google, with no manual account
    if (!manualUser) {
      return {
        success: false,
        alreadyMerged: false,
        status: 'noManualAccount'
      };
    }

    //CASE 4: We have a manual account existing in the DB and we are currently trying to log into skilltree with a google account
    //Thus, we merge the exisiting manual setup into the google account
    const manualUsername = manualUser.username;
    const manualEmail = manualUser.emails?.[0]?.address;
    const manualPasswordHash = manualUser.services?.password?.bcrypt;

    // Step 1: Set everything except username and email (to avoid unique conflicts)
    await Meteor.users.updateAsync(googleUser._id, {
      $set: {
        'profile.givenName':
          manualUser.profile?.givenName || googleUser.profile?.givenName,
        'profile.familyName':
          manualUser.profile?.familyName || googleUser.profile?.familyName,
        'profile.dateOfBirth':
          manualUser.profile?.dateOfBirth || googleUser.profile?.dateOfBirth,

        'services.password.bcrypt': manualPasswordHash,

        'profile.subscribedCommunities': manualUser.subscribedCommunities || [],
        'profile.createdCommunities': manualUser.createdCommunities || [],
        'profile.proof_of_practice_uploads':
          manualUser.proof_of_practice_uploads || [],
        'profile.expertise_areas': manualUser.expertise_areas || [],
        'profile.membership_tier': manualUser.membership_tier || 'Community',
        'profile.friends': manualUser.friends || [],
        'profile.skillForests': manualUser.skillForests || [],
        'profile.roles': manualUser.roles || [],
        'profile.isActive': manualUser.isActive ?? true,
        'profile.lastLogin': new Date(),
        'profile.createdAt': manualUser.createdAt || googleUser.createdAt,
        'profile.updatedAt': new Date()
      }
    });

    // Step 2: Remove the manual user so username + email are freed
    await Meteor.users.removeAsync({ _id: manualUser._id });

    // Step 3: Now safe to set email and username
    if (manualEmail || manualUsername) {
      const emailAndUsernameUpdate = {};

      if (manualUsername) {
        emailAndUsernameUpdate.username = manualUsername;
      }

      if (manualEmail) {
        emailAndUsernameUpdate.emails = [
          {
            address: manualEmail,
            verified: true
          }
        ];
      }

      await Meteor.users.updateAsync(googleUser._id, {
        $set: emailAndUsernameUpdate
      });
    }

    return { success: true, alreadyMerged: false, status: 'justMerged' };
  }
});
