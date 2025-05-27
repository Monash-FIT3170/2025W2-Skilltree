import React, { Suspense, useContext } from 'react';
import { Helmet } from 'react-helmet';

import { Fallback } from '/imports/ui/components/Fallback';
import { UserContext } from '/imports/utils/contexts/UserContext';
import { UserSkillTreeGrid } from '../layouts/UserSkillTreeGrid';

export const Dashboard = () => {
  const { username } = useContext(UserContext);

  return (
    <>
      <Helmet>
        <title>SkillTree - Dashboard</title>
      </Helmet>
      <div className="p-2">
        <h1 className="text-3xl font-bold mt-2">
          Welcome @{username} to SkillTree!
        </h1>

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
