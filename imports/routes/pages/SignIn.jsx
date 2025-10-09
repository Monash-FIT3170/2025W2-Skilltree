import React from 'react';
import {
  PublicRoute,
  PrivateRoute,
  ProfileCompleteRoute
} from '/imports/utils/RouteGuard';

//Sign In UI page component
import { SignIn } from '/imports/ui/pages/SignIn';
import { ForgotPasswordForm } from '../../ui/pages/ForgotPasswordForm';
import { ResetPasswordForm } from '../../ui/pages/ResetPasswordForm';
import { AccountSetup } from '../../ui/layouts/Auth/AccountSetup';

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
    path: 'login/complete-profile',
    element: (
      <PrivateRoute redirect="/login">
        {/* Route requires isProfileComplete to be false to access otherwise redirects to / */}
        <ProfileCompleteRoute redirectUrl="/" requireComplete={false}>
          <AccountSetup
            currentStep={0}
            showStepBar={false}
            showFooter={false}
          />
        </ProfileCompleteRoute>
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
