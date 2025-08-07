import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet';

// JSX UI
import { ProofsList } from '/imports/ui/components/ProofsList';
import { Fallback } from '/imports/ui/components/Fallback';
import { useParams } from 'react-router-dom';
import { useSubscribeSuspense } from 'meteor/communitypackages:react-router-ssr';
import { useFind } from 'meteor/react-meteor-data/suspense';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';

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
        <Suspense fallback={<Fallback msg={'Loading proofs...'} />}>
          <ProofsList />
        </Suspense>
      </div>
    </>
  );
};
