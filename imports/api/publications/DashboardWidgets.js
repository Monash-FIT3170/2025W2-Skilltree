import { Meteor } from 'meteor/meteor';
import { DashboardWidgetsCollection } from '/imports/api/collections/DashboardWidgets';

// Schema
import '/imports/api/schemas/DashboardWidgets'; // Enable DashboardWidgets Schema Validation

// Publish the publication named as "dashboardWidgets" from the backend, lets clients (front-end JSX) subscribe to the data for real time changes
Meteor.publish('dashboardWidgets', () => DashboardWidgetsCollection.find());

Meteor.startup(async () => {

  // Clear collection asynchronously
  await DashboardWidgetsCollection.removeAsync({})

  const mockWidgets = [
  {
    userId: 'user123',
    widgetType: 'skilltree',
    position: 1,
    config: { theme: 'dark', showLabels: true, maxLevels: 5 },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    title: 'Soccer',
    icon: '⚽',
  },
  {
    userId: 'user456',
    widgetType: 'skilltree',
    position: 2,
    config: { theme: 'light', showLabels: true, maxLevels: 7 },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    title: 'Piano',
    icon: '🎹',
  },
];

mockWidgets.forEach(widget => DashboardWidgetsCollection.insertAsync(widget));
});
