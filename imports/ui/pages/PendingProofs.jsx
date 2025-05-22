import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet';

// JSX UI
import { ProofsPostList } from '/imports/ui/components/ProofsPostList';
import { Fallback } from '/imports/ui/components/Fallback';

export const PendingProofs = () => (
  <>
    <Helmet>
      <title>SkillTree - Pending Proofs</title>
    </Helmet>
    <div className="px-4 pt-4">
      <button className="min-w-60 text-white-600 rounded-xl bg-[#328E6E]">
        <h1 className="p-4">
          <b>
            <p className="text-white ...">Rock Climbing </p>
          </b>
        </h1>
      </button>
      {/* Responsive container for ProofsPostList */}
      <Suspense fallback={<Fallback msg={'Loading posts...'} />}>
        <ProofsPostList />
      </Suspense>
    </div>
  </>
);
