import type { Node, BuiltInNode } from '@xyflow/react';

export type NewEmptyNode = Node<{ label: string }, 'new-empty'>;
export type CustomNode = Node<{ label: string }, 'custom-template'>;


export type AppNode = BuiltInNode | NewEmptyNode ;
