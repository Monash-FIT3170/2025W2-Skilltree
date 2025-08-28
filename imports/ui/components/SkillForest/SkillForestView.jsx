import React, { useState, useEffect, useCallback } from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import { useSubscribeSuspense } from 'meteor/communitypackages:react-router-ssr';
import { useFind } from 'meteor/react-meteor-data/suspense';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';
import { Meteor } from 'meteor/meteor';

const CombinedSkillTreeLogic = ({
  skillTreeIds,
  isAdmin = false,
  spacing = 800
}) => {
  useSubscribeSuspense('skilltrees');

  const skillTrees = useFind(
    SkillTreeCollection,
    [{ _id: { $in: skillTreeIds } }],
    [skillTreeIds]
  );

  const [loadedTrees, setLoadedTrees] = useState({});
  const [allNodes, setAllNodes] = useState([]);
  const [allEdges, setAllEdges] = useState([]);

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

  useEffect(() => {
    setLoadedTrees({});
    skillTrees.forEach((tree, index) => {
      loadTreeProgress(tree, index);
    });
  }, [skillTrees, loadTreeProgress]);

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
        selectable: false,
        style: {
          background: '#328E6E',
          color: 'white',
          border: '2px solid #2a5c4a',
          fontSize: '16px',
          fontWeight: 'bold',
          borderRadius: '8px',
          padding: '10px',
          minWidth: '200px',
          textAlign: 'center'
        }
      };

      combinedNodes.push(titleNode);

      if (skilltree.skillNodes) {
        const offsetNodes = skilltree.skillNodes.map(node => ({
          ...node,
          id: `${skilltree._id}-${node.id}`,
          position: {
            x: node.position.x + position.x,
            y: node.position.y + position.y
          },
          draggable: isAdmin
        }));

        combinedNodes.push(...offsetNodes);
      }

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

  return (
    <div>
      <div>Nodes: {allNodes.length}</div>
      <div>Edges: {allEdges.length}</div>
    </div>
  );
};

export const SkillForestView = ({
  skillTreeIds,
  isAdmin = false,
  spacing = 800
}) => {
  if (!skillTreeIds || skillTreeIds.length === 0) {
    return <div>No skill trees to display</div>;
  }

  return (
    <ReactFlowProvider>
      <CombinedSkillTreeLogic
        skillTreeIds={skillTreeIds}
        isAdmin={isAdmin}
        spacing={spacing}
      />
    </ReactFlowProvider>
  );
};
