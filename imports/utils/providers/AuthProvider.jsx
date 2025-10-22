import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useTracker } from 'meteor/react-meteor-data/suspense';
//import { Tracker } from 'meteor/tracker';

// Import Context
import { AuthContext } from '/imports/utils/contexts/AuthContext';

// Create Provider
export const AuthProvider = ({ children }) => {
  // const userId = useTracker(
  //   'AuthContextProvider',
  //   async c => await Tracker.withComputation(c, () => Meteor.userId())
  // );
  const userId = useTracker('AuthContextProvider', async () => Meteor.userId());
  return <AuthContext.Provider value={userId}>{children}</AuthContext.Provider>;
};
