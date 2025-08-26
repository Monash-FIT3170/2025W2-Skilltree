import { ReactFlowProvider } from '@xyflow/react';
import { useSubscribeSuspense } from 'meteor/communitypackages:react-router-ssr';
import { useFind } from 'meteor/react-meteor-data/suspense';
import React, { useEffect, useState } from 'react';
import { SkillTreeLogic } from './SkillTree';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';
import { Meteor } from 'meteor/meteor';

export const SkillTreeView = ({ id, isAdmin, onBack }) => {
  useSubscribeSuspense('skilltrees');

  // Always call useFind at the top level - but don’t necessarily use it right away
  const fallbackSkillTree = useFind(
    SkillTreeCollection,
    [
      { _id: { $eq: id } },
      {
        fields: {
          skillNodes: 1,
          skillEdges: 1
        }
      }
    ],
    [id]
  )[0];

  const [skilltree, setSkilltree] = useState(null);

  //Check if user has a saved progress
  useEffect(() => {
    Meteor.call('getSubscription', id, (err, res) => {
      if (res) {
        console.log('Progress found - subscribed');
        console.log(res);
        setSkilltree(res);
      } else {
        console.log('No progress found - not subscribed');
        setSkilltree(fallbackSkillTree);
      }
    });
  }, [id, fallbackSkillTree]);

  if (!skilltree) {
    return <div>Loading...</div>;
  }

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
