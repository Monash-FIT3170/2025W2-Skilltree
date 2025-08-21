import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { useSubscribeSuspense } from 'meteor/communitypackages:react-router-ssr';
import { useFind } from 'meteor/react-meteor-data/suspense';
import { Loader } from 'lucide-react';

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

  if (!skillForest) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${skillForest.title}`} - SkillTree</title>
      </Helmet>
      <div className="p-4 md:p-8 font-sans">
        <h1 className="text-4xl font-bold text-[#328E6E] mb-8">
          {skillForest.title}
        </h1>
      </div>
    </>
  );
};
