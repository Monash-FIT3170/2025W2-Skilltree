import React from 'react';
import { Handle, Position } from 'reactflow';

// Root node of the skilltree
export const RootNode = ({ id, data }) => {
  return (
    <div className="relative flex items-center justify-center w-[120px] h-[80px] rounded-[22px] bg-[#025940] shadow-md">
      <img
        src="/images/SkillNodeLogo.png"
        alt="Leaf Icon"
        className="w-8 h-8"
      />
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
        {/* Add a new child node from the root */}
        <button
          type="button"
          onClick={() => data.onAddChild(id)}
          className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-green-100"
        >
          <img src="/images/AddIcon.png" alt="Add Child" className="w-4 h-4" />
        </button>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 rounded-full bg-[#328E6E] border-2 border-white"
      />
    </div>
  );
};
