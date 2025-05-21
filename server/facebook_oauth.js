import { ServiceConfiguration } from 'meteor/service-configuration';
import { Meteor } from 'meteor/meteor';

const CLIENT_ID = Meteor.settings.private.facebook.clientId;
const CLIENT_SECRET = Meteor.settings.private.facebook.secret;

Meteor.startup(() => {
  ServiceConfiguration.configurations.upsertAsync(
    { service: 'facebook' },
    {
      $set: {
        appId: CLIENT_ID,
        secret: CLIENT_SECRET,
        loginStyle:'popup'
      }
    }
  );
});
