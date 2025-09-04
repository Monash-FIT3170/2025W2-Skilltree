import React, { useCallback, useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { useSubscribe } from 'meteor/react-meteor-data/suspense';
import { useFind } from 'meteor/react-meteor-data/suspense';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';
import { Meteor } from 'meteor/meteor';

// Import nodes
import { RootNode } from '../SkillTrees/Nodes/RootNote';
import { NewEmptyNode } from '../SkillTrees/Nodes/NewEmptyNode';
import { ViewNode } from '../SkillTrees/Nodes/ViewNode';
import { SkillEditForm } from '../SkillTrees/Skill/SkillEditForm';
import { SkillViewForm } from '../SkillTrees/Skill/SkillViewForm';

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

// Main component logic
const CombinedSkillTreeLogic = ({
  skillTreeIds,
  isAdmin = false,
  spacing = 800
}) => {
  useSubscribe('skilltrees');
  const navigate = useNavigate();

  // Get all skill trees
  const skillTrees = useFind(
    SkillTreeCollection,
    [{ _id: { $in: skillTreeIds } }],
    [skillTreeIds]
  );

  const [globalEditingNode, setGlobalEditingNode] = useState(null);
  const [allNodes, setAllNodes] = useState([]);
  const [allEdges, setAllEdges] = useState([]);
  const [loadedTrees, setLoadedTrees] = useState({});

  // I used GitHub Copilot (https://github.com/copilot) to get the initial idea for the SkillTree placement logic on the SkillForest page
  const getTreePosition = useCallback(
    index => {
      const cols = Math.ceil(Math.sqrt(skillTrees.length));
      const row = Math.floor(index / cols);
      const col = index % cols;
      return {
        x: col * spacing,
        y: row * spacing
      };
    },
    [skillTrees.length, spacing]
  );

  const loadTreeProgress = useCallback((tree, index) => {
    Meteor.call('getSkillTreeProgress', tree._id, (err, res) => {
      const skilltree = res || tree;
      setLoadedTrees(prev => ({
        ...prev,
        [tree._id]: { skilltree, index }
      }));
    });
  }, []);

  // Load all trees when skillTrees change
  useEffect(() => {
    setLoadedTrees({});
    skillTrees.forEach((tree, index) => {
      loadTreeProgress(tree, index);
    });
  }, [skillTrees, loadTreeProgress]);

  // Combine nodes of all loaded trees
  useEffect(() => {
    const loadedTreesArray = Object.values(loadedTrees);

    if (loadedTreesArray.length !== skillTrees.length) {
      return;
    }

    let combinedNodes = [];
    let combinedEdges = [];

    loadedTreesArray.forEach(({ skilltree, index }) => {
      const position = getTreePosition(index);

      const titleNode = {
        id: `title-${skilltree._id}`,
        type: 'default',
        position: { x: position.x, y: position.y - 100 },
        data: {
          label: skilltree.title || `Skill Tree ${index + 1}`
        },
        draggable: false,
        selectable: true,
        style: {
          background: '#328E6E',
          color: 'white',
          border: '2px solid #2a5c4a',
          fontSize: '16px',
          fontWeight: 'bold',
          borderRadius: '8px',
          padding: '10px',
          minWidth: '200px',
          textAlign: 'center',
          cursor: 'pointer'
        }
      };

      combinedNodes.push(titleNode);

      // Process skill nodes
      if (skilltree.skillNodes) {
        const offsetNodes = skilltree.skillNodes.map(node => ({
          ...node,
          id: `${skilltree._id}-${node.id}`,
          position: {
            x: node.position.x + position.x,
            y: node.position.y + position.y
          },
          data: {
            ...node.data,
            onOpenEditor: () => {
              setGlobalEditingNode({
                id: node.id,
                skillTreeId: skilltree._id,
                ...node.data
              });
            }
          },
          draggable: isAdmin
        }));

        combinedNodes.push(...offsetNodes);
      }

      // Update IDs to match prefixed nodes
      if (skilltree.skillEdges) {
        const offsetEdges = skilltree.skillEdges.map(edge => ({
          ...edge,
          id: `${skilltree._id}-${edge.id}`,
          source: `${skilltree._id}-${edge.source}`,
          target: `${skilltree._id}-${edge.target}`
        }));

        combinedEdges.push(...offsetEdges);
      }
    });

    setAllNodes(combinedNodes);
    setAllEdges(combinedEdges);
  }, [loadedTrees, skillTrees.length, getTreePosition, isAdmin]);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onNodeClick = useCallback(
    (event, node) => {
      if (node.id.startsWith('title-')) {
        const skillTreeId = node.id.replace('title-', '');
        navigate(`/skilltree/${skillTreeId}`);
      }
    },
    [navigate]
  );

  // Update nodes and edges when combined data changes
  useEffect(() => {
    setNodes(allNodes);
  }, [allNodes, setNodes]);

  useEffect(() => {
    setEdges(allEdges);
  }, [allEdges, setEdges]);

  const handleNodeEdit = useCallback(
    (nodeId, updatedData) => {
      setNodes(nodes =>
        nodes.map(node => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: { ...node.data, ...updatedData }
            };
          }
          return node;
        })
      );
    },
    [setNodes]
  );

  const handleSave = useCallback(
    updatedData => {
      if (globalEditingNode) {
        const fullNodeId = `${globalEditingNode.skillTreeId}-${globalEditingNode.id}`;
        handleNodeEdit(fullNodeId, updatedData);
        setGlobalEditingNode(null);
      }
    },
    [globalEditingNode, handleNodeEdit]
  );

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={isAdmin ? onEdgesChange : null}
        fitView
        fitViewOptions={{ padding: 0.1, maxZoom: 1.2, minZoom: 0.1 }}
        nodeOrigin={[0.5, 0]}
        onNodeClick={onNodeClick}
      >
        <Background />
        <MiniMap pannable zoomable />
        <Controls />
      </ReactFlow>

      {/* Modal for editing nodes */}
      {globalEditingNode &&
        (isAdmin ? (
          <SkillEditForm
            editingNode={globalEditingNode}
            onSave={handleSave}
            onCancel={() => setGlobalEditingNode(null)}
          />
        ) : (
          <SkillViewForm
            skilltreeId={globalEditingNode.skillTreeId}
            editingNode={globalEditingNode}
            onCancel={() => setGlobalEditingNode(null)}
          />
        ))}
    </div>
  );
};

export const SkillForestUnifiedView = ({
  skillTreeIds,
  isAdmin = false,
  spacing = 800
}) => {
  if (!skillTreeIds || skillTreeIds.length === 0) {
    return <div>No skill trees to display</div>;
  }

  return (
    <div className="w-full h-full">
      <ReactFlowProvider>
        <CombinedSkillTreeLogic
          skillTreeIds={skillTreeIds}
          isAdmin={isAdmin}
          spacing={spacing}
        />
      </ReactFlowProvider>
    </div>
  );
};
