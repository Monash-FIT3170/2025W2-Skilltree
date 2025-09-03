import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { User } from '/imports/utils/User';
import { useSubscribe } from 'meteor/react-meteor-data/suspense';
import { useNavigate } from 'react-router-dom';

// AuthContext
import { AuthContext } from '/imports/utils/contexts/AuthContext';

// Custom RouteGuard Hook
export const useRouteGuard = ({
  AccessCondition,
  state = {},
  redirectUrl = '/',
  children,
  fallback = <></>
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!AccessCondition) navigate(redirectUrl, { state });
  }, [AccessCondition]); // Navigate has to be used when component first mounts via useEffect, not on first render.

  return AccessCondition ? children : fallback; // Display fallback until AccessCondition is met on component mount
};

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

  return useRouteGuard({
    AccessCondition: !(hideForLoggedIn && loggedIn),
    state: { fromUrl: location.pathname },
    redirectUrl,
    children
  });
};

// PrivateRoute Helper JSX
export const PrivateRoute = ({ children, redirectUrl = '/login' }) => {
  const loggedIn = useContext(AuthContext); // Reactive when value changes
  const url = useLocation().pathname; // Current URL, will become fromURL on the redirect

  return useRouteGuard({
    AccessCondition: loggedIn,
    state: { fromUrl: url },
    redirectUrl,
    children
  });
};

// ProfileCompleteRoute Helper JSX
export const ProfileCompleteRoute = ({
  children,
  redirectUrl = '/login/extraStep1', // Redirect url can be specified otherwise goes to /login/extraStep1
  requireComplete = true // Whether route requires isProfileComplete to be true or false
}) => {
  useSubscribe('users'); // Needed to workaround SSR
  const user = User(['profile.isProfileComplete']); // Suspense waits until data is ready to avoid undefined data
  const isProfileComplete = user?.profile?.isProfileComplete;

  return useRouteGuard({
    AccessCondition: isProfileComplete === requireComplete,
    redirectUrl,
    children
  });
};

// AdminRoute Helper JSX
export const AdminRoute = ({
  children,
  redirectUrl = '/' // Redirect url can be specified otherwise goes to /
}) => {
  const PLACEHOLDER = true;

  return useRouteGuard({
    AccessCondition: PLACEHOLDER,
    redirectUrl,
    children
  });
};
