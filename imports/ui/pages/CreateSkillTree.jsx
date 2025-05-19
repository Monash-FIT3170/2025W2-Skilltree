import React from 'react';
import { Helmet } from 'react-helmet';

// JSX UI
import { CreateTreeForm } from '/imports/ui/components/CreateTreeForm';

export const CreateSkillTree = () => (
  <>
    <Helmet></Helmet>
    <div className="p-2">
      {/* Render create tree form */}
      <CreateTreeForm />
    </div>
  </>
);
