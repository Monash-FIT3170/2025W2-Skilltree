import React from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';

export function ViewNode({ data }: NodeProps<any> & { onOpenEditor: () => void }) {
    const progress = Math.floor((data.progressXp / data.xpPoints) * 100)
    return (
        <div className={`react-flow__node-default !bg-emerald-300 p-2.5 rounded"`} onClick={data.onOpenEditor} >
            <Handle type="target" position={Position.Top} />
            <div>
                <strong>{data.label || 'Untitled'}</strong>
                <br />
                <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                    <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-1 leading-none rounded-full" style={{ width: `${progress}%` }}> </div>
                </div>
            </div>
            <Handle type="source" position={Position.Bottom} />
        </div>
    )
};