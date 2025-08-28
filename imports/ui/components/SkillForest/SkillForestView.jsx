import React from 'react';
import { ReactFlowProvider } from '@xyflow/react';

// Basic wrapper component
export const SkillForestView = ({
  skillTreeIds,
  isAdmin = false,
  spacing = 800
}) => {
  if (!skillTreeIds || skillTreeIds.length === 0) {
    return <div>No skill trees to display</div>;
  }

  return (
    <ReactFlowProvider>
      <div>SkillForest View - Coming Soon</div>
    </ReactFlowProvider>
  );
};
