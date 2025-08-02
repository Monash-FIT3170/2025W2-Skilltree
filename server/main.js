import { Meteor } from 'meteor/meteor';
import 'meteor/aldeed:collection2/static';

import '/imports/api/Publications'; // Publications
import '/imports/api/Methods'; // Methods
import '/imports/Router'; // Router (Server-Side Rendering)
import '/imports/api/auth/google_oauth'; // Auth (google)
import './AccountConfig'; //Meteor accounts reset password link configurations

// Meteor Startup
Meteor.startup(async () => {});
