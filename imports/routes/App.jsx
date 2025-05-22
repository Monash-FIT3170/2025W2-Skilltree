import React from 'react';

// Element JSX UI
import { App } from '/imports/ui/App';

// Nested/Children Routes
import { HomeRoutes } from '/imports/routes/pages/Home';
import { SampleRoutes } from '/imports/routes/pages/Sample';
import { NotFoundRoutes } from '/imports/routes/pages/NotFound';

import { PendingProofsRoutes } from '/imports/routes/pages/PendingProofs';
import { ProofUploadRoutes } from '/imports/routes/pages/ProofUpload';
import { CreateSkillTreeRoutes } from '/imports/routes/pages/CreateSkillTree';
import { CreateCommunitySkillTreeRoutes } from '/imports/routes/pages/CreateCommunitySkillTree';

import { PostDetailsRoute } from '/imports/routes/pages/ViewPost';

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
      ...CreateSkillTreeRoutes,
      ...CreateCommunitySkillTreeRoutes,
      ...ProofUploadRoutes,
      ...PostDetailsRoute,
      ...NotFoundRoutes // * Keep last for Page not found
    ]
  }
];
