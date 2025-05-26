import React from 'react';
import { PrivateRoute } from '/imports/utils/RouteGuard';

// Element JSX UI
import { App } from '/imports/ui/App';

// Nested/Children Routes
import { HomeRoutes } from '/imports/routes/pages/Home';
import { SampleRoutes } from '/imports/routes/pages/Sample';
import { NotFoundRoutes } from '/imports/routes/pages/NotFound';
import { PendingProofsRoutes } from '/imports/routes/pages/PendingProofs';
import { ProofUploadRoutes } from '/imports/routes/pages/ProofUpload';
import { ProofDetailsRoutes } from '/imports/routes/pages/ProofDetails';
import { SkillTreeCommunityRoutes } from '/imports/routes/pages/SkillTreeCommunity';
import { CreateSkillTreeRoutes } from '/imports/routes/pages/CreateSkillTree';
import { ProfileDashboardRoutes } from '/imports/routes/pages/ProfileDashboard';

// Define Routes for App JSX layout
export const AppRoutes = [
  {
    // PrivateRoute requires loggedIn otherwise redirects to /login
    path: '',
    element: (
      <PrivateRoute redirect="/login">
        <App />
      </PrivateRoute>
    ),
    children: [
      // Extends children array with nested routes via spread operator (...)
      ...HomeRoutes,
      ...SampleRoutes,
      ...PendingProofsRoutes,
      ...ProofUploadRoutes,
      ...ProofDetailsRoutes,
      ...SkillTreeCommunityRoutes,
      ...CreateSkillTreeRoutes,
      ...ProfileDashboardRoutes,
      ...NotFoundRoutes // * Last for Page not found
    ]
  }
];
