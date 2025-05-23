import React from 'react';
import { Helmet } from 'react-helmet';

import { AddNodesSkillTree } from '/imports/ui/components/AddNodesSkillTree';

export const CreateCommunitySkillTree = () => (
  <>
    <Helmet></Helmet>
    <div className="p-2">
      <div className="relative p-6 h-20">
        {/* Top-right title */}
        <div className="top-6 left-6">
          <h2 className="text-4xl font-bold" style={{ color: '#328E6E' }}>
            Create SkillTree
          </h2>
        </div>
      </div>
      {/* Render component to add nodes to SkillTree*/}
      <AddNodesSkillTree />
    </div>
  </>
);
