import SimpleSchema from 'meteor/aldeed:simple-schema';
import { Schemas } from '/imports/api/Schemas';

import { RequestsCollection } from '../collections/Requests';

Schemas.Requests = new SimpleSchema({
  requesterUserId: {
    type: String,
    label: 'Who is Requesting'
  },
  requesteeUserId: {
    type: String,
    label: 'Who is being requested'
  },
  createdAt: {
    type: Date,
    label: 'Request creation date',
    defaultValue: new Date()
  }
});

RequestsCollection.attachSchema(Schemas.Requests);
