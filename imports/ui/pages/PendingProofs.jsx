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
    <div className="p-2">
      <h1 className="p-4 bg-[#328E6E]"><b>Community</b></h1>
      <SearchBar />

      {/* Render PostList below the header */}
      <ProofsPostList />
    </div>
  </>
);
