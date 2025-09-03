import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { useSubscribe } from 'meteor/react-meteor-data/suspense';
import { useFind } from 'meteor/react-meteor-data/suspense';

// Import Collections
import { SkillForestCollection } from '../../api/collections/SkillForest';
import { SkillTreeCollection } from '../../api/collections/SkillTree';

// Import UI Components
import { SkillTreeView } from '../components/SkillTrees/SkillTreeView';
import { SkillForestView } from '../components/SkillForest/SkillForestView';
// import { Loader } from 'lucide-react';

export const SkillForest = () => {
  const { skillForestId } = useParams();

  // Subscribe to skill forests
  useSubscribe('skillforests');
  useSubscribe('skilltrees');

  const skillForest = useFind(
    SkillForestCollection,
    [{ _id: { $eq: skillForestId } }],
    [skillForestId]
  )[0];

  // const skillTrees = useFind(SkillTreeCollection, [
  //   { _id: { $in: skillForest?.skilltreeIds || [] } }
  // ]);

  // if (!skillForest) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <Loader className="animate-spin" />
  //     </div>
  //   );
  // }

  return (
    <>
      <Helmet>
        <title>{`${skillForest.title}`} - SkillTree</title>
      </Helmet>
      <div className="p-4 md:p-8 font-sans">
        <h1 className="text-4xl font-bold text-[#328E6E] mb-8">
          {skillForest.title}
        </h1>

        {/* Responsive Grid for Skill Trees */}
        {/* <div className="w-full h-[65vh] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {skillTrees.map(tree => (
            <div
              key={tree._id}
              className="w-full h-full bg-white rounded-lg shadow-md p-4 border-gray-200"
            >
              <SkillTreeView id={tree._id} isAdmin={false} />
            </div>
          ))}
        </div> */}
        {/* Display description if it exists */}
        {skillForest?.description && (
          <div className="mb-8">
            <div className="bg-gray-50 border-l-4 border-[#328E6E] p-4 rounded-r-lg">
              <p className="text-gray-700 leading-relaxed text-lg">
                {skillForest.description}
              </p>
            </div>
          </div>
        )}
        <SkillForestView
          skillTreeIds={skillForest.skilltreeIds || []}
          isAdmin={false}
        />
      </div>
    </>
  );
};
