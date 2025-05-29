import { Meteor } from 'meteor/meteor';

// Helper function that takes in a list of fields to return for the logged in user
export const User = (fields = []) => {
  const projection = {
    fields: Object.fromEntries(fields.map(field => [field, 1]))
  };

  return Meteor.isClient
    ? Meteor.user(projection) // user for client
    : Meteor.userAsync(projection); // userAsync for server
};
