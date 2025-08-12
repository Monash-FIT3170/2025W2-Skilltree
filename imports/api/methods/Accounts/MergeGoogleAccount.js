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
      !googleUser.services?.password?.bcrypt &&
      googleUser.profile?.isProfileComplete
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
    //Thus, we merge the Google account data into the existing manual account.

    const manualUserId = manualUser._id;

    // Step 1: We need to attach the Google Service to the existing account
    await Meteor.users.updateAsync(manualUserId, {
      $set: {
        'profile.givenName':
          manualUser.profile?.givenName || googleUser.profile?.givenName,
        'profile.familyName':
          manualUser.profile?.familyName || googleUser.profile?.familyName,
        'profile.dateOfBirth':
          manualUser.profile?.dateOfBirth || googleUser.profile?.dateOfBirth,

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

    // Step 2: Remove the google user so the email is freed up
    await Meteor.users.removeAsync({ _id: googleUser._id });

    // Step 3: Now safe to set the email and service.google since google account is removed
    // Since we do not have this.userId anymore, we need to reference the manual user without id
    const finalUser = await Meteor.users.findOneAsync({
      'emails.address': googleEmail
    });
    const finalUserId = finalUser._id;

    const safeUpdates = {
      'services.google': googleUser.services.google,
      'services.resume': googleUser.services.resume
    };

    if (googleEmail) {
      safeUpdates.emails = [
        {
          address: googleEmail,
          verified: true
        }
      ];
    }

    await Meteor.users.updateAsync(finalUserId, {
      $set: safeUpdates
    });

    return { success: true, alreadyMerged: false, status: 'justMerged' };
  }
});
