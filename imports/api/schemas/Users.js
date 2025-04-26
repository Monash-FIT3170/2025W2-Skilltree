import SimpleSchema from "meteor/aldeed:simple-schema";
import { Schemas } from '/imports/api/Schemas';
import { UsersCollection } from '/imports/api/collections/Users';

// Define the schema for UsersCollection
Schemas.Users = new SimpleSchema({
  username: {
    type: String,
    label: 'Username',
    max: 50,
  },
  email: {
    type: String,
    label: 'Email Address',
    regEx: SimpleSchema.RegEx.Email,
  },
  passwordHash: {
    type: String,
    label: 'Password Hash',
  },
  createdAt: {
    type: Date,
    label: 'Account Creation Date',
    defaultValue: new Date(),
  },
  lastLogin: {
    type: Date,
    label: 'Last Login Time',
    optional: true,
  },
});

// Attach the schema to UsersCollection
UsersCollection.attachSchema(Schemas.Users);
