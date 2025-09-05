import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { Meteor } from 'meteor/meteor';

// JSX UI
import { useSubscribe, useFind } from 'meteor/react-meteor-data/suspense';
import { useParams } from 'react-router-dom';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';
import { ProofsList } from '../components/Proofs/ProofsList';
import { NavigationMenu } from '../components/SkillTrees/NavigationMenu';

import { SubscriptionsCollection } from '/imports/api/collections/Subscriptions';

export const PendingProofs = () => {
  const { skilltreeId } = useParams();

  useSubscribe('skilltrees');
  const skilltree = useFind(
    SkillTreeCollection,
    [
      { _id: { $eq: skilltreeId } },
      {
        fields: {
          title: 1,
          description: 1,
          termsAndConditions: 1
        }
      }
    ],
    [skilltreeId]
  )[0];

  // Get the current user's role in this skilltree using useFind
  const userId = Meteor.userId();
  const userProgress = useFind(
    SubscriptionsCollection,
    [
      { userId: { $eq: userId }, skillTreeId: { $eq: skilltreeId } },
      { fields: { roles: 1 } }
    ],
    [userId, skilltreeId]
  )[0];
  const userRoles = userProgress?.roles || [];
  if (userRoles.length > 0) {
    console.log('User roles in this skilltree:', userRoles);
  } else {
    console.log('No roles found for user in this skilltree.');
  }

  // ...existing code...

  if (!skilltree) return <div>Skill Tree not found</div>;

  return (
    <>
      <Helmet>
        <title>SkillTree - Pending Proofs</title>
      </Helmet>
      <div className="p-2">
        <NavigationMenu id={skilltreeId} />
        {/* Responsive container for ProofsList */}
        <Suspense>
          <ProofsList skilltreeId={skilltreeId} />
        </Suspense>
      </div>
    </>
  );
};
