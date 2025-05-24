import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

// AuthContext
import { AuthContext } from '/imports/utils/contexts/AuthContext';

// PublicRoute Helper JSX
export const PublicRoute = ({
  children, // <PublicRoute> <The child JSX /> </PublicRoute>
  hideForLoggedIn = false, // If logged in, hide route by redirecting
  redirect = '/' // Redirect url can be specified otherwise goes to /
}) => {
  const { loggedIn } = useContext(AuthContext); // Computed once from top level
  return hideForLoggedIn && loggedIn ? <Navigate to={redirect} /> : children;
};

// PrivateRoute Helper JSX
export const PrivateRoute = ({ children, redirect = '/login' }) => {
  const { loggedIn } = useContext(AuthContext); // Reactive when value changes
  return loggedIn ? children : <Navigate to={redirect} />;
};
