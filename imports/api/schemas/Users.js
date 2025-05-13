import SimpleSchema from "meteor/aldeed:simple-schema";
import { Schemas, Regex } from "/imports/api/Schemas";

// Define the schema for UsersEmail
Schemas.UsersEmail = new SimpleSchema({ 
  'address': {
    type: String,
    label: "Email Address",
    regEx: SimpleSchema.RegEx.Email,
  },
  'verified': {
    label: "Verified Status",
    type: Boolean,
  },
});

// Define the schema for UsersProfile
Schemas.UsersProfile = new SimpleSchema({ 
  "fullName": {
    type: String,
    label: "Full Name",
    optional: true,
  },
  "avatarUrl": {
    type: String,
    label: "Avatar URL",
    optional: true,
    regEx: SimpleSchema.RegEx.Url,
  },
  "bio": {
    type: String,
    label: "User Bio",
    optional: true,
    max: 500,
  },
  dateOfBirth: {
    type: Date,
    label: "Date Of Birth",
    optional: true,
  },
   subscribedCommunities: {
    type: Array,
    label: "Subscribed Communities",
    optional: true,
    defaultValue: [],
  },
  "subscribedCommunities.$": {
    // Each element in the subscribed community array must be a String and match the pattern of the mongo_id
    type: String, // {"_id1", "_id2"} -> {"iCZmdXWy5GyqoqBox", "ZmdXoqCGoWyixyqB5"} etc
    label: "Subscribed Communities (_id)",
    regEx: Regex._id, // Validates mongodb _id
  },
  roles: {
    // User roles for authorization
    type: Array,
    label: "Roles",
    optional: true,
    defaultValue: ["user"],
  },
  "roles.$": {
    type: String,
    label: "Role",
    allowedValues: ["user", "admin", "moderator"], // Add more roles as needed
  },
  isActive: {
    // Account status
    type: Boolean,
    label: "Is Active",
    defaultValue: true,
  },
  lastLogin: {
    type: Date,
    label: "Last Login Time",
    optional: true,
  },
  createdAt: {
    type: Date,
    label: "Account Creation Date",
    optional: true,
    defaultValue: new Date(),
  },
  updatedAt: {
    type: Date,
    label: "Account Last Updated",
    optional: true,
    autoValue: () => {
      // Automatically set on update
      if (this.isUpdate) {
        return new Date();
      }
    },
  },
  proof_of_practice_uploads: {
    type: Array,
    label: "Your Proof of Practice Uploads",
    optional: true,
    defaultValue: [],
  },
  "proof_of_practice_uploads.$": {
    type: String,
    label: "Proof of practice uploads (_id)",
    regEx: Regex._id, // Validates mongodb _id
  },
  expertise_areas: {
    type: Array,
    label: "Users Expertise Areas",
    optional: true,
    defaultValue: [],
  },
  "expertise_areas.$": {
    type: String,
    label: "Expertise Area",
  },
  membership_tier: {
    type: String,
    label: "Membership Tier",
    optional: true,
  },
  createdCommunities: {
    type: Array,
    label: "Created Communities",
    optional: true,
    defaultValue: [],
  },
  "createdCommunities.$": {
    type: String,
    label: "Community",
  },
  friends: {
    type: Array,
    label: "Friends",
    optional: true,
    defaultValue: [],
  },
  "friends.$": {
    type: String,
    label: "Friend (_id)",
    regEx: Regex._id, // Validates mongodb _id
  },
  skillForests: {
    type: Array,
    label: "Skill Forests",
    optional: true,
    defaultValue: [],
  },
  "skillForests.$": {
    type: String,
    label: "Skill Forest (_id)",
    regEx: Regex._id, // Validates mongodb _id
  },
});

// Define the schema for UsersServices
Schemas.UsersServices = new SimpleSchema({ 
  'password': { 
    type: Object,
    label: "Hashed Password Object", 
  },
  'password.bcrypt' : {
    type: String, // The hash of the password is stored, not the password itself.
    label: "bcrypt Password Hash", 
  }
});

// Define the schema for Meteor.users
Schemas.User = new SimpleSchema({
  username: {
    type: String,
    label: "Username",
    max: 50,
  },
  emails: {
    type: Array,
    label: "User Emails",
  },
  'emails.$': {
    type: Schemas.UsersEmail,
    label: "User Email Object", 
  },
  createdAt: {
    type: Date,
    label: "User Creation Date",
  },
  profile: {
    // Profile information nested object
    type: Schemas.UsersProfile,
    label: "User Profile",
    optional: true,
  },
  services: {
    type: Schemas.UsersServices,
    label: "User Services Data",
    optional: true,
    // blackbox: true, // Uncomment this to debug generated service fields, then add missing ones to Schemas.UsersServices
  },
});

// Attached the schema to Meteor.users
Meteor.users.attachSchema(Schemas.User);