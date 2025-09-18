import SimpleSchema from 'meteor/aldeed:simple-schema';
import { Schemas } from '/imports/api/Schemas';
import { EventCollection } from '../collections/Events';

Schemas.Events = new SimpleSchema({
    skilltreeId:{
        type: String,
        label: "Skilltree that is hosting event",
    },
    title:{
        type: String,
        label: "Title of event",
    },
    description:{
        type: String,
        label: "Short description of event",
    },
    maxTrophies:{
        type: SimpleSchema.Integer,
        label: "Trophies for first place",
        min: 1,
        optional: true,
    },
    active:{
        type: Boolean,
        label: "Indicates if an event is active",
    },
    participants:{
        type: Array,
        defaultValue: [],
        label: "Array of userIds for users participating in event",
    },
    'participants.$':{
        type: String,
    },
})

EventCollection.attachSchema(Schemas.Events)