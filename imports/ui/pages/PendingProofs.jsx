import React from 'react';
import { Helmet } from 'react-helmet';


import { ProofsPostList } from '/imports/ui/components/ProofsPostList';
import SearchBar from '../components/SearchBar';

export const PendingProofs = () => (
  <>
    <Helmet>
      <title>SkillTree - Pending Proofs</title>
    </Helmet>
    <div className="p-2">
      <h1 className="text-3xl font-bold mt-2">Pending Proofs Page</h1>
      <SearchBar />

      {/* Render PostList below the header */}
      <ProofsPostList />

    
    </div>
  </>
);
