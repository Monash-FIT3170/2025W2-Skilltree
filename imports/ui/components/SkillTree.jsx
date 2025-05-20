import React, { useCallback, useRef, useState, useEffect } from 'react';
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
import { ViewNode } from './nodes/ViewNode';
import { EmptyNode } from './nodes/EmptyNode2';

export const SkillTreeLogic = () => {
  const nodeTypes = {
    'new-empty': NewEmptyNode,
    'view-node': ViewNode,
    'empty-node': EmptyNode
  };
  const initialNodes = [
    {
      id: '0',
      type: 'input',
      data: { label: 'test root' },
      position: { x: 0, y: 0 }
    }
  ];

  const idRef = useRef(1);
  const getId = () => `${idRef.current++}`;
  const nodeOrigin = [0.5, 0];
  const initialEdges = [];

  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [editingNode, setEditingNode] = useState(null);
  const { screenToFlowPosition } = useReactFlow();

  const nodesRef = useRef(nodes);
  useEffect(() => {
    nodesRef.current = nodes;
  }, [nodes]);

  const handleNodeEdit = useCallback(
    (nodeId, updatedData) => {
      setNodes(nodes =>
        nodes.map(node =>
          node.id === nodeId
            ? {
                ...node,
                data: {
                  ...node.data,
                  ...updatedData
                }
              }
            : node
        )
      );
    },
    [setNodes]
  );

  const handleOpenEditor = useCallback(id => {
    const editnode = nodesRef.current.find(n => n.id === id);
    if (editnode) {
      setEditingNode({
        id: editnode.id,
        ...editnode.data
      });
    }
  }, []);

  const onConnect = useCallback(
    connection => setEdges(eds => addEdge(connection, eds)),
    [setEdges]
  );

  const onConnectEnd = useCallback(
    (event, connectionState) => {
      if (!connectionState.isValid) {
        const id = getId();
        const { clientX, clientY } =
          'changedTouches' in event ? event.changedTouches[0] : event;
        const position = screenToFlowPosition({ x: clientX, y: clientY });

        const newNode = {
          id,
          type: 'new-empty',
          position,
          data: {
            label: `Node ${id}`,
            description: '',
            requirements: '',
            xpPoints: '',
            onOpenEditor: () => handleOpenEditor(id)
          },
          origin: nodeOrigin
        };

        setNodes(nds => nds.concat(newNode));
        setEdges(eds =>
          eds.concat({
            id: `e-${connectionState.fromNode.id}-${id}`,
            source: connectionState.fromNode.id,
            target: id
          })
        );
      }
    },
    [screenToFlowPosition, handleOpenEditor]
  );

  const onSave = () => {
    console.log('Nodes:', nodes);
    console.log('Edges:', edges);
  };

  return (
    <>
      <h1>Create SkillTree Metrics</h1>
      <button onClick={onSave}>Save</button>

      <div style={{ width: '100vw', height: '60vh' }} ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          edges={edges}
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

      {/* Modal rendered outside ReactFlow */}
      {editingNode && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}
        >
          <div
            style={{
              background: 'white',
              padding: 20,
              borderRadius: 8,
              width: '400px'
            }}
          >
            <h3>Edit Skill</h3>
            <form
              onSubmit={e => {
                e.preventDefault();
                const formData = new FormData(e.target);
                handleNodeEdit(editingNode.id, {
                  label: formData.get('title'),
                  description: formData.get('description'),
                  requirements: formData.get('requirements'),
                  xpPoints: formData.get('xpPoints')
                });
                setEditingNode(null);
              }}
            >
              <label>
                Skill Title:
                <input name="title" defaultValue={editingNode.label} />
              </label>
              <br />
              <label>
                Description:
                <input
                  name="description"
                  defaultValue={editingNode.description}
                />
              </label>
              <br />
              <label>
                Requirements:
                <input
                  name="requirements"
                  defaultValue={editingNode.requirements}
                />
              </label>
              <br />
              <label>
                XP Required:
                <input name="xpPoints" defaultValue={editingNode.xpPoints} />
              </label>
              <br />
              <div style={{ marginTop: 10 }}>
                <button type="submit">Save</button>
                <button
                  type="button"
                  onClick={() => setEditingNode(null)}
                  style={{ marginLeft: 10 }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export const SkillTree = () => (
  <ReactFlowProvider>
    <SkillTreeLogic />
  </ReactFlowProvider>
);
