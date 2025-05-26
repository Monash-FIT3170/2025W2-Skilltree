import React, { useState } from 'react';
import { Handle, Position } from '@xyflow/react';

export function ViewNode({ data, isUnlocked }) {
  //determine if node unlocked or locked - probably pass in another boolean parameter to ViewNode
  const [isHovering, setIsHovering] = useState(false);
  var bgColour;
  const progress = isUnlocked
    ? Math.floor((data.progressXp / data.xpPoints) * 100)
    : 0;
  bgColour = isUnlocked
    ? isHovering
      ? '!bg-emerald-600'
      : '!bg-emerald-300'
    : isHovering
      ? '!bg-gray-600'
      : '!bg-gray-300';

  return (
    <div
      className={`react-flow__node-default ${bgColour} p-2.5 rounded`}
      onClick={isUnlocked ? data.onOpenEditor : null}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Handle type="target" position={Position.Top} />
      <div>
        <strong>{data.label || 'Untitled'}</strong>
        <br />
        {isUnlocked && (
          <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
            <div
              className="bg-yellow-600 text-xs font-medium text-blue-100 text-center p-1 leading-none rounded-full"
              style={{ width: `${progress}%` }}
            >
              {' '}
            </div>
          </div>
        )}
        {!isUnlocked && isHovering && <div>Locked Node</div>}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
