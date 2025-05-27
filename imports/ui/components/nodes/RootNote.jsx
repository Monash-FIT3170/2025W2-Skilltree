import React from 'react';
import { Handle, Position } from '@xyflow/react';

export function RootNode() {
  return (
    <div
      className={`react-flow__node-default !bg-[#03A64A] flex items-center justify-center`}
      style={{ borderRadius: '40%', width: '80px', height: '60px' }}
    >
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
      <div>
        <img src="/images/logo.png" alt="Skilltree Icon" className="w-8 h-8" />
      </div>
    </div>
  );
}
