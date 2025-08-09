import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';

// Import Context
import { AuthContext } from '/imports/utils/contexts/AuthContext';

// Create Provider
export const AuthProvider = ({ children }) => {
  const userId = useTracker(() => Meteor.userId());
  return <AuthContext.Provider value={userId}>{children}</AuthContext.Provider>;
};
