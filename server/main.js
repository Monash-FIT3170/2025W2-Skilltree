import { Meteor } from 'meteor/meteor';
import 'meteor/aldeed:collection2/dynamic';
await Collection2.load(); // eslint-disable-line

await import('/imports/api/Publications'); // Publications
import '/imports/api/Methods'; // Methods
import '/imports/Router'; // Router (Server-Side Rendering)
import '/imports/api/auth/google_oauth'; // Auth (google)
import '/imports/api/auth/AccountConfig'; //Meteor accounts reset password link configurations
import '/imports/api/publications/Users';
import '/imports/api/publications/SkillForest';
// Meteor Startup
Meteor.startup(async () => {});
