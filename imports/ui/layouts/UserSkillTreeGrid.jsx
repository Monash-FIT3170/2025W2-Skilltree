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


  // if (!skillTreeWidget) {
  //   return (
  //     <div className="w-100 h-40 bg-gray-200 border-2 border-gray-300 rounded-lg flex items-center justify-center text-gray-500">
  //       <div>No Skill Tree Widget Found.</div>
  //     </div>
  //   );
  // }

  // // Optional chaining to safely access the arrays
  // const skillNames = skillTreeWidget.dummyskillTreeNames ?? [];
  // const skillIcons = skillTreeWidget.dummyskillTreeIcons ?? [];

  const handleCardClick = index => {
    alert(`Clicked card ${index + 1}`);
  };

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-3 gap-x-16 gap-y-10 p-1">
        {/* {Array.from({ length: dWidgets.length }).map((_, i) => (
          <UserSkillTree key={i} onClick={() => handleCardClick(i)} />
        ))} */}
        {dWidgets.map((widget, i) => (
          <><UserSkillTree key={i} onClick={() => handleCardClick(i)} /><div>
            <h3>{widget.title}</h3>
            <p>{widget.icon}</p>
          </div></>
        ))}
      </div>
    </div>
  );
};
