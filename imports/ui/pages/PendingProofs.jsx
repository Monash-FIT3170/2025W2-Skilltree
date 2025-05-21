import React from 'react';
import { Helmet } from 'react-helmet';

// JSX UI
import { ProofsPostList } from '/imports/ui/components/ProofsPostList';
import SearchBar from '../components/SearchBar';

export const PendingProofs = () => (
  <>
    <Helmet>
      <title>SkillTree - Pending Proofs</title>
    </Helmet>
    <div className="p-5">
      <button className="min-w-60 text-white-600 rounded-xl bg-[#328E6E]">
        <h1 className="p-4">
          <b>
            <p className="text-white ...">Rock Climbing </p>
          </b>
        </h1>
      </button>
      <SearchBar />

      {/* Render PostList below the header */}
      <ProofsPostList />
    </div>
  </>
);
