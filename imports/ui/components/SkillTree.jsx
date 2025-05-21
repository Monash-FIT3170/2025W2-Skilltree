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

export const SkillTreeLogic = ({ isAdmin }) => {
  const initialNodes = [
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
        label: `test view only Node`,
        description: 'this is an example node of a normal user',
        requirements: 'example reqs',
        xpPoints: 20,
        progressXp: 10, //example user is on 5 xp points
        onOpenEditor: () => handleOpenEditor('1001')
      },
      position: { x: 80, y: 80 }
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
    setSliderValue(editnode.data.xpPoints);
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

  const onSave = () => {
    console.log('Nodes:', nodes);
    console.log('Edges:', edges);
  };

  const [sliderValue, setSliderValue] = useState(null);

  const handleSliderChange = e => {
    setSliderValue(e.target.value);
  };

  const handleInputChange = e => {
    const newValue = Math.max(0, Math.min(100, e.target.value)); // Assuming 0-100 range
    setSliderValue(newValue);
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
        <div className="fixed top-0 left-0 w-screen h-screen bg-gray-600/40 flex justify-center items-center z-[1000]">
          <div className="bg-neutral-200 p-5 rounded-lg w-[800px]">
            <h3>Add Skill Details</h3>
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
              <br />
              <label
                for="title"
                className="block mb-2 text-sm font-medium text-emerald-700"
              >
                Skill Title:
              </label>
              <input
                name="title"
                id="title"
                defaultValue={editingNode.label}
                readOnly={!isAdmin}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
              />
              <br />
              <label
                for="description"
                className="block mb-2 text-sm font-medium text-emerald-700"
              >
                Description:
              </label>
              <textarea
                name="description"
                id="description"
                rows="4"
                placeholder="Write your thoughts here..."
                defaultValue={editingNode.description}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                readOnly={!isAdmin}
              />
              <br />
              <label
                for="requirements"
                className="block mb-2 text-sm font-medium text-emerald-700"
              >
                Requirements:
              </label>
              <input
                name="requirements"
                id="requirements"
                defaultValue={editingNode.requirements}
                readOnly={!isAdmin}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
              />
              <br />
              <label
                for="xpPoints"
                className="block mb-2 text-sm font-medium text-emerald-700"
              >
                XP Required:
              </label>
              <div className="flex items-center gap-4">
                <input
                  name="xpPoints"
                  id="xpPoints"
                  type="range"
                  min="0"
                  max="100" // Set your desired max value
                  value={sliderValue}
                  onChange={handleSliderChange}
                  readOnly={!isAdmin}
                  className="w-full h-1 bg-emerald-700 rounded-lg range-lg appearance-none cursor-pointer"
                />
                <input
                  type="number"
                  value={sliderValue}
                  onChange={handleInputChange}
                  readOnly={!isAdmin}
                  className="block w-20 px-3 py-2 text-sm border bg-gray-50 border-gray-300 rounded-md shadow-sm"
                />
              </div>
              {/* </label> */}
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

export const SkillTreeEdit = ({ isAdmin }) => (
  <ReactFlowProvider>
    <SkillTreeLogic isAdmin={isAdmin} />
  </ReactFlowProvider>
);
