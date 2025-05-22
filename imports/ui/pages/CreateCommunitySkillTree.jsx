import React from 'react';
import { Helmet } from 'react-helmet';

import { AddNodesSkillTree } from '/imports/ui/components/AddNodesSkillTree';

export const CreateCommunitySkillTree = () => (
  <>
    <Helmet></Helmet>
    <div className="p-2">
      {/* Render component to add nodes to SkillTree*/}
      <AddNodesSkillTree />
    </div>
  </>
);
