import type { Node, BuiltInNode } from '@xyflow/react';

export type NewEmptyNode = Node<{ label: string }, 'new-empty'>;


export type AppNode = BuiltInNode | NewEmptyNode ;
