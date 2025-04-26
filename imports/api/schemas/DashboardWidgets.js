import SimpleSchema from "meteor/aldeed:simple-schema";
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
    allowedValues: ['stats', 'notifications', 'chart'],  // Example widget types
  },
  position: {
    type: SimpleSchema.Integer,
    label: 'Widget Position',
  },
  config: {
    type: Object,
    label: 'Widget Configuration',
    blackbox: true,  // Allows flexible JSON config
  },
  updatedAt: {
    type: Date,
    label: 'Last Updated',
    defaultValue: new Date(),
  },
});

// Attach the schema to DashboardWidgetsCollection
DashboardWidgetsCollection.attachSchema(Schemas.DashboardWidgets);
