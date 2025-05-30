import React from 'react';

// Element JSX Component/Layout
import { SkillTreeCommunity } from '/imports/ui/pages/SkillTreeCommunity';

// Nested/Children Routes
import { SkillTreeCommunityViewRoutes } from '/imports/routes/components/SkillTreeCommunityView';

export const SkillTreeCommunityRoutes = [
  {
    path: 'skilltree/',
    element: <SkillTreeCommunity />,
    children: [
      // Extends children array with nested routes via spread operator (...)
      ...SkillTreeCommunityViewRoutes
    ]
  }
];
