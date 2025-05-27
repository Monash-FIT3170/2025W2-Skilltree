import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet';

import { Fallback } from '/imports/ui/components/Fallback';
import { UserSkillTreeGrid } from '../layouts/UserSkillTreeGrid';

export const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>SkillTree - Dashboard</title>
      </Helmet>
      <div className="p-2">
        <h3 className="font-sans text-[30px] font-bold text-left">
          MY SKILLTREES
        </h3>

        <Suspense fallback={<Fallback />}>
          <UserSkillTreeGrid />
        </Suspense>
      </div>
    </>
  );
};
