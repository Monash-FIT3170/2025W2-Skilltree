import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';

// Import Context
import { UserContext } from '/imports/utils/contexts/UserContext';

// Create Provider
export const UserProvider = ({ children }) => {
  const user = useTracker(() =>
    Meteor.isClient ? Meteor.user() : Meteor.userAsync()
  );
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
