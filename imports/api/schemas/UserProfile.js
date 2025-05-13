import SimpleSchema from "meteor/aldeed:simple-schema";
import { Schemas } from '/imports/api/Schemas';
import { UsersProfileCollection } from '/imports/api/collections/UserProfile';

// Define the schema for UsersCollection
Schemas.UserProfile = new SimpleSchema({
  userId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  firstName: {
    type: String,
    label: 'First Name'
  },
  lastName: {
    type: String,
    label: 'Last Name'
  },
  avatarUrl: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    label: 'Avatar URL',
    optional: true,
  },
  bio: {
    type: String,
    max: 500,
    label: 'User Bio',
    optional: true,
  },
  dateOfBirth: {
    type: Date,
    label: 'Date Of Birth'
  },
  roles: {
    type: Array,
    label: 'Roles',
    optional: true,
  },
  'roles.$': {
    type: String,
    allowedValues: ['user', 'admin', 'moderator'], //Add more roles if needed
  },
  membership_tier: {
    type: String,
    label: 'Membership Tier',
    allowedValues: ['Community', 'Pro']
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
  friends: {
    type: Array,
    optional: true,
  },
  'friends.$': {
    type: String,
  },
  skillForests: {
    type: Array,
    label: 'Skill Forests',
    optional: true,
  },
  'skillForests.$': {
    type: String,
  },
  proof_of_practice_uploads: {
    type: Array,
    label: "Your Proof of Practice Uploads",
    optional: true,
  },
  'proof_of_practice_uploads.$': {
    type: String,
  },
  expertise_areas: {
    type: Array,
    label: "Users Expertise Areas",
    optional: true,
    
  },
  'expertise_areas.$': {
    type: String,
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

