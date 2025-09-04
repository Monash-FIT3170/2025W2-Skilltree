import React from 'react';

// Element JSX UI
import { SkillForest } from '/imports/ui/pages/SkillForest';

// Define Routes for Skill Forest display page
export const SkillForestRoutes = [
  { path: '/skillforest/:skillForestId', element: <SkillForest /> }
];
