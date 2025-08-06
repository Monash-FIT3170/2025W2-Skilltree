import { Mongo } from 'meteor/mongo';

// Create & export a new MongoDB collection named 'dashboardWidgets'
export const DashboardWidgetsCollection = new Mongo.Collection(
  'dashboardWidgets'
);

