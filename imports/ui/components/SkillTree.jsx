import React from 'react';
import { useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState
} from '@xyflow/react';
import { NewEmptyNode } from './nodes/NewEmptyNode';
import { AppNode } from './nodes/types';

export const SkillTree = () => {
  const initialNodes = [
    {
      id: '1',
      type: 'input',
      data: { label: 'Skill 1' },
      position: { x: 0, y: 0 }
    },
    {
      id: '2',
      data: { label: 'Skill 2' },
      position: { x: 100, y: 0 }
    },
    {
      id: '3',
      data: { label: 'Skill 3' },
      position: { x: 200, y: 0 }
    },
    {
      id: '4',
      type: 'new-empty',
      data: { label: 'NewNode' },
      position: { x: 200, y: 100 }
    }
  ];

  const initialEdges = [
    { id: '1->3', source: '1', target: '3', animated: true },
    { id: '2->3', source: '2', target: '3' },
    { id: '1->2', source: '1', target: '2', animated: true }
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const handleNodeEdit = nodeId => event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const label = formData.get('title') || 'Untitled';

    setNodes(nodes =>
      nodes.map(node =>
        node.id === nodeId
          ? {
            ...node,
            data: {
              ...node.data,
              label
            }
          }
          : node
      )
    );
  };

  const onConnect = useCallback(
    connection => setEdges(edges => addEdge(connection, edges)),
    [setEdges]
  );

  const onSave = () => {
    console.log(edges);
    console.log(nodes);
  };

  const nodeTypes = {
    'new-empty': NewEmptyNode
  };

  return (
    <>
      <h1>Create SkillTree Metrics</h1>
      <button onClick={onSave}> Save</button>
      <div style={{ width: '100vw', height: '60vh' }}>
        <ReactFlow
          nodes={nodes.map(node =>
            node.type === 'new-empty'
              ? {
                ...node,
                data: {
                  ...node.data,
                  onEdit: handleNodeEdit(node.id)
                }
              }
              : node
          )}
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
    </>
  );
};
