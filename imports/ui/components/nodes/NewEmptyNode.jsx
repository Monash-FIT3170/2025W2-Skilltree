import React from 'react';
import { Handle, Position } from '@xyflow/react';

export function NewEmptyNode({ data, isEmpty }) {
  const nodeBG = isEmpty
    ? '!bg-[#8C8C8C] p-2.5 rounded'
    : '!bg-[#328E6E] p-2.5 rounded';
  return (
    <div
      className={`react-flow__node-default ${nodeBG}`}
      style={{ boxShadow: '0 4px 5px rgba(29, 5, 5, 0.78)' }}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{
          width: '12px',
          height: '12px',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundColor: '#D9D9D9',
          border: '#D9D9D9',
          boxShadow: '0 4px 3px rgba(0, 0, 0, 0.1)'
        }}
      />
      <div className="flex flex-col items-center justify-center">
        <strong className="text-white text-center">
          {isEmpty ? 'New Node' : data.label}
        </strong>
        <button
          onClick={data.onOpenEditor}
          className="block mt-2 w-8 h-8 p-1 rounded hover:bg-gray-600"
        >
          <img
            src="/images/EditIcon.png"
            alt="Edit Title"
            className="w-5 h-5"
          />
        </button>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          width: '12px',
          height: '12px',
          backgroundImage: `url('/images/AddIcon.png')`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundColor: '#D9D9D9',
          border: '#D9D9D9',
          boxShadow: '0 4px 4px rgba(29, 5, 5, 0.78)'
        }}
      />
    </div>
  );
}
