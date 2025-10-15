import React from 'react';
import { PublicRoute } from '/imports/utils/RouteGuard';

import { ForgotPasswordForm } from '../../ui/pages/ForgotPasswordForm';

export const ForgotPasswordRoutes = [
  {
    path: '/password-recovery',
    element: (
      <PublicRoute hideForLoggedIn={true} redirect="/">
        <ForgotPasswordForm />
      </PublicRoute>
    )
  }
];
