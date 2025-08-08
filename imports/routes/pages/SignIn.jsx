import React from 'react';
import { PublicRoute, PrivateRoute } from '/imports/utils/RouteGuard';

//Sign In UI page component
import { SignIn } from '/imports/ui/pages/SignIn';
import { GetMissingGoogleFields } from '/imports/ui/components/SignUpComponents/GetMissingGoogleFields';
import { ForgotPasswordForm } from '../../ui/pages/ForgotPasswordForm';
import { ResetPasswordForm } from '../../ui/pages/ResetPasswordForm';

export const SignInRoutes = [
  {
    // PublicRoute redirects to / if hideForLoggedIn
    path: 'login/',
    element: (
      <PublicRoute hideForLoggedIn={true}>
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
  },
  {
    path: 'login/password-recovery',
    element: (
      <PublicRoute hideForLoggedIn={true} redirect="/">
        <ForgotPasswordForm />
      </PublicRoute>
    )
  },
  {
    path: 'login/reset-password/:token',
    element: (
      <PublicRoute hideForLoggedIn={true} redirect="/">
        <ResetPasswordForm />
      </PublicRoute>
    )
  }
];
