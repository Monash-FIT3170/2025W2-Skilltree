import { Meteor } from 'meteor/meteor';
import React, { Suspense } from 'react';
import { useTracker } from 'meteor/react-meteor-data/suspense';

// JSX UI
import { Fallback } from '/imports/ui/components/Fallback';

// Import Context
import { UserContext } from '/imports/utils/contexts/UserContext';

// Create Provider
export const UserProvider = ({ children }) => {
  const user = useTracker('user', () =>
    Meteor.isClient ? Meteor.user() : Meteor.userAsync()
  ); // Reactive Change, currently has issues with SSR
  return (
    <Suspense fallback={<Fallback msg={''} />}>
      <UserContext.Provider value={user}>{children}</UserContext.Provider>
    </Suspense>
  );
};
