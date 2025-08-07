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
  {
    userId: 'user001',
    widgetType: 'skilltree',
    position: 1,
    config: { theme: 'dark', showLabels: true, maxLevels: 5 },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    title: 'Guitar',
    icon: '🎸',
  },
  {
    userId: 'user003',
    widgetType: 'skilltree',
    position: 3,
    config: { theme: 'light', showLabels: false, maxLevels: 6 },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    title: 'Cooking',
    icon: '🍳',
  },
  {
    userId: 'user004',
    widgetType: 'skilltree',
    position: 4,
    config: { theme: 'dark', showLabels: true, maxLevels: 8 },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    title: 'Photography',
    icon: '📷',
  },
  {
    userId: 'user005',
    widgetType: 'skilltree',
    position: 5,
    config: { theme: 'light', showLabels: false, maxLevels: 4 },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    title: 'Programming',
    icon: '💻',
  },
  {
    userId: 'user006',
    widgetType: 'skilltree',
    position: 6,
    config: { theme: 'dark', showLabels: true, maxLevels: 10 },
    isActive: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    title: 'Drawing',
    icon: '🎨',
  },
  {
    userId: 'user007',
    widgetType: 'skilltree',
    position: 7,
    config: { theme: 'light', showLabels: true, maxLevels: 3 },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    title: 'Public Speaking',
    icon: '🗣️',
  },
  {
    userId: 'user008',
    widgetType: 'skilltree',
    position: 8,
    config: { theme: 'dark', showLabels: false, maxLevels: 6 },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    title: 'Gardening',
    icon: '🪴',
  },
  {
    userId: 'user009',
    widgetType: 'skilltree',
    position: 9,
    config: { theme: 'light', showLabels: true, maxLevels: 5 },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    title: 'Chess',
    icon: '♟️',
  },
  {
    userId: 'user010',
    widgetType: 'skilltree',
    position: 10,
    config: { theme: 'dark', showLabels: true, maxLevels: 7 },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    title: 'Fitness',
    icon: '🏋️',
  },
];

mockWidgets.forEach(widget => DashboardWidgetsCollection.insertAsync(widget));
});
