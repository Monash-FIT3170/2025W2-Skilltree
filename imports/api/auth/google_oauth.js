import { ServiceConfiguration } from 'meteor/service-configuration';
import { Meteor } from 'meteor/meteor';

const CLIENT_ID = Meteor.settings.private.google.clientId;
const CLIENT_SECRET = Meteor.settings.private.google.secret;

Meteor.startup(() => {
  ServiceConfiguration.configurations.upsertAsync(
    { service: 'google' },
    {
      $set: {
        clientId: CLIENT_ID,
        secret: CLIENT_SECRET
      }
    }
  );
});
