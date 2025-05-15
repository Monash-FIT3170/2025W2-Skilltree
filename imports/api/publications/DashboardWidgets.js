import { Meteor } from 'meteor/meteor';
import { DashboardWidgetsCollection } from '/imports/api/collections/DashboardWidgets';

Meteor.publish('dashboardWidgets', function () {
  if (!this.userId) {
    return this.ready(); // No user logged in, don't publish anything
  }

  return DashboardWidgetsCollection.find({ userId: this.userId });
});
