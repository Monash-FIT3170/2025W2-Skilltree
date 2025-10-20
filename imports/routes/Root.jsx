import React from 'react';

// Element JSX UI
import { Root } from '/imports/ui/Root';

// Nested/Children Routes
import { AppRoutes } from '/imports/routes/App';
import { SignInRoutes } from '/imports/routes/pages/SignIn';
import { SignUpRoutes } from '/imports/routes/pages/SignUp';
import { ForgotPasswordRoutes } from '/imports/routes/pages/ForgotPassword';
import { ResetPasswordRoutes } from '/imports/routes/pages/ResetPasswordForm';
import { CompleteProfileRoutes } from '/imports/routes/pages/CompleteProfile';

// Define Routes for App JSX layout
export const RootRoutes = [
  {
    path: '/',
    element: <Root />,
    children: [
      ...AppRoutes,
      ...SignInRoutes,
      ...SignUpRoutes,
      ...ForgotPasswordRoutes,
      ...ResetPasswordRoutes,
      ...CompleteProfileRoutes
    ]
  }
];
