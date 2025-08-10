import { ReactFlowProvider } from '@xyflow/react';
import { useSubscribeSuspense } from 'meteor/communitypackages:react-router-ssr';
import { useFind } from 'meteor/react-meteor-data/suspense';
import React from 'react';
import { SkillTreeLogic } from './SkillTree';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';

export const SkillTreeView = ({ id, isAdmin, onBack }) => {
  useSubscribeSuspense('skilltrees');
  const skilltree = useFind(SkillTreeCollection, [
    { _id: { $eq: id } },
    {
      fields: {
        skillNodes: 1,
        skillEdges: 1
      }
    },
    [id]
  ])[0];

  return (
    <ReactFlowProvider>
      <SkillTreeLogic
        id={id}
        isAdmin={isAdmin}
        onSave={() => {}}
        savedNodes={skilltree.skillNodes}
        savedEdges={skilltree.skillEdges}
        onBack={onBack}
      />
    </ReactFlowProvider>
  );
};
