import { Meteor } from 'meteor/meteor';
import React, { Suspense, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from 'flowbite-react';

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

        <Button color="green" size="sm" onClick={() => Meteor.logout()} pill>
          logout
        </Button>

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
