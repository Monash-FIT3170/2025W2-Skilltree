import React from 'react';
import { useCallback, useRef } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowProvider
} from '@xyflow/react';
import { NewEmptyNode } from './nodes/NewEmptyNode';
import { AppNode } from './nodes/types';

export const SkillTreeLogic = () => {
  const initialNodes = [
    {
      id: '0',
      type: 'input',
      data: { label: 'test root' },
      position: { x: 0, y: 0 }
    }
  ];
  let id = 1;
  const getId = () => `${id++}`;
  const nodeOrigin = [0.5, 0];
  const initialEdges = [];

  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const { screenToFlowPosition } = useReactFlow();

  const onConnectEnd = useCallback(
    (event, connectionState) => {
      // when a connection is dropped on the pane it's not valid
      if (!connectionState.isValid) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const id = getId();
        const { clientX, clientY } =
          'changedTouches' in event ? event.changedTouches[0] : event;
        const newNode = {
          id,
          type: 'new-empty',
          position: screenToFlowPosition({
            x: clientX,
            y: clientY
          }),
          data: { label: `Node ${id}`, onEdit: handleNodeEdit(id) },
          origin: [0.5, 0.0]
        };

        setNodes(nds => nds.concat(newNode));
        setEdges(eds =>
          eds.concat({ id, source: connectionState.fromNode.id, target: id })
        );
      }
    },
    [screenToFlowPosition]
  );

  const handleNodeEdit = nodeId => event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const label = formData.get('title') || 'Untitled';

    setNodes(nodes =>
      nodes.map(node =>
        node.id === nodeId
          ? {
              ...node, // ✅ spread operator aligned under `{`
              data: {
                ...node.data, // ✅ nested spread also aligned
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
      <div style={{ width: '100vw', height: '60vh' }} ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          edges={edges}
          // edgeTypes={edgeTypes}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onConnectEnd={onConnectEnd}
          fitView
          nodeOrigin={nodeOrigin}
        >
          <Background />
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>
    </>
  );
};

export const SkillTree = () => (
  <ReactFlowProvider>
    <SkillTreeLogic />
  </ReactFlowProvider>
);
