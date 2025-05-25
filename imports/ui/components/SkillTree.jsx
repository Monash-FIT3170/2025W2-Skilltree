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
import { SkillEditForm } from './SkillEditForm';
import { SkillViewForm } from './SkillViewForm';
// This is the logic and page for creating/editing a skilltree

const createNewEmptyNode = isEmpty => props => (
  <NewEmptyNode {...props} isEmpty={isEmpty} />
);

const createViewNode = unlocked => props => (
  <ViewNode {...props} isUnlocked={unlocked} />
);

const nodeTypes = {
  'new-empty': createNewEmptyNode(true),
  'new-populated': createNewEmptyNode(false),
  'view-node-unlocked': createViewNode(true),
  'view-node-locked': createViewNode(false)
};

export const SkillTreeLogic = ({ isAdmin, onSave, savedNodes, savedEdges }) => {
  var initialNodes = savedNodes ?? [];
  if (isAdmin && !savedNodes) {
    initialNodes = [
      {
        id: '0',
        type: 'input',
        data: { label: 'test root' },
        position: { x: 0, y: 0 }
      },
      {
        id: '1000',
        type: 'view-node-locked',
        data: {
          label: `Example Locked`,
          description: 'this is an example node of a normal user',
          requirements: 'example reqs',
          xpPoints: 20,
          progressXp: 10, //example user is on 5 xp points
          onOpenEditor: () => handleOpenEditor('1000')
        },
        position: { x: 0, y: 80 }
      },
      {
        id: '1001',
        type: 'view-node-unlocked',
        data: {
          label: `test view Node`,
          description: 'this is an example node of a normal user',
          requirements: 'example reqs',
          xpPoints: 20,
          progressXp: 10, //example user is on 5 xp points
          onOpenEditor: () => handleOpenEditor('1001')
        },
        position: { x: 80, y: 80 }
      }
    ];
  }
  const initialEdges = savedEdges ?? [
    { id: '0->1000', source: '0', target: '1000' }
  ];

  const idRef = useRef(1);
  const getId = () => `${idRef.current++}`;
  const nodeOrigin = [0.5, 0];

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
        nodes.map(node => {
          if (node.id === nodeId) {
            return {
              ...node,
              type: 'new-populated',
              data: { ...node.data, ...updatedData }
            };
          } else {
            return node;
          }
        })
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
        const position = screenToFlowPosition({ x: clientX, y: clientY + 40 });

        const newNode = {
          id,
          type: 'new-empty',
          position,
          data: {
            label: `Node ${id}`,
            description: '',
            requirements: '',
            xpPoints: 0,
            progressXp: 0,
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

  const handleOnSave = () => {
    console.log('NodesToSave:', nodes);
    console.log('EdgesToSave:', edges);
    onSave({ nodes, edges });
  };

  return (
    <>
      <h2 className="text-4xl font-bold" style={{ color: '#328E6E' }}>
        Add Skills
      </h2>
      {isAdmin && <button onClick={handleOnSave}>Save</button>}

      <div style={{ width: '100vw', height: '60vh' }} ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={isAdmin ? onEdgesChange : null}
          onConnect={isAdmin ? onConnect : null}
          onConnectEnd={isAdmin ? onConnectEnd : null}
          fitView
          nodeOrigin={nodeOrigin}
        >
          <Background />
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>

      {/* Modal rendered outside ReactFlow */}
      {editingNode &&
        (isAdmin ? (
          <SkillEditForm
            editingNode={editingNode}
            onSave={updatedData => {
              handleNodeEdit(editingNode.id, updatedData);
              setEditingNode(null);
            }}
            onCancel={() => setEditingNode(null)}
          />
        ) : (
          <SkillViewForm
            editingNode={editingNode}
            onCancel={() => setEditingNode(null)}
          />
        ))}
    </>
  );
};

export const SkillTreeEdit = ({ isAdmin, onSave, savedNodes, savedEdges }) => (
  <ReactFlowProvider>
    <SkillTreeLogic
      isAdmin={isAdmin}
      onSave={onSave}
      savedNodes={savedNodes}
      savedEdges={savedEdges}
    />
  </ReactFlowProvider>
);
