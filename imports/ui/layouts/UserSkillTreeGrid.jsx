import React from 'react';
import { UserSkillTree } from '../components/UserSkillTreeTM';
import { Meteor } from 'meteor/meteor';
import { useFind } from 'meteor/react-meteor-data/suspense';
import { useSubscribeSuspense } from 'meteor/communitypackages:react-router-ssr';

// Collections & Components
//testing again
import { DashboardWidgetsCollection } from '/imports/api/collections/DashboardWidgets';


export const UserSkillTreeGrid = () => {
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

  // Empty state UI
  if (dWidgets.length === 0) return <div>No dashboard widgets found.</div>;

  const handleCardClick = index => {
    alert(`Insert Link ${index + 1}`);
  };

  return (
    <div className="flex justify-center px-4 sm:px-8 md:px-12 lg:px-20" >
      <div className="flex flex-wrap gap-5 justify-center ">
        {/* {Array.from({ length: dWidgets.length }).map((_, i) => (
          <UserSkillTree key={i} onClick={() => handleCardClick(i)} />
        ))} */}
        {dWidgets.map((widget, i) => (
          <><UserSkillTree key={i} onClick={() => handleCardClick(i)} title={widget.title} icon={widget.icon} /><div>

          </div></>
        ))}
      </div>
    </div>
  );
};
