import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { Outlet } from 'react-router-dom';

// JSX UI
import { Fallback } from '/imports/ui/components/Fallback';

export const SkillTreeCommunity = () => (
  <>
    <Helmet>
      <title>SkillTree - Community Page</title>
    </Helmet>
    <Suspense fallback={<Fallback />}>
      <Outlet />
    </Suspense>
  </>
);
