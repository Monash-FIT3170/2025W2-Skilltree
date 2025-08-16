import React, { Suspense } from 'react';
import { PrivateRoute, ProfileCompleteRoute } from '/imports/utils/RouteGuard';

// Element JSX UI
import { App } from '/imports/ui/App';
import { Fallback } from '/imports/ui/components/Fallback';

// Nested/Children Routes
import { DashboardRoutes } from '/imports/routes/pages/Dashboard';
import { SampleRoutes } from '/imports/routes/pages/Sample';
import { NotFoundRoutes } from '/imports/routes/pages/NotFound';
import { PendingProofsRoutes } from '/imports/routes/pages/PendingProofs';
import { ProofUploadRoutes } from '/imports/routes/pages/ProofUpload';
import { SkillTreeCommunityRoutes } from '/imports/routes/pages/SkillTreeCommunity';
import { CreateSkillTreeRoutes } from '/imports/routes/pages/CreateSkillTree';
import { SettingRoutes } from '/imports/routes/pages/Configuration/Settings';
import { SearchResultsRoutes } from '/imports/routes/pages/SearchResults';

// Define Routes for App JSX layout
export const AppRoutes = [
  {
    // PrivateRoute requires loggedIn otherwise redirects to /login
    path: '',
    element: (
      <PrivateRoute redirect="/login">
        <Suspense fallback={<Fallback />}>
          <ProfileCompleteRoute>
            <App />
          </ProfileCompleteRoute>
        </Suspense>
      </PrivateRoute>
    ),
    children: [
      // Extends children array with nested routes via spread operator (...)
      ...DashboardRoutes,
      ...SettingRoutes,
      ...SampleRoutes,
      ...PendingProofsRoutes,
      ...ProofUploadRoutes,
      ...SkillTreeCommunityRoutes,
      ...CreateSkillTreeRoutes,
      ...SearchResultsRoutes,
      ...NotFoundRoutes // * Last for Page not found
    ]
  }
];
