import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet';

// JSX UI
import { useSubscribe, useFind } from 'meteor/react-meteor-data/suspense';
import { useParams } from 'react-router-dom';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';
import { DashboardLoadingState } from '../components/Dashboard/LoadingState';
import { ProofsList } from '../components/Proofs/ProofsList';
import { NavigationMenu } from '../components/SkillTrees/NavigationMenu';

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

  if (!skilltree) return <div>Skill Tree not found</div>;

  return (
    <>
      <Helmet>
        <title>SkillTree - Pending Proofs</title>
      </Helmet>
      <div className="p-2">
        <NavigationMenu id={skilltreeId} />
        {/* Responsive container for ProofsList */}
        <Suspense fallback={<DashboardLoadingState />}>
          <ProofsList skilltreeId={skilltreeId} />
        </Suspense>
      </div>
    </>
  );
};
