import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
  async extendLoginExpiration() {
    //ensure user is logged in first
    if (!this.userId) {
      throw new Meteor.Error(
        'not-authorised',
        'You must be logged in to extend session. userId is not defined.'
      );
    }

    console.log('User attempting to extend session:', this.userId);

    //Check if the user is in the mongoDB
    const user = await Meteor.users.findOneAsync(this.userId);
    if (!user) {
      throw new Meteor.Error('user-not-found', 'User was not found!');
    }

    //Check if the current connection has a valid login token
    if (!this.connection) {
      throw new Meteor.Error('invalid-connection', 'Invalid Connection State');
    }

    //Create a new token
    const stampedToken = Accounts._generateStampedLoginToken();

    //Since Meteor uses stampedToken.when in its calculation of the exp date (i.e. stampedToken.when + Accounts.loginExpirationTime), we can manipualte the expiration
    stampedToken.when = new Date(Date.now() + 29 * 24 * 60 * 60 * 1000);

    //Store the hashedToken
    const hashedToken = Accounts._hashLoginToken(stampedToken.token);

    //Update the token for user in the db
    Meteor.users.updateAsync(this.userId, {
      $push: {
        'services.resume.loginTokens': {
          hashedToken,
          when: stampedToken.when
        }
      }
    });

    //The new token is the latest. So we need to update the current session
    Accounts._setLoginToken(this.userId, this.connection, hashedToken);
    this.connection._loginToken = stampedToken.token;

    //Notice how there were old/expired token versions? We need to remove tokens < recent token
    const currDate = new Date();
    await Meteor.users.updateAsync(this.userId, {
      $pull: {
        'services.resume.loginTokens': {
          when: { $lt: currDate }
        }
      }
    });

    //We should limit the number of active tokens the user has
    const updatedUser = await Meteor.users.findOneAsync(this.userId);
    const tokenCount = updatedUser.services?.resume?.loginTokens?.length || 0;

    console.log(tokenCount);
    if (tokenCount > 3) {
      // Sort by creation date and keep only the 3 most recent
      const sortedTokens = updatedUser.services.resume.loginTokens
        .sort((a, b) => b.when - a.when)
        .slice(0, 3);

      await Meteor.users.updateAsync(this.userId, {
        $set: {
          'services.resume.loginTokens': sortedTokens
        }
      });
    }

    console.log('Session extended successfully for user:', this.userId);

    return {
      success: true,
      message: 'Session Extended Successfully!',
      token: stampedToken.token
    };
  }
});
