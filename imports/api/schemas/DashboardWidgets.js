iimport SimpleSchema from "meteor/aldeed:simple-schema";
import { Schemas } from '/imports/api/Schemas';
import { DashboardWidgetsCollection } from '/imports/api/collections/DashboardWidgets';

// Define the schema for DashboardWidgetsCollection
Schemas.DashboardWidgets = new SimpleSchema({
  userId: {
    type: String,
    label: 'User ID',
  },
  widgetType: {
    type: String,
    label: 'Type of Widget',
    allowedValues: ['stats', 'notifications', 'chart', 'tasks', 'calendar'],  // Extendable list
  },
  position: {
    type: SimpleSchema.Integer,
    label: 'Widget Position (ordering)',
  },
  config: {
    type: Object,
    label: 'Widget Configuration (flexible)',
    blackbox: true,  // Allows storing flexible JSON objects
  },
  isActive: {
    type: Boolean,
    label: 'Is Active',
    defaultValue: true,
  },
  createdAt: {
    type: Date,
    label: 'Created At',
    defaultValue: new Date(),
  },
  updatedAt: {
    type: Date,
    label: 'Last Updated',
    autoValue: function () {  // Automatically updates timestamp on modification
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpdate) {
        return new Date();
      }
    },
  },
});

// Attach the schema to DashboardWidgetsCollection
DashboardWidgetsCollection.attachSchema(Schemas.DashboardWidgets);
