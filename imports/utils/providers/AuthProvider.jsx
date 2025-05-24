import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';

// Import Context
import { AuthContext } from '/imports/utils/contexts/AuthContext';

// Create Provider
export const AuthProvider = ({ children }) => {
  const authInfo = useTracker(() => {
    const id = Meteor.userId(); // Reactive Change
    return { userId: id, loggedIn: !!id };
  });
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
