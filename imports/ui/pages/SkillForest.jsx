import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { useSubscribe } from 'meteor/react-meteor-data/suspense';
import { useFind } from 'meteor/react-meteor-data/suspense';

// Import Collections
import { SkillForestCollection } from '../../api/collections/SkillForest';
// import { SkillTreeCollection } from '../../api/collections/SkillTree';

// Import UI Components
// import { SkillTreeView } from '../components/SkillTrees/SkillTreeView';
import { SkillForestUnifiedView } from '../components/SkillForest/SkillForestUnifiedView';
import { SkillForestSplitView } from '../components/SkillForest/SkillForestSplitView';

export const SkillForest = () => {
  const { skillForestId } = useParams();
  // const navigate = useNavigate();
  const [isUnifiedView, setIsUnifiedView] = useState(true);

  // Subscribe to skill forests
  useSubscribe('skillForests');
  useSubscribe('skilltrees');

  const skillForest = useFind(
    SkillForestCollection,
    [{ _id: { $eq: skillForestId } }],
    [skillForestId]
  )[0];

  return (
    <>
      <Helmet>
        <title>{`${skillForest.title}`} - SkillTree</title>
      </Helmet>

      <div className="p-4 md:p-8 font-sans">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-[#328E6E]">
            {skillForest.title}
          </h1>

          {/* View Toggle Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setIsUnifiedView(true)}
              className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
                isUnifiedView
                  ? 'bg-[#328E6E] text-white'
                  : 'bg-white text-[#328E6E] border border-[#328E6E]'
              }`}
            >
              Unified View
            </button>
            <button
              onClick={() => setIsUnifiedView(false)}
              className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
                !isUnifiedView
                  ? 'bg-[#328E6E] text-white'
                  : 'bg-white text-[#328E6E] border border-[#328E6E]'
              }`}
            >
              Split View
            </button>
          </div>
        </div>

        {/* Display description if it exists */}
        {skillForest?.description && (
          <div className="mb-6">
            <div className="bg-gray-50 border-l-4 border-[#328E6E] p-4 rounded-r-lg">
              <p className="text-gray-700 leading-relaxed text-lg">
                {skillForest.description}
              </p>
            </div>
          </div>
        )}

        {/* Conditional Rendering based on view mode */}
        {isUnifiedView ? (
          <div className="bg-white rounded-lg shadow-sm p-4 h-[70vh] min-h-[500px]">
            <SkillForestUnifiedView
              skillTreeIds={skillForest?.skilltreeIds || []}
              isAdmin={false}
            />
          </div>
        ) : (
          <SkillForestSplitView
            skillTreeIds={skillForest?.skilltreeIds || []}
            isAdmin={false}
          />
        )}
      </div>
    </>
  );
};
