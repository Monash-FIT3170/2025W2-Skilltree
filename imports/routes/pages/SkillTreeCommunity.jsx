import React from 'react';

// Element JSX Component/Layout
import { SkillTreeCommunity } from '/imports/ui/pages/SkillTreeCommunity';

export const SkillTreeCommunityRoutes = [
  {
    path: 'skilltree/:id',
    element: <SkillTreeCommunity />
  }
];
