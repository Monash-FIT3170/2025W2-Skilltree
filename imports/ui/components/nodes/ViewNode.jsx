import React, { useState } from 'react';
import { Handle, Position } from '@xyflow/react';

export function ViewNode({ data, isUnlocked }) {
  const [isHovering, setIsHovering] = useState(false);

  let bgColour;

  const progress = isUnlocked
    ? Math.floor((data.progressXp / data.xpPoints) * 100)
    : 0;

  bgColour = isUnlocked
    ? isHovering
      ? '!bg-[#025940]'
      : '!bg-[#328E6E]'
    : '!bg-[#8C8C8C]';

  const ringClasses = isUnlocked
    ? 'focus:ring-2 focus:ring-[#328E6E] focus:ring-offset-2 hover:ring-2 hover:ring-[#328E6E] hover:ring-offset-2'
    : '';

  return (
    <div
      className={`react-flow__node-default ${bgColour} p-2.5 rounded 
                  focus:outline-none ${ringClasses}`}
      onClick={isUnlocked ? data.onOpenEditor : null}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
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
        {isUnlocked && (
          <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
            <div
              className="bg-[#FBBC05] text-xs font-medium text-center p-1 leading-none rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
        {!isUnlocked && (
          <div
            className={`
      absolute inset-0 flex items-center justify-center 
      transition-opacity duration-300 ease-in-out
      ${isHovering ? 'opacity-100' : 'opacity-0 pointer-events-none'}
    `}
          >
            <img
              src="/images/LockIcon.png"
              alt="Lock Icon"
              className="w-6 h-6"
            />
          </div>
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
