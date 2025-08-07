import React from 'react';

// Element JSX Component/Layout
import { SkillTreeCommunityView } from '/imports/ui/components/SkillTreeCommunityView';

import { CommunityLeaderboardRoutes } from '/imports/routes/pages/CommunityLeaderboard';

export const SkillTreeCommunityViewRoutes = [
  {
    path: ':id',
    element: <SkillTreeCommunityView />,
    children: [
      ...CommunityLeaderboardRoutes
    ]
  }
];
