import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { SkillTreeEdit } from '../components/SkillTree';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';
import { useParams } from 'react-router-dom';
import { NavigationDropdown } from '../components/NavigationDropdown';
import { useFind } from 'meteor/react-meteor-data/suspense';
import { useSubscribeSuspense } from 'meteor/communitypackages:react-router-ssr';

// JSX UI
import { Fallback } from '/imports/ui/components/Fallback';

export const SkillTreeCommunity = () => {
  // extract id from url params
  const { id } = useParams();

  useSubscribeSuspense('skilltrees');
  const skilltree = useFind(SkillTreeCollection, [{ _id: { $eq: id } }])[0];

  if (!skilltree) return <div>Skill Tree not found</div>;

  console.log('Nodes:', skilltree.skillNodes);
  console.log('Edges:', skilltree.skillEdges);

  return (
    <>
      <Helmet>
        <title>SkillTree - Community Page</title>
      </Helmet>
      <div className="p-2">
        <Suspense fallback={<Fallback />}>
          <NavigationDropdown id={id} />
        </Suspense>
        <h1 className="text-3xl font-bold mt-2">
          Welcome to {skilltree.title}!
        </h1>
        <div className="text-lg mt-2">
          <p>Description: {skilltree.description}</p>
          <p>Terms & Conditions: {skilltree.termsAndConditions}</p>
        </div>
      </div>
      <SkillTreeEdit
        isAdmin={false}
        onSave={() => {}}
        savedNodes={skilltree.skillNodes}
        savedEdges={skilltree.skillEdges}
      />
    </>
  );
};
