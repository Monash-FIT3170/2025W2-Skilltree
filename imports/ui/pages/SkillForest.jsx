import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { useSubscribeSuspense } from 'meteor/communitypackages:react-router-ssr';
import { useFind } from 'meteor/react-meteor-data/suspense';

// Import Collections
import { SkillForestCollection } from '../../api/collections/SkillForest';
import { SkillTreeCollection } from '../../api/collections/SkillTree';

export const SkillForest = () => {
  const { skillForestId } = useParams();

  // Subscribe to skill forests
  useSubscribeSuspense('skillforests');
  useSubscribeSuspense('skilltrees');

  const skillForest = useFind(
    SkillForestCollection,
    [{ _id: { $eq: skillForestId } }],
    [skillForestId]
  )[0];

  const skillTrees = useFind(SkillTreeCollection, [
    { _id: { $in: skillForest?.skilltreeIds || [] } }
  ]);

  return (
    <div>
      <h1>Skill Forest Page</h1>
      <p>Forest ID: {skillForestId}</p>
      <p>Forest Title: {skillForest?.title || 'Loading...'}</p>
      <p>Skill Trees Count: {skillTrees.length}</p>
    </div>
  );
};
