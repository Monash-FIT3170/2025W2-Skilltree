import React from 'react';
import { useFind } from 'meteor/react-meteor-data/suspense';
import { useSubscribeSuspense } from 'meteor/communitypackages:react-router-ssr';
import { Meteor } from 'meteor/meteor';

import { DashboardWidgetsCollection } from '/imports/api/collections/DashboardWidgets';

export const UserSkillTree = ({ onClick, title, icon }) => {

    useSubscribeSuspense('dashboardWidgets');
      const dWidgets =
        useFind(DashboardWidgetsCollection, [
          {},
          {
            fields: {
              title: 1,
              icon: 1
            }
          }
        ]) ?? [];

  return (
    <div
      onClick={onClick}
      className="w-100 h-40 bg-[#328e6e] border-2 border-gray-300  hover:border-[#025940] rounded-lg flex items-center justify-center cursor-pointer transition duration-200 shadow-sm hover:shadow-md text-white"
    >
      <h1>{title}</h1>
      <span className="text-2xl font-bold">{icon}</span>
      
    </div>
  );
};
