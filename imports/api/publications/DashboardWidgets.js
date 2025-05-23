import { Meteor } from 'meteor/meteor';
import { DashboardWidgetsCollection } from '/imports/api/collections/DashboardWidgets';

// Schema
import '/imports/api/schemas/DashboardWidgets'; // Enable DashboardWidgets Schema Validation

// Publish the publication named as "dashboardWidgets" from the backend, lets clients (front-end JSX) subscribe to the data for real time changes
Meteor.publish('dashboardWidgets', () => {
  if (!this.userId) {
    return this.ready(); // No user logged in, don't publish anything
  }

  return DashboardWidgetsCollection.find({ userId: this.userId });
});
