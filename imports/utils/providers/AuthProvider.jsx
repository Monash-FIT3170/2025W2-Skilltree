import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';

// Import Context
import { AuthContext } from '/imports/utils/contexts/AuthContext';

// Create Provider
export const AuthProvider = ({ children }) => {
  const { userId, completedProfile } = useTracker(() => {
    return {
      userId: Meteor.userId(),
      completedProfile: false
    };
  });

  const value = {
    userId,
    completedProfile
  };

  console.log(value);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
