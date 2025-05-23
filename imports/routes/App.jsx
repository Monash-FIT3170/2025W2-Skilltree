import React from 'react';

// Element JSX UI
import { App } from '/imports/ui/App';
import { PublicLayout } from '/imports/ui/layouts/PublicLayout';

// Nested/Children Routes
import { HomeRoutes } from '/imports/routes/pages/Home';
import { SampleRoutes } from '/imports/routes/pages/Sample';
import { NotFoundRoutes } from '/imports/routes/pages/NotFound';
import { SignUpRoutes } from '/imports/routes/pages/SignUp';
import { SignInRoutes } from '/imports/routes/pages/SignIn';
import { PendingProofsRoutes } from '/imports/routes/pages/PendingProofs';
import { ProofUploadRoutes } from '/imports/routes/pages/ProofUpload';
import { ProofDetailsRoutes } from '/imports/routes/pages/ProofDetails';

// Define Routes for App JSX layout
export const AppRoutes = [
  {
    path: '/',
    element: <PublicLayout />,
    children: [...SignInRoutes, ...SignUpRoutes]
  },
  {
    path: '/',
    element: <App />,
    children: [
      // Extends children array with nested routes via spread operator (...)
      ...HomeRoutes,
      ...SampleRoutes,
      ...PendingProofsRoutes,
      ...ProofUploadRoutes,
      ...ProofDetailsRoutes,
      ...NotFoundRoutes // * Keep last for Page not found
    ]
  }
];
