import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubscribe, useFind } from 'meteor/react-meteor-data/suspense';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';
import { SkillTreeView } from '../SkillTrees/SkillTreeView';

export const SkillForestSplitView = ({ skillTreeIds, isAdmin = false }) => {
  const navigate = useNavigate();

  // Subscribe to skill trees
  useSubscribe('skilltrees');

  // Get all skill trees
  const skillTrees = useFind(
    SkillTreeCollection,
    [{ _id: { $in: skillTreeIds } }],
    [skillTreeIds]
  );

  if (!skillTreeIds || skillTreeIds.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-gray-50 border border-gray-200 rounded-lg">
        <p className="text-gray-500">No SkillTrees to display</p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full h-[65vh] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {skillTrees.map(tree => (
          <div
            key={tree._id}
            className="split-view-minimap w-full h-full bg-white rounded-lg shadow-md p-4 border border-gray-200"
          >
            <h3
              className="text-lg font-semibold text-[#328E6E] mb-2 cursor-pointer"
              onClick={() => navigate(`/skilltree/${tree._id}`)}
            >
              {tree.title}
            </h3>
            <div className="h-[calc(100%-2rem)]">
              <SkillTreeView id={tree._id} isAdmin={isAdmin} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
