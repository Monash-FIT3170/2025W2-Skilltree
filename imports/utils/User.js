import { Meteor } from 'meteor/meteor';
import { useContext } from 'react';
import { useFind } from 'meteor/react-meteor-data/suspense';

// AuthContext
import { AuthContext } from '/imports/utils/contexts/AuthContext';

// Helper function that takes in a list of fields to return for the logged in user
export const User = (fields = [], options = {}) => {
  const projection = {
    fields: Object.fromEntries(fields.map(field => [field, 1]))
  };
  const userId = useContext(AuthContext); // Reactive when value changes

  return (
    useFind(Meteor.users, [{ _id: { $eq: userId } }, projection, options])[0] ??
    undefined
  );

  // return Meteor.isClient
  //   ? Meteor.user(projection) // user for client
  //   : Meteor.userAsync(projection); // userAsync for server
};
