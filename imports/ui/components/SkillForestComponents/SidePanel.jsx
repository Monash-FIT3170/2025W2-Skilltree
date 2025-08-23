import React from 'react';
import { ReactFlow, Controls } from '@xyflow/react';
import { useSubscribeSuspense } from 'meteor/communitypackages:react-router-ssr';
import { useFind } from 'meteor/react-meteor-data/suspense';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';

// SidePanel component displays details and structure of a skill tree
export const SidePanel = ({ skillTreeId }) => {
  // Subscribe to 'skilltrees' publication so data is kept in sync reactively
  useSubscribeSuspense('skilltrees');

  // Fetch the specific skill tree by ID with selected fields
  const [skillTree] = useFind(SkillTreeCollection, [
    { _id: { $eq: skillTreeId } }, // query filter (match ID)
    {
      fields: {
        // limit fields for efficiency
        _id: 1,
        title: 1,
        description: 1,
        image: 1,
        owner: 1,
        subscribers: 1,
        skillNodes: 1,
        skillEdges: 1
      }
    }
  ]);

  // If no skill tree is found yet, don't render anything
  if (!skillTree) return null;

  // Transform skillNodes into React Flow nodes format
  const nodes = skillTree.skillNodes.map(node => ({
    id: node.id,
    type: node.type === 'root' ? 'input' : 'default', // root nodes become "input" type, others are normal
    data: { label: node.data.label }, // label for the node
    position: { x: node.position.x, y: node.position.y } // coordinates on the graph
  }));

  // Transform skillEdges into React Flow edges format
  const edges = skillTree.skillEdges.map(edge => ({
    id: edge.id,
    source: edge.source, // starting node ID
    target: edge.target, // ending node ID
    animated: edge.animated || false // enable animation if defined
  }));

  // Render side panel UI
  return (
    <div className="fixed top-0 right-0 w-96 h-full bg-white shadow-xl p-4 overflow-y-auto z-50">
      {/* Title and description */}
      <h2 className="text-xl font-bold mb-2">{skillTree.title}</h2>
      <p className="text-gray-600 mb-4">{skillTree.description}</p>

      {/* React Flow graph visualization */}
      <div style={{ height: 400, width: '100%' }}>
        <ReactFlow nodes={nodes} edges={edges} fitView>
          <Controls /> {/* zoom and pan controls */}
        </ReactFlow>
      </div>

      {/* Subscribers count */}
      <p className="text-gray-800 mt-2">
        <strong>Subscribers:</strong> {skillTree.subscribers.length}
      </p>
    </div>
  );
};
