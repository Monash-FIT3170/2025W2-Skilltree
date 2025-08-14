import React from 'react';

// Element JSX Component/Layout
import { SkillTreeCommunityView } from '/imports/ui/components/SkillTreeCommunityView';
import { CommunityLeaderboardModal } from '/imports/ui/components/CommunityLeaderboardModal.jsx';

export const SkillTreeCommunityViewRoutes = [
  {
    path: ':id/',
    element: <SkillTreeCommunityView />,
    children: [
      {path: 'leaderboard', element: <CommunityLeaderboardModal />}
    ]
  }
];
