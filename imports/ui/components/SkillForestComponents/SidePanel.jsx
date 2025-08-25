import React, { useMemo } from 'react';
import { ReactFlow, Controls } from '@xyflow/react';
import { useTracker } from 'meteor/react-meteor-data';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';

export const SidePanel = ({ skillTreeId }) => {
  const skillTree = useTracker(() => {
    const sub = Meteor.subscribe('skilltrees');
    if (!sub.ready() || !skillTreeId) return null;
    return SkillTreeCollection.findOne({ _id: skillTreeId });
  }, [skillTreeId]);

  const nodes = useMemo(() => {
    if (!skillTree?.skillNodes) return [];
    return skillTree.skillNodes.map(node => ({
      id: node.id,
      type: node.type === 'root' ? 'input' : 'default',
      data: { label: node.data.label },
      position: { x: node.position.x, y: node.position.y }
    }));
  }, [skillTree?.skillNodes]);

  const edges = useMemo(() => {
    if (!skillTree?.skillEdges) return [];
    return skillTree.skillEdges.map(edge => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      animated: edge.animated || false
    }));
  }, [skillTree?.skillEdges]);

  return (
    <div
      className="fixed right-0 w-96 bg-white shadow-xl p-4 overflow-y-auto z-50"
      style={{ top: '60px', height: 'calc(100% - 60px)' }}
    >
      {skillTree ? (
        <>
          <h2 className="text-xl font-bold mb-2">{skillTree.title}</h2>
          <p className="text-gray-600 mb-4">{skillTree.description}</p>

          <div style={{ height: 400, width: '100%' }}>
            <ReactFlow key={skillTreeId} nodes={nodes} edges={edges} fitView>
              <Controls />
            </ReactFlow>
          </div>

          <p className="text-gray-800 mt-2">
            <strong>Subscribers:</strong> {skillTree.subscribers.length}
          </p>
        </>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-400">
          Select a SkillTree to view.
        </div>
      )}
    </div>
  );
};
