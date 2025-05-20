import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { Outlet } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

import { UserSkillTreeGrid } from '../layouts/UserSkillTreeGrid';

export const ProfileDashboard = () => {
  const user = useTracker(() => Meteor.user());
  return (
    <>
      <Helmet>
        <title>Your Dashboard - Skilltree</title>
      </Helmet>

      <div className="py-5 px-35">
        <div className="flex justify-between items-center mb-4">
          <button className="bg-[#03A64A] hover:bg-[#025940] text-white font-bold py-2 px-4 rounded">
            Friends
          </button>
          <button className="bg-[#03A64A] hover:bg-[#025940] text-white font-bold py-2 px-4 rounded">
            + SkillTree
          </button>
        </div>
        <h1 className="font-bold text-[45px] text-black font-sans">
          {user ? `Welcome ${user.username}!` : 'Welcome! Please log in.'}
        </h1>
        <h3 className="font-sans text-[30px] font-bold text-left">
          MY SKILLTREES
        </h3>
        <UserSkillTreeGrid />
      </div>
    </>
  );
};
