import React from 'react';
import { Helmet } from 'react-helmet';
import { SkillTree } from '../components/SkillTree';

// JSX UI
import { useParams } from 'react-router-dom';

export const SkillTreeCommunity = () => {
  const { name } = useParams(); // Extract the name parameter from the URL if exists

  return (
    <>
      <Helmet>
        <title>SkillTree - Community Page</title>
      </Helmet>
      <div className="p-2">
        <h1 className="text-3xl font-bold mt-2">Welcome to {name}!</h1>
        Ok so this page should mainly just load the react flow tree and have a
        dropdown to navigate to other pages
      </div>
      <SkillTree />
    </>
  );
};
