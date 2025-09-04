import React, { useState } from 'react';
// import { Handle, Position } from '@xyflow/react';

// export function ViewNode({ data, isUnlocked }) {
//   const [isHovering, setIsHovering] = useState(false);

//   let displayColour;
//   let bgColour = isUnlocked ? '#328E6E' : '#8C8C8C';
//   let hoverBg = isUnlocked ? '#025940' : '#5a5b5a';

//   const progress = isUnlocked
//     ? Math.floor((data.progressXp / data.xpPoints) * 100)
//     : 0;

//   displayColour = isHovering ? hoverBg : bgColour;

//   const ringClasses = `focus:ring-2 focus:ring[#328E6E]] focus:ring-offset-2 hover:ring-2 hover:ring-[#328E6E] hover:ring-offset-2`;

//   return (
//     <div
//       className={`react-flow__node-default p-2.5 rounded focus:outline-none ${ringClasses}`}
//       style={{ backgroundColor: displayColour }}
//       onClick={data.onOpenEditor}
//       onMouseEnter={() => setIsHovering(true)}
//       onMouseLeave={() => setIsHovering(false)}
//     >
//       <Handle
//         type="target"
//         position={Position.Top}
//         style={{
//           width: '12px',
//           height: '12px',
//           backgroundSize: 'contain',
//           backgroundRepeat: 'no-repeat',
//           backgroundPosition: 'center',
//           backgroundColor: '#D9D9D9',
//           border: '#D9D9D9',
//           boxShadow: '0 4px 3px rgba(0, 0, 0, 0.1)'
//         }}
//       />
//       <div className="flex flex-col items-center z-10">
//         <strong className="text-white text-center">
//           {data.label || 'Untitled'}
//         </strong>
//         <br />
//         {isUnlocked && (
//           <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
//             <div
//               className="bg-[#FBBC05] text-xs font-medium text-center p-1 leading-none rounded-full"
//               style={{ width: `${progress}%` }}
//             ></div>
//           </div>
//         )}
//       </div>
//       <Handle
//         type="source"
//         position={Position.Bottom}
//         style={{
//           width: '12px',
//           height: '12px',
//           backgroundImage: `url('/images/AddIcon.png')`,
//           backgroundSize: 'contain',
//           backgroundRepeat: 'no-repeat',
//           backgroundPosition: 'center',
//           backgroundColor: '#D9D9D9',
//           border: '#D9D9D9',
//           boxShadow: '0 4px 4px rgba(29, 5, 5, 0.78)'
//         }}
//       />
//     </div>
//   );
// }


import { Handle, Position } from '@xyflow/react';

export function ViewNode({ data, isUnlocked }) {
  const progress = isUnlocked
    ? Math.floor((data.progressXp / data.xpPoints) * 100)
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
        {isUnlocked && (
          <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
            <div
              className="bg-[#FBBC05] text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
              style={{ width: `${progress}%` }}
            >
              {`${data.progressXp || 0} / ${data.xpPoints}`}
            </div>
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