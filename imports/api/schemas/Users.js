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
    regEx: SimpleSchema.RegEx.Email
  },
  passwordHash: {
    type: String,
    label: 'Password Hash', //Case 1: passwordHash is used to store the hash string, not the password itself. We can implement the mongoDB hashing later
  },
  //Case 2: We can just store the direct password for NOW, just for easier testability until we have things sorted.
  //Need to remove this before going into production stage!
  password: { 
    type: 'String',
    label: 'Password',
    min:8,
    max:64,
    regEx: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[^\s]{8,64}$/ //regex can be simplified
  },
  dateOfBirth: {
    type: Date,
    label: 'Date Of Birth'
  },
  subscribedCommunities: {
    type: Array,
    label: 'Subscribed Communities',
    optional: true
  },
  'subscribedCommunities.$':{
    //Each element in the subscribed community array must be a String and match the pattern of the mongo_id
    type: String,
    regEx: SimpleSchema.RegEx.Id // Note: each regex validates only strings. We are referencing the mongodb _id fiels they generate for us.
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
  proof_of_practice_uploads: {
    type: Array,
    optional: true,
    label: "Your Proof of Practice Uploads",
  },
  "proof_of_practice_uploads.$": String,
  expertise_areas: {
    type: Array,
    optional: true,
    label: "Users Expertise Areas",
  },
  "expertise_areas.$": String,
  membership_tier: {
    type: String,
    label: "Membership Tier",
  }
});

// Attached the schema to UsersCollection
UsersCollection.attachSchema(Schemas.Users);