import React from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';

export function NewEmptyNode({ data, id, onOpenEditor }: NodeProps<any> & { onOpenEditor: () => void }) {
  return (
    <div className="react-flow__node-default" style={{ padding: '10px' }}>
      <Handle type="target" position={Position.Top} />
      <div>
        <strong>{data.label || 'Untitled'}</strong>
        <button onClick={onOpenEditor} style={{ display: 'block', marginTop: '8px' }}>
          Edit
        </button>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
