'use client';

import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  Controls
} from 'reactflow';
import { RootNode } from './RootNode';

const nodeTypes = {
  rootNode: RootNode
};

export const AddNodesSkillTree = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    connection => {
      const newEdge = {
        ...connection,
        type: 'smoothstep',
        style: {
          strokeWidth: 2,
          stroke: '#328E6E'
        }
      };
      setEdges(eds => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  useEffect(() => {
    const initialNodes = [
      {
        id: 'root',
        type: 'rootNode',
        position: { x: 400, y: 50 },
        data: {}
      }
    ];
    setNodes(initialNodes);
    setEdges([]);
  }, [setNodes, setEdges]);

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
        snapToGrid
        snapGrid={[15, 15]}
        minZoom={0.5}
        maxZoom={1.5}
        attributionPosition="bottom-right"
        nodesDraggable={true}
        selectNodesOnDrag={false}
      >
        <Background variant="dots" gap={15} size={1} color="#808080" />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default AddNodesSkillTree;
