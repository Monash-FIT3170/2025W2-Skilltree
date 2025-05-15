import React from 'react';
import { useCallback } from 'react';
import { NewEmptyNode } from './nodes/NewEmptyNode';
import { CustomNode } from './nodes/CustomNode';
import { AppNode } from './nodes/types';

import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  type OnConnect,
} from '@xyflow/react';

export const SkillTree = () => {
  const handleNodeEdit = (nodeId) => (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const label = formData.get('title') || 'Untitled';

    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              data: {
                ...node.data,
                label,
              },
            }
          : node
      )
    );
  };
  
  const initialNodes = [
    {
      id: '1',
      type: 'input',
      data: { label: 'Skill 1' },
      position: { x: 0, y: 0 },
    },
    {
      id: '2',
      data: { label: 'Skill 2' },
      position: { x: 100, y: 0 },
    },
    {
      id: '3',
      data: { label: 'Skill 3' },
      position: { x: 200, y: 0 },
    },
    { id: '4', 
      type: 'new-empty', 
      position: { x: 100, y: 100 }, 
      data: { label: 'custom position node' , onEdit: handleNodeEdit('4')} 
    },
    // { id: '5', 
    //   type: 'custom-template', 
    //   position: { x: 100, y: 70 }, 
    //   data: { label: 'custom position node' } 
    // },
  ]

  const initialEdges = [
    { id: 'a->c', source: '1', target: '2', animated: true },
    { id: 'b->d', source: '3', target: '2' },
    { id: 'c->d', source: '1', target: '3', animated: true },
  ];

  const nodeTypes ={
    'new-empty': NewEmptyNode,
    'custom-template': CustomNode,
  }

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );

  const onSave = (() => {
    console.log(edges)
    console.log(nodes)
  })

  
  return (
    <>
      <h1>Create SkillTree Metrics</h1>
      <button onClick={onSave}> Save</button>
      <div style={{ width: "100vw", height: "60vh" }}>
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          edges={edges}
          // edgeTypes={edgeTypes}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Background />
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>
    </>)
};
