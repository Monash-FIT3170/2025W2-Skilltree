import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';

export const SkillNode = ({ data, id }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(data.title || 'New Skill');

  const handleEdit = event => {
    event.stopPropagation();
    setIsEditing(true);
  };

  const handleSave = () => {
    data.onTitleChange(id, title);
    setIsEditing(false);
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <div className="relative flex flex-col items-center w-[180px] h-[100px] rounded-[22px] bg-[#328E6E] shadow-md">
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 rounded-full bg-[#328E6E] border-2 border-white"
      />
      <div className="flex flex-col items-center justify-start w-full h-full pt-4">
        {isEditing ? (
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="text-white bg-[#328E6E] border-b border-white text-center font-normal focus:outline-none px-2 py-1 w-[80%]"
            autoFocus
          />
        ) : (
          <span className="text-white font-normal text-center px-2">
            {title}
          </span>
        )}
      </div>
      <button
        type="button"
        onClick={handleEdit}
        className="absolute bottom-2 right-2 w-6 h-6 flex items-center justify-center text-white hover:text-green-200"
      >
        <img src="/images/EditIcon.png" alt="Edit Title" className="w-4 h-4" />
      </button>
      {}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
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
