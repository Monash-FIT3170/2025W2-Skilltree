import React from 'react';
import { PublicRoute, PrivateRoute } from '/imports/utils/RouteGuard';

//Sign In UI page component
import { SignIn } from '/imports/ui/pages/SignIn';
import { GetMissingGoogleFields } from '/imports/ui/components/SignUpComponents/GetMissingGoogleFields';

export const SignInRoutes = [
  {
    // PublicRoute redirects to / if hideForLoggedIn
    path: 'login/',
    element: (
      <PublicRoute hideForLoggedIn={true} redirect="/">
        <SignIn />
      </PublicRoute>
    )
  },
  {
    path: 'login/extraStep1',
    element: (
      <PrivateRoute redirect="/login">
        <GetMissingGoogleFields />
      </PrivateRoute>
    )
  }
];
