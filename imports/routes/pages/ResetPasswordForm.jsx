import React from 'react';
import { PublicRoute } from '/imports/utils/RouteGuard';

import { ResetPasswordForm } from '../../ui/pages/ResetPasswordForm';

export const ResetPasswordRoutes = [
  {
    path: '/reset-password/:token',
    element: (
      <PublicRoute hideForLoggedIn={true} redirect="/">
        <ResetPasswordForm />
      </PublicRoute>
    )
  }
];
