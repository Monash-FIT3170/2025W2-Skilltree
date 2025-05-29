import React from 'react';

// Element JSX Component/Layout
import { SkillTreeCommunityView } from '/imports/ui/components/SkillTreeCommunityView';

export const SkillTreeCommunityViewRoutes = [
  {
    path: ':id',
    element: <SkillTreeCommunityView />
  }
];
