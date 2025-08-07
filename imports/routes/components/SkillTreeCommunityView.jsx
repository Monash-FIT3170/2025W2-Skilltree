import React from 'react';

// Element JSX Component/Layout
import { SkillTreeCommunityView } from '../../ui/components/SkillTrees/SkillTreeCommunityView';
import { CommunityLeaderboardModal } from '../../ui/components/SkillTrees/Leaderboard/CommunityLeaderboardModal.jsx';

import { CommunityLeaderboardRoutes } from '/imports/routes/pages/CommunityLeaderboard';

export const SkillTreeCommunityViewRoutes = [
  {
    path: ':id/',
    element: <SkillTreeCommunityView />,
    children: [{ path: 'leaderboard', element: <CommunityLeaderboardModal /> }]
  }
];
