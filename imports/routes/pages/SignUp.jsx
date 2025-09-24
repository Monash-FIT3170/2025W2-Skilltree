import React from 'react';
import { PublicRoute } from '/imports/utils/RouteGuard';

// Element JSX UI
import { SignUp } from '/imports/ui/pages/SignUp';

// Define Routes for SignUpView JSX component
export const SignUpRoutes = [
  {
    // PublicRoute redirects to / if hideForLoggedIn
    //When the user visits /signup, the SignUpPage will render
    //Note: SignUp has an Outlet component to tell React Router where to render the nested child routes.
    path: 'signup/',
    element: (
      <PublicRoute hideForLoggedIn={true} redirect="/">
        <SignUp />
      </PublicRoute>
    )
  }
];
