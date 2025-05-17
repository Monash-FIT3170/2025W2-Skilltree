import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { Outlet } from 'react-router-dom';

import { UserSkillTreeGrid } from '../layouts/UserSkillTreeGrid';

export const ProfileDashboard = () => (
  <>
    <Helmet>
      <title>Your Dashboard - Skilltree</title>
    </Helmet>
    <div className="py-5 px-35">
      <div className="flex justify-between items-center mb-4">
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Friends
        </button>
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          + SkillTree
        </button>
      </div>
      <h1 className="font-bold text-[45px] text-black font-sans">
        SkillTree User
      </h1>
      <h3 className="font-sans text-[30px] font-bold text-center">
        Your Skilltrees
      </h3>
      <UserSkillTreeGrid />
    </div>
  </>
);
