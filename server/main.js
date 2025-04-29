import { Meteor } from 'meteor/meteor';
import 'meteor/aldeed:collection2/static';

import '/imports/api/Publications'; // Publications
import '/imports/api/Methods'; // Methods
import '/imports/Router'; // Router (Server-Side Rendering)

// Meteor Startup
Meteor.startup(async () => {});
