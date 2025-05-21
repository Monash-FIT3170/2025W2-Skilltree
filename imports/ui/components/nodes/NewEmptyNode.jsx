import React from 'react';
import { Handle, Position } from '@xyflow/react';

export function NewEmptyNode({ data, isEmpty }) {
  const nodeBG = isEmpty
    ? '!bg-gray-300 p-2.5 rounded'
    : '!bg-emerald-300 p-2.5 rounded';
  return (
    <div className={`react-flow__node-default ${nodeBG}`}>
      <Handle type="target" position={Position.Top} />
      <div>
        <strong>{data.label || 'Untitled'}</strong>
        <button onClick={data.onOpenEditor} className="block mt-2">
          <div>{isEmpty ? 'Edit' : 'ReviewEdit'}</div>
        </button>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
