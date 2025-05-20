import React from 'react';

// Element JSX UI
import { App } from '/imports/ui/App';

// Nested/Children Routes
import { HomeRoutes } from '/imports/routes/pages/Home';
import { SampleRoutes } from '/imports/routes/pages/Sample';
import { NotFoundRoutes } from '/imports/routes/pages/NotFound';
import { SignUpRoutes } from '/imports/routes/pages/SignUp';
import { SignInRoutes } from '/imports/routes/pages/SignIn';
import { ProofUploadRoutes } from '/imports/routes/pages/ProofUpload';
import { PendingProofsRoutes } from './pages/PendingProofs';
import { ProfileDashboardRoutes } from './pages/ProfileDashboard';

// Define Routes for App JSX layout
export const AppRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      // Extends children array with nested routes via spread operator (...)
      ...SignUpRoutes,
      ...SignInRoutes,
      ...HomeRoutes,
      ...SampleRoutes,
      ...ProofUploadRoutes,
      ...PendingProofsRoutes,
      ...ProfileDashboardRoutes,
      ...NotFoundRoutes // * Last for Page not found
    ]
  }
];
