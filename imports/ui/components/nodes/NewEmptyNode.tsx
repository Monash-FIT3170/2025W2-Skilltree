import React from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';

export function NewEmptyNode({ data, isEmpty }: NodeProps<any> & { onOpenEditor: () => void }) {
  return (
    <div className="react-flow__node-default" style={{ padding: '10px' }}>
      <Handle type="target" position={Position.Top} />
      <div>
        <strong>{data.label || 'Untitled'}</strong>
        <button onClick={data.onOpenEditor} style={{ display: 'block', marginTop: '8px' }}>
          <div>{isEmpty ? "Edit" : "ReviewEdit"}</div>
        </button>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
