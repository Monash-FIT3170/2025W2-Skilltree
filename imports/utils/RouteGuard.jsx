import { Meteor } from 'meteor/meteor';
import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';

// AuthContext
import { AuthContext } from '/imports/utils/contexts/AuthContext';

// PublicRoute Helper JSX
export const PublicRoute = ({
  children, // <PublicRoute> <The child JSX /> </PublicRoute>
  hideForLoggedIn = false, // If logged in, hide route by redirecting
  redirect = '/' // Redirect url can be specified otherwise goes to /
}) => {
  const value = useContext(AuthContext); // Computed once from top level
  const [user, setUser] = useState(null);

  const subscriptionReady = useTracker(() => {
    const handle = Meteor.subscribe('userData', value.userId);
    return handle.ready();
  }, [value.userId]);

  useEffect(() => {
    if (subscriptionReady) {
      Meteor.users
        .findOneAsync({ _id: value.userId })
        .then(res => setUser(res));
    }
  }, [subscriptionReady, value.userId]);

  //If user is null, then loggedIn will be the userID
  var loggedIn = value.userId;

  //If the user is retrieved, then we find if the profile is complete or note
  //If the profile is complete (meaning they have already gone through the extraStep1), then they navigate to the "/"
  //If the profile is incomplete, then we let the navigate(login/extraStep1) from SignIn takeover

  //So, this solves the race condition we previously had: When user logs in with google first time, loggedIn becomes true, thus
  // if would prematurely redirect to the "/", then navigate(login/extraStep1) from SignIn would execute, navigating to the extraStep1
  // if u click the backpage button, we could access the "/" even though we have an incomplete account

  if (user) {
    loggedIn = value.userId && user.profile?.isProfileComplete;
  }

  return hideForLoggedIn && user && loggedIn ? (
    <Navigate to={redirect} />
  ) : (
    children
  );
};

// PrivateRoute Helper JSX
export const PrivateRoute = ({ children = null, redirect = '/login' }) => {
  const value = useContext(AuthContext); // Reactive when value changes
  const loggedIn = value.userId;
  return loggedIn ? children : <Navigate to={redirect} />;
};
