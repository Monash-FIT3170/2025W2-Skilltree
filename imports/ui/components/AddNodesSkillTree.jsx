'use client';

import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  Controls
} from 'reactflow';
import { RootNode } from './RootNode';
import { SkillNode } from './SkillNode';

const nodeTypes = {
  rootNode: RootNode,
  skillNode: SkillNode
};

export const AddNodesSkillTree = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const getId = () => {
    return `node_${Date.now()}`;
  };

  const onTitleChange = useCallback(
    (nodeId, newTitle) => {
      setNodes(nds =>
        nds.map(node => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: {
                ...node.data,
                title: newTitle
              }
            };
          }
          return node;
        })
      );
    },
    [setNodes]
  );

  const onAddChild = useCallback(
    parentId => {
      const parentNode = nodes.find(node => node.id === parentId);
      if (!parentNode) return;

      const childNodeCount = nodes.filter(node =>
        edges.some(edge => edge.source === parentId && edge.target === node.id)
      ).length;
      const siblingOffset = 50;
      const initialX =
        parentNode.position.x +
        ((childNodeCount - 1) * (180 + siblingOffset)) / 2;

      const id = getId();
      const newNode = {
        id,
        type: 'skillNode',
        position: {
          x:
            parentNode.type === 'rootNode'
              ? parentNode.position.x
              : initialX + childNodeCount * (180 + siblingOffset),
          y: parentNode.position.y + 150
        },
        data: {
          title: 'New Skill',
          onTitleChange,
          onAddChild
        },
        parentNode: parentId
      };

      const newEdge = {
        id: `e${parentId}-${id}`,
        source: parentId,
        target: id,
        type: 'smoothstep',
        style: {
          strokeWidth: 2,
          stroke: '#328E6E'
        }
      };

      setNodes(nds => [...nds, newNode]);
      setEdges(eds => [...eds, newEdge]);
    },
    [nodes, edges, setNodes, setEdges, getId, onTitleChange]
  );

  const onConnect = useCallback(
    connection => {
      const newEdge = {
        ...connection,
        type: 'smoothstep',
        style: {
          strokeWidth: 2,
          stroke: '#328E6E'
        }
      };
      setEdges(eds => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  useEffect(() => {
    const handleAddChildForRoot = parentId => onAddChild(parentId);
    const initialNodes = [
      {
        id: 'root',
        type: 'rootNode',
        position: { x: 400, y: 50 },
        data: {
          onAddChild: handleAddChildForRoot
        }
      }
    ];
    setNodes(initialNodes);
    setEdges([]);
  }, [setNodes, setEdges]);

  useEffect(() => {
    setNodes(nds =>
      nds.map(node => {
        let needsUpdate = false;
        const newData = { ...node.data };

        if (node.data.onAddChild !== onAddChild) {
          newData.onAddChild = onAddChild;
          needsUpdate = true;
        }

        if (
          node.type === 'skillNode' &&
          node.data.onTitleChange !== onTitleChange
        ) {
          newData.onTitleChange = onTitleChange;
          needsUpdate = true;
        }

        if (needsUpdate) {
          return {
            ...node,
            data: newData
          };
        }
        return node;
      })
    );
  }, [onAddChild, onTitleChange, setNodes]);

  return (
    <div className="w-full h-[600px] border rounded-lg overflow-hidden bg-white">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        snapToGrid
        snapGrid={[15, 15]}
        minZoom={0.5}
        maxZoom={1.5}
        attributionPosition="bottom-right"
        nodesDraggable={true}
        selectNodesOnDrag={false}
      >
        <Background variant="dots" gap={15} size={1} color="#808080" />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default AddNodesSkillTree;
