import { Mongo } from 'meteor/mongo';

export const RoleApplicationCollection = new Mongo.Collection(
  'roleApplications'
);
