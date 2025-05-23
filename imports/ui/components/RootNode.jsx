import React from 'react';
import { Handle, Position } from 'reactflow';

export const RootNode = ({ id, data }) => {
  return (
    <div className="relative flex items-center justify-center w-[120px] h-[80px] rounded-[22px] bg-[#025940] shadow-md">
      <img
        src="/images/SkillNodeLogo.png"
        alt="Leaf Icon"
        className="w-8 h-8"
      />

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 rounded-full bg-[#328E6E] border-2 border-white"
      />
    </div>
  );
};
