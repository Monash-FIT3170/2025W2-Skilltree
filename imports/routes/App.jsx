import React from 'react';

// Element JSX UI
import { App } from '/imports/ui/App';

// Nested/Children Routes
import { HomeRoutes } from '/imports/routes/pages/Home';
import { SampleRoutes } from '/imports/routes/pages/Sample';
import { NotFoundRoutes } from '/imports/routes/pages/NotFound';
import { ProofUploadRoutes } from '/imports/routes/pages/ProofUpload';
import { ProofDetailsRoutes } from '/imports/routes/pages/ProofDetails';
import { PendingProofsRoutes } from './pages/PendingProofs';
import { SkillTreeCommunityRoutes } from './pages/SkillTreeCommunity';
import { CreateSkillTreeRoutes } from '/imports/routes/pages/CreateSkillTree';

// Define Routes for App JSX layout
export const AppRoutes = [
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
      ...SkillTreeCommunityRoutes,
      ...CreateSkillTreeRoutes,
      ...NotFoundRoutes // * Last for Page not found
    ]
  }
];
