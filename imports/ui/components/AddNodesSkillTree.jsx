// filepath: imports/ui/components/AddNodesSkillTree.jsx
'use client';

import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  Controls
} from 'reactflow';

const nodeTypes = {};

export const AddNodesSkillTree = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    params => setEdges(eds => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="w-full h-[600px] border rounded-lg overflow-hidden bg-white">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background variant="dots" gap={15} size={1} color="#e2e8f0" />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default AddNodesSkillTree;
