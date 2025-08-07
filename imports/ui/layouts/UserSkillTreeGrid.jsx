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
            userId: 1,
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
    // <div className="flex justify-center px-4 sm:px-8 md:px-12 lg:px-20" >
    //   <div className="flex flex-wrap gap-5 justify-center ">
        
    <div>
      <div className="grid grid-cols-3 gap-5 w-full auto-rows-auto">
        {dWidgets.map((widget, i) => (
          <><UserSkillTree key={widget.userId} onClick={() => handleCardClick(i)} title={widget.title} icon={widget.icon}/>
          </>
        ))}
      </div>
    </div>
  );
};
