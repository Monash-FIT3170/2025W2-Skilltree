import React from 'react';
import { Helmet } from 'react-helmet';

import { ProofsPostList } from '/imports/ui/components/ProofsPostList';

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
      <ProofsPostList />
    </div>
  </>
);
