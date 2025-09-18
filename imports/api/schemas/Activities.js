import SimpleSchema from 'meteor/aldeed:simple-schema';
import { Schemas } from '/imports/api/Schemas';

//Import the activities collection
import { ActivitiesCollection } from '/imports/api/collections/Activities';

Schemas.Activities = new SimpleSchema({});

//Attach the activities schema to the collection
ActivitiesCollection.attachSchema(Schemas.Activities); /*  */
