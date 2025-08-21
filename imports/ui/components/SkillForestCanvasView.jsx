import { ReactFlowProvider } from '@xyflow/react';
import { SkillTreeLogic } from './SkillTree';
import React from 'react';

// Displays multiple skill trees on a single canvas, horizontally spaced
export const SkillForestCanvasView = ({ skilltrees }) => {
  // Finds the total width of a skilltree's nodes, to be used as the horizontal offset for the next skilltree's nodes
  const findSkillTreeWidth = nodes => {
    let max = 0;
    let min = 0;
    nodes.forEach(node => {
      if (node.position.x > max) {
        max = node.position.x;
      } else if (node.position.x < min) {
        min = node.position.x;
      }
    });
    return max - min;
  };

  const shiftNodesRight = (nodes, shift) => {
    return nodes.map(node => ({
      ...node,
      position: {
        x: node.position.x + shift,
        y: node.position.y
      }
    }));
  };

  // guarantee node and edge ID uniqueness by appending skillTreeProgressId
  const updateNodeIds = (nodes, skillTreeId) => {
    return nodes.map(node => ({
      ...node,
      id: `${node.id}-${skillTreeId}`
    }));
  };

  const updateEdgeIds = (edges, skillTreeId) => {
    return edges.map(edge => ({
      ...edge,
      id: `${edge.id}-${skillTreeId}`,
      source: `${edge.source}-${skillTreeId}`,
      target: `${edge.target}-${skillTreeId}`
    }));
  };

  const getSkillForestNodesAndEdges = skillTrees => {
    let horizontalOffset = 0;
    let forestNodes = [];
    let forestEdges = [];

    skillTrees.forEach(tree => {
      forestNodes = forestNodes.concat(
        updateNodeIds(
          shiftNodesRight(tree.skillNodes, horizontalOffset),
          tree.id
        )
      );
      forestEdges = forestEdges.concat(updateEdgeIds(tree.skillEdges, tree.id));
      horizontalOffset += findSkillTreeWidth(tree.skillNodes) + 150; // add some extra spacing - without it the different trees may overlap since coords are from the centre of each node
    });

    return { nodes: forestNodes, edges: forestEdges };
  };

  const skillforestDisplay = getSkillForestNodesAndEdges(skilltrees);

  return (
    <ReactFlowProvider>
      <SkillTreeLogic
        id={'123'} // this is meant to be the skilltreeId - passed to SkillViewForm and then UploadProofButton.
        // May need a refactor to handle multiple skilltree IDs (if we want the skillforest to support uploading proof)
        isAdmin={false}
        onSave={() => {}}
        savedNodes={skillforestDisplay.nodes}
        savedEdges={skillforestDisplay.edges}
        onBack={() => {}}
      />
    </ReactFlowProvider>
  );
};
