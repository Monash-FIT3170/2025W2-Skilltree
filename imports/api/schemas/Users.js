import SimpleSchema from "meteor/aldeed:simple-schema";
import { Schemas } from '/imports/api/Schemas';


// Define the schema for UsersCollection
Schemas.Users = new SimpleSchema({
  username: {
    type: String,
    label: 'Username',
    max: 50,
  },
  email: { 
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  password: { 
    type: 'String',
    label: 'Password',
    min:8,
    max:64,
    regEx: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[^\s]{8,64}$/ 
  },
  profile: {
    type: Object,
    optional: true,
  },
  'profile.profileID': {
    type: String, 
    optional: true,
  }
});

// Attached the schema to UsersCollection
//Meteor.users.attachSchema(Schemas.Users);