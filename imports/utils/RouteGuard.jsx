import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// AuthContext
import { AuthContext } from '/imports/utils/contexts/AuthContext';
import { FromUrlContext } from '/imports/utils/contexts/FromUrlContext';

// PublicRoute Helper JSX
export const PublicRoute = ({
  children, // <PublicRoute> <The child JSX /> </PublicRoute>
  hideForLoggedIn = false, // If logged in, hide route by redirecting
  redirectUrl = null // Redirect url can be specified otherwise goes to fromUrl
}) => {
  const loggedIn = useContext(AuthContext); // Computed once from top level
  const [fromUrl, setfromURL] = useContext(FromUrlContext);
  if (redirectUrl) {
    setfromURL(redirectUrl);
  }
  return hideForLoggedIn && loggedIn ? <Navigate to={fromUrl} /> : children;
};

// PrivateRoute Helper JSX
export const PrivateRoute = ({ children, redirectUrl = '/login' }) => {
  const loggedIn = useContext(AuthContext); // Reactive when value changes
  const [, setfromURL] = useContext(FromUrlContext);
  setfromURL(useLocation());
  return loggedIn ? children : <Navigate to={redirectUrl} />;
};
