import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { User } from '/imports/utils/User';
import { useTracker } from 'meteor/react-meteor-data';

// AuthContext
import { AuthContext } from '/imports/utils/contexts/AuthContext';

// PublicRoute Helper JSX
export const PublicRoute = ({
  children, // <PublicRoute> <The child JSX /> </PublicRoute>
  hideForLoggedIn = false, // If logged in, hide route by redirecting
  redirectUrl = null // Redirect url can be specified otherwise goes to fromUrl
}) => {
  const loggedIn = useContext(AuthContext); // Computed once from top level
  const location = useLocation();
  if (!redirectUrl) {
    redirectUrl = location?.state?.fromUrl ?? '/'; // Override to fromURL if redirectUrl is not specified
  }
  return hideForLoggedIn && loggedIn ? (
    <Navigate to={redirectUrl} replace />
  ) : (
    children
  );
};

// PrivateRoute Helper JSX
export const PrivateRoute = ({ children, redirectUrl = '/login' }) => {
  const loggedIn = useContext(AuthContext); // Reactive when value changes
  const url = useLocation().pathname; // Current URL, will become fromURL on the redirect
  return loggedIn ? (
    children
  ) : (
    <Navigate to={redirectUrl} state={{ fromUrl: url }} />
  );
};

// ProfileCompleteRoute Helper JSX
export const ProfileCompleteRoute = ({
  children,
  redirectUrl = '/login/extraStep1'
}) =>
  useTracker(() => {
    const user = User(['profile.isProfileComplete']);
    const isProfileComplete = user?.profile?.isProfileComplete;
    // Either render children or redirect when isProfileComplete changes from undefined (after signin)
    if (isProfileComplete != undefined)
      return isProfileComplete ? children : <Navigate to={redirectUrl} />;
    return <></>; // When user data is not ready (undefined), render blank to avoid premature loading/redirect.
  });
