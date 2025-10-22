import SimpleSchema from 'meteor/aldeed:simple-schema';
import { Schemas } from '/imports/api/Schemas';

import { RequestsCollection } from '../collections/Requests';

Schemas.Requests = new SimpleSchema({
  requesterUserId: {
    type: String,
    label: 'Who is Following'
  },
  requesteeUserId: {
    type: String,
    label: 'Who is being followed'
  },
  createdAt: {
    type: Date,
    label: 'Followship creation date',
    defaultValue: new Date()
  }
});

RequestsCollection.attachSchema(Schemas.Requests);
