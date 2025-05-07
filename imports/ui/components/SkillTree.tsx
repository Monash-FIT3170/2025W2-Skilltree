import React from 'react';
import { useCallback } from 'react';
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
    }]
  
    const initialEdges = [
      { id: 'a->c', source: 'a', target: 'c', animated: true },
      { id: 'b->d', source: 'b', target: 'd' },
      { id: 'c->d', source: 'c', target: 'd', animated: true },
    ];
    
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
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
    <div style={{width: "100vw", height: "60vh"}}> 
    <ReactFlow
      nodes={nodes}
      // nodeTypes={nodeTypes}
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
