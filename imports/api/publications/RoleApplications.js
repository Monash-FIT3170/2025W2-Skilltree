import { Meteor } from 'meteor/meteor';
import { RoleApplicationCollection } from '/imports/api/collections/RoleApplications';

//Import for validation
import '/imports/api/schemas/RoleApplications';

Meteor.publish('roleApplications', () => RoleApplicationCollection.find());

Meteor.startup(async () => {
  await RoleApplicationCollection.removeAsync({});
});
