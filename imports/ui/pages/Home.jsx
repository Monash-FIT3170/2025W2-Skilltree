import { Meteor } from 'meteor/meteor';
import React, { Suspense, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from 'flowbite-react';

// Components
import { SampleView } from '/imports/ui/components/SampleView';
import { SkillTreeEdit } from '../components/SkillTree';
import { CommentSection } from '/imports/ui/components/CommentSection';
import { Fallback } from '/imports/ui/components/Fallback';
import { Outlet } from 'react-router-dom'; // If you're using React Router
import { UserContext } from '/imports/utils/contexts/UserContext';

export const Home = () => {
  const { username } = useContext(UserContext);

  return (
    <>
      <Helmet>
        <title>SkillTree - Home</title>
      </Helmet>
      <div className="p-2">
        <h1 className="text-3xl font-bold mt-2">
          Welcome @{username} to SkillTree!
        </h1>
        <Button color="green" size="sm" onClick={() => Meteor.logout()} pill>
          logout
        </Button>

        <SkillTreeEdit />
        <SampleView />

        <Suspense fallback={<Fallback />}>
          <Outlet /> {/* Renders child route if using nested routes */}
        </Suspense>

        <Suspense fallback={<Fallback />}>
          <CommentSection />
        </Suspense>
      </div>
    </>
  );
};
