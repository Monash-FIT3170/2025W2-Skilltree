import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
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
import { RootNode } from './Nodes/RootNote';
import { NewEmptyNode } from './Nodes/NewEmptyNode';
import { ViewNode } from './Nodes/ViewNode';
import { SkillEditForm } from './Skill/SkillEditForm';
import { SkillViewForm } from './Skill/SkillViewForm';
import { Button } from 'flowbite-react';

const createNewEmptyNode = isEmpty => props => (
  <NewEmptyNode {...props} isEmpty={isEmpty} />
);

const createViewNode = unlocked => props => (
  <ViewNode {...props} isUnlocked={unlocked} />
);

const nodeTypes = {
  root: RootNode,
  'new-empty': createNewEmptyNode(true),
  'new-populated': createNewEmptyNode(false),
  'view-node-unlocked': createViewNode(true),
  'view-node-locked': createViewNode(false)
};

export const SkillTreeLogic = ({
  id,
  isAdmin,
  onSave,
  savedNodes,
  savedEdges,
  onBack
}) => {
  const [viewMode, setViewMode] = useState('edit'); // 'edit' or 'view'
  const [workingNodes, setWorkingNodes] = useState(null); // Store nodes for preview

  // Reattach OpenEditor handlers to nodes. They are lost when saved to DB
  const attachOpenEditorHandlers = (savedNodes = []) =>
    savedNodes.map(node => ({
      ...node,
      data: {
        ...node.data,
        onOpenEditor: () => handleOpenEditor(node.id)
      },
      draggable: isAdmin
    }));

  var initialNodes = attachOpenEditorHandlers(savedNodes) ?? [];

  // Determine effective mode: admins can switch between edit and view
  const effectiveMode = isAdmin && viewMode === 'view' ? 'view' : (isAdmin ? 'edit' : 'view');

  if (effectiveMode === 'edit') {
    console.log('Edit mode');
    if (!savedNodes) {
      initialNodes = [
        {
          id: '0',
          type: 'root',
          data: { label: 'root', children: [] },
          position: { x: 0, y: 0 }
        }
      ];
    }
    else {
      console.log("setting type to edit");
      initialNodes = initialNodes.map(node => ({
        ...node,
        type: node.id === '0' ? 'root' : 'new-populated'
      }));
    }
  } else {
    console.log('View mode - determining locked/unlocked nodes');
    //check each parent
    for (let i = 0; i < initialNodes.length; i++) {
      // Ensure children exists and is an array
      const children = initialNodes[i].data.children || [];

      if (children.length > 0) {
        let unlock = true;

        //check each child by ID
        for (let j = 0; j < children.length; j++) {
          const childNode = initialNodes.find(n => n.id === children[j]);

          // Check if child node exists and is verified
          if (!childNode || !childNode.data.verified) {
            unlock = false;
            break;
          }
        }

        if (!unlock) {
          initialNodes[i].type = 'view-node-locked';
        } else {
          initialNodes[i].type = 'view-node-unlocked';
        }
      } else {
        // Node has no children, so it should be unlocked
        initialNodes[i].type = 'view-node-unlocked';
      }
    }
    // Only set root type if there are nodes
    if (initialNodes.length > 0) {
      initialNodes[0].type = 'root';
    }
  }

  const initialEdges = savedEdges ?? [];

  const idRef = useRef(initialNodes.length);
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

  // Update node types when view mode changes
  useEffect(() => {
    if (!isAdmin) return; // Only applies to admins

    if (viewMode === 'view') {
      // Save current working nodes before switching to view mode
      setWorkingNodes(nodes);

      // Switch to user view: update node types to locked/unlocked
      const updatedNodes = nodes.map((node, index) => {
        if (node.id === '0') {
          return { ...node, type: 'root', draggable: false };
        }

        const children = node.data.children || [];
        let unlocked = true;

        if (children.length > 0) {
          for (const childId of children) {
            const childNode = nodes.find(n => n.id === childId);
            if (!childNode?.data?.verified) {
              unlocked = false;
              break;
            }
          }
        }

        return {
          ...node,
          type: unlocked ? 'view-node-unlocked' : 'view-node-locked',
          draggable: false
        };
      });
      setNodes(updatedNodes);
    } else {
      // Switch to edit mode: restore working nodes if they exist
      if (workingNodes) {
        const updatedNodes = workingNodes.map(node => ({
          ...node,
          type: node.id === '0' ? 'root' : 'new-populated',
          draggable: true
        }));
        setNodes(updatedNodes);
      } else {
        // If no working nodes saved, just update types
        const updatedNodes = nodes.map(node => ({
          ...node,
          type: node.id === '0' ? 'root' : 'new-populated',
          draggable: true
        }));
        setNodes(updatedNodes);
      }
    }
  }, [viewMode]);

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
    connection => {
      setEdges(eds => addEdge(connection, eds));

      // Update the parent node to include the new child ID
      setNodes(nds =>
        nds.map(node => {
          if (node.id === connection.source) {
            return {
              ...node,
              data: {
                ...node.data,
                children: [...node.data.children, connection.target]
              }
            };
          }
          return node;
        })
      );
    },
    [setEdges, setNodes]
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
            children: [],
            verified: false,
            xpPoints: 0,
            netUpvotesRequired: 10,
            currentNetUpvotes: 0,
            onOpenEditor: () => handleOpenEditor(id)
          },
          origin: nodeOrigin
        };

        // Combine both operations in a single setNodes call
        setNodes(nds =>
          nds
            .map(node => {
              if (node.id === connectionState.fromNode.id) {
                return {
                  ...node,
                  data: {
                    ...node.data,
                    children: [...node.data.children, id]
                  }
                };
              }
              return node;
            })
            .concat(newNode)
        );

        setEdges(eds =>
          eds.concat({
            id: `e-${connectionState.fromNode.id}-${id}`,
            source: connectionState.fromNode.id,
            target: id
          })
        );
      }
    },
    [screenToFlowPosition, handleOpenEditor, setNodes, setEdges]
  );

  const onEdgesDelete = useCallback(
    deletedEdges => {
      deletedEdges.forEach(deletedEdge => {
        setNodes(nds =>
          nds.map(node => {
            if (node.id === deletedEdge.source) {
              return {
                ...node,
                data: {
                  ...node.data,
                  children: node.data.children.filter(
                    childId => childId !== deletedEdge.target
                  )
                }
              };
            }
            return node;
          })
        );
      });
    },
    [setNodes]
  );

  const handleOnSave = () => {
    onSave({ nodes, edges });
  };

  // stores proofId in node data, then syncs with DB
  const handleLinkProofToNode = proofId => {
    const updatedNodes = nodes.map(node =>
      node.id === editingNode.id
        ? { ...node, data: { ...node.data, proofId } }
        : node
    );
    setNodes(updatedNodes);
    Meteor.callAsync('saveSubscription', id, updatedNodes, edges);
  };

  return (
    <>
      {isAdmin && (
        <>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-4xl font-bold" style={{ color: '#328E6E' }}>
              {viewMode === 'edit' ? 'Add Skills' : 'Preview User View'}
            </h2>

            <div className="flex gap-2">
              <Button
                pill
                color={viewMode === 'edit' ? 'green' : 'gray'}
                className="focus:ring-0 w-32 font-bold text-md enabled:cursor-pointer"
                onClick={() => setViewMode('edit')}
              >
                Edit Mode
              </Button>
              <Button
                pill
                color={viewMode === 'view' ? 'green' : 'gray'}
                className="focus:ring-0 w-32 font-bold text-md enabled:cursor-pointer"
                onClick={() => setViewMode('view')}
              >
                User View
              </Button>
            </div>
          </div>

          {viewMode === 'edit' && (
            <Button
              pill
              color="green"
              className="focus:ring-0 w-32 font-bold text-md enabled:cursor-pointer mb-2"
              onClick={handleOnSave}
            >
              Save
            </Button>
          )}
        </>
      )}

      <div style={{ width: '100%', height: '65vh' }} ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={effectiveMode === 'edit' ? onEdgesChange : null}
          onConnect={effectiveMode === 'edit' ? onConnect : null}
          onConnectEnd={effectiveMode === 'edit' ? onConnectEnd : null}
          onEdgesDelete={effectiveMode === 'edit' ? onEdgesDelete : null}
          fitView
          nodeOrigin={nodeOrigin}
        >
          <Background />
          <MiniMap pannable zoomable />
          <Controls />
        </ReactFlow>
      </div>

      {isAdmin && viewMode === 'edit' && (
        <Button
          pill
          color="green"
          className="focus:ring-0 w-32 font-bold text-md enabled:cursor-pointer"
          onClick={() => {
            onBack(nodes, edges);
          }}
        >
          Back
        </Button>
      )}

      {/* Modal rendered outside ReactFlow */}
      {editingNode &&
        (effectiveMode === 'edit' ? (
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
            skilltreeId={id}
            editingNode={editingNode}
            onCancel={() => setEditingNode(null)}
            onUploadProof={proofId => handleLinkProofToNode(proofId)}
          />
        ))}
    </>
  );
};

export const SkillTreeEdit = ({
  id,
  isAdmin,
  onSave,
  savedNodes,
  savedEdges,
  onBack
}) => (
  <ReactFlowProvider>
    <SkillTreeLogic
      id={id}
      isAdmin={isAdmin}
      onSave={onSave}
      savedNodes={savedNodes}
      savedEdges={savedEdges}
      onBack={onBack}
    />
  </ReactFlowProvider>
);