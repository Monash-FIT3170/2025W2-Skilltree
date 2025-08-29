import React from 'react';
import { Helmet } from 'react-helmet';

// JSX UI
import { useSubscribeSuspense } from 'meteor/communitypackages:react-router-ssr';
import { useFind } from 'meteor/react-meteor-data/suspense';
import { useParams } from 'react-router-dom';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';
import { DashboardLoadingState } from '../components/Dashboard/LoadingState';
import { ProofsList } from '../components/Proofs/ProofsList';
import { SuspenseHydrated } from '../../utils/SuspenseHydrated';

export const PendingProofs = () => {
  const { skilltreeId } = useParams();

  useSubscribeSuspense('skilltrees');
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
      <div className="px-4 pt-4">
        <button className="min-w-60 text-white-600 rounded-xl bg-[#328E6E]">
          <h1 className="p-4">
            <b>
              <p className="text-white ...">{skilltree.title} </p>
            </b>
          </h1>
        </button>
        {/* Responsive container for ProofsList */}
        <SuspenseHydrated fallback={<DashboardLoadingState />}>
          <ProofsList skilltreeId={skilltreeId} />
        </SuspenseHydrated>
      </div>
    </>
  );
};
