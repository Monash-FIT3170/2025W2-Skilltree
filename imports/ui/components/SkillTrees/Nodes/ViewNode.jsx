import { Handle, Position } from '@xyflow/react';
import React from 'react';

export function ViewNode({ data, isUnlocked }) {
  const progress = isUnlocked
    ? Math.floor((data.currentNetUpvotes / data.netUpvotesRequired) * 100)
    : 0;

  const displayColour = isUnlocked ? '#328E6E' : '#8C8C8C';
  const ringClasses = `focus:ring-2 focus:ring[#328E6E]] focus:ring-offset-2 hover:ring-2 hover:ring-[#328E6E] hover:ring-offset-2`;

  return (
    <div
      className={`react-flow__node-default p-2.5 rounded focus:outline-none ${ringClasses}`}
      style={{ backgroundColor: displayColour }}
      onClick={data.onOpenEditor}
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
      <div className="flex flex-col items-center z-10">
        <strong className="text-white text-center">
          {data.label || 'Untitled'}
        </strong>
        <br />
        {isUnlocked ? (
          <div className="w-full bg-gray-700 relative">
            {progress > 0 && (
              <div
                className="bg-[#FBBC05] absolute left-0 top-0 bottom-0 rounded-half"
                style={{ width: `${progress}%` }}
              />
            )}
            <span className="relative text-xs text-white block text-center p-0.5">
              {`${data.currentNetUpvotes || 0} / ${data.netUpvotesRequired}`}
            </span>
          </div>
        ) : (
          <div className="text-gray-300 text-xs text-center">Locked</div>
        )}
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
