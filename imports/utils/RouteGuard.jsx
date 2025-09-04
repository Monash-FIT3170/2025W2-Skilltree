import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { User } from '/imports/utils/User';
import { useFind, useSubscribe } from 'meteor/react-meteor-data/suspense';
import { useNavigate, useParams } from 'react-router-dom';
import { SubscriptionsCollection } from '/imports/api/collections/Subscriptions';

// AuthContext
import { AuthContext } from '/imports/utils/contexts/AuthContext';

// Custom RouteGuard Hook
export const useRouteGuard = ({
  AccessCondition,
  replace = false,
  state = {},
  relativePath = false,
  redirectUrl = '/',
  children,
  fallback = <></>
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!AccessCondition)
      navigate(redirectUrl, {
        replace,
        state,
        relative: relativePath ? 'path' : 'route'
      });
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
    replace: true,
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
  redirectUrl = '..' // Redirect url can be specified otherwise goes to /
}) => {
  const userId = useContext(AuthContext); // Computed once from top level
  const { id: skilltreeID } = useParams(); // Get skilltreeID from route

  useSubscribe('subscriptions');
  const skilltree = useFind(SubscriptionsCollection, [
    { skillTreeId: skilltreeID, userId: userId }, // fetch loggedIn user's subscriptions data for the matching skillTreeId
    {
      fields: {
        roles: 1 // Only fetch the roles array field to determine if loggedIn user is admin for the skilltree
      }
    }
  ])[0] ?? { roles: [] }; // If user is not in skilltree, return fallback object value that will be false

  return useRouteGuard({
    AccessCondition: skilltree?.roles.includes('admin'),
    relativePath: true,
    redirectUrl,
    children
  });
};
