import { ServiceConfiguration } from 'meteor/service-configuration';
import { Meteor } from 'meteor/meteor';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

Meteor.startup(() => {
  ServiceConfiguration.configurations.upsertAsync(
    { service: 'google' },
    {
      $set: {
        clientId:CLIENT_ID,
        secret: CLIENT_SECRET
      }
    }
  );
});
