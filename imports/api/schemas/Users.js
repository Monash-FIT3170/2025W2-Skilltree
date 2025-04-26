import SimpleSchema from "meteor/aldeed:simple-schema";
import { Schemas } from '/imports/api/Schemas';
import { UsersCollection } from '/imports/api/collections/Users';

// Define the schema for UsersCollection
Schemas.Users = new SimpleSchema({
  username: {
    type: String,
    label: 'Username',
    unique: true,
    max: 50,
  },
  email: {
    type: String,
    label: 'Email Address',
    regEx: SimpleSchema.RegEx.Email,
    unique: true,
  },
  passwordHash: {
    type: String,
    label: 'Password Hash',
  },
  profile: {   // Profile information nested object
    type: Object,
    label: 'User Profile',
    optional: true,
  },
  'profile.fullName': {
    type: String,
    label: 'Full Name',
    optional: true,
  },
  'profile.avatarUrl': {
    type: String,
    label: 'Avatar URL',
    regEx: SimpleSchema.RegEx.Url,
    optional: true,
  },
  'profile.bio': {
    type: String,
    label: 'User Bio',
    optional: true,
    max: 500,
  },
  roles: {   // User roles for authorization
    type: Array,
    label: 'Roles',
    optional: true,
  },
  'roles.$': {
    type: String,
    allowedValues: ['user', 'admin', 'moderator'],  // Add more roles as needed
  },
  isActive: {   // Account status
    type: Boolean,
    label: 'Is Active',
    defaultValue: true,
  },
  lastLogin: {
    type: Date,
    label: 'Last Login Time',
    optional: true,
  },
  createdAt: {
    type: Date,
    label: 'Account Creation Date',
    defaultValue: new Date(),
  },
  updatedAt: {
    type: Date,
    label: 'Account Last Updated',
    autoValue: function () {  // Automatically set on update
      if (this.isUpdate) {
        return new Date();
      }
    },
    optional: true,
  },
});

// Attached the schema to UsersCollection
UsersCollection.attachSchema(Schemas.Users);

