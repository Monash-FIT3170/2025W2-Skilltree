import { Meteor } from 'meteor/meteor';
import { useContext } from 'react';
import { useFind } from 'meteor/react-meteor-data/suspense';

// AuthContext
import { AuthContext } from '/imports/utils/contexts/AuthContext';

// Helper function that takes in a list of fields, options and dependencies to return for the loggedIn user
export const User = (fields = [], options = {}, dependencies = []) => {
  const fieldsOption = {
    fields: Object.fromEntries(fields.map(field => [field, 1]))
  };
  const userId = useContext(AuthContext); // Reactive when value changes

  return (
    useFind(Meteor.users, [
      { _id: { $eq: userId } },
      { ...options, ...fieldsOption }, // fields argument overrides any fields in option (duplicate)
      dependencies
    ])[0] ?? undefined
  );

  // Old Meteor.user() method breaks SSR
  // return Meteor.isClient
  //   ? Meteor.user({ ...options, ...fieldsOption }) // user for client
  //   : Meteor.userAsync({ ...options, ...fieldsOption }); // userAsync for server
};
