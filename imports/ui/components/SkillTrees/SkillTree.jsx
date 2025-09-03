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
// This is the logic and page for creating/editing a skilltree

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
  //For creating a fresh new tree
  if (isAdmin) {
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
  }
  //load user tree + check for parents
  //load user tree + check for parents
  else {
    console.log('saved nodes:', initialNodes); // Use console.log with comma to see the actual objects
    console.log('saved node root:', initialNodes[0]);

    //check each parent
    for (let i = 0; i < initialNodes.length; i++) {
      // Ensure children exists and is an array
      const children = initialNodes[i].data.children || [];

      if (children.length > 0) {
        let unlock = true;

        //check each child by ID
        for (let j = 0; j < children.length; j++) {
          const childNode = children[j];

          // Check if child node exists and is verified
          if (!childNode.data.verified) {
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
    initialNodes[0].type = 'root';
  }

  const initialEdges = savedEdges ?? [];

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
            progressXp: 0,
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

  const printNodes = () => {
    console.log('Printer triggered');
    console.log(nodes);
  };

  return (
    <>
      <Button onClick={printNodes}>Print Nodes</Button>
      {isAdmin && (
        <>
          <h2 className="text-4xl font-bold" style={{ color: '#328E6E' }}>
            Add Skills
          </h2>

          <Button
            pill
            color="green"
            className="focus:ring-0 w-32 font-bold text-md enabled:cursor-pointer"
            onClick={handleOnSave}
          >
            Save
          </Button>
        </>
      )}

      <div style={{ width: '100%', height: '65vh' }} ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={isAdmin ? onEdgesChange : null}
          onConnect={isAdmin ? onConnect : null}
          onConnectEnd={isAdmin ? onConnectEnd : null}
          onEdgesDelete={isAdmin ? onEdgesDelete : null}
          fitView
          nodeOrigin={nodeOrigin}
        >
          <Background />
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>
      {isAdmin && (
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
  isAdmin,
  onSave,
  savedNodes,
  savedEdges,
  onBack
}) => (
  <ReactFlowProvider>
    <SkillTreeLogic
      isAdmin={isAdmin}
      onSave={onSave}
      savedNodes={savedNodes}
      savedEdges={savedEdges}
      onBack={onBack}
    />
  </ReactFlowProvider>
);
