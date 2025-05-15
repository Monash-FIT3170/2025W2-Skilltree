import React from 'react';

// Element JSX UI
import { HelloContainer } from '/imports/ui/layouts/HelloContainer';

// Nested/Children Routes
import { HelloViewRoutes } from '/imports/routes/components/HelloView';

// Define Routes for Hello JSX component
export const HelloContainerRoutes = [
  { path: 'hi/', element: <HelloContainer /> },
  ...['', 'hello/'].map(path => ({
    path: path, // Paths: "", "hello/"
    element: <HelloContainer />,
    children: [
      // Extends children array with nested routes via spread operator (...)
      ...HelloViewRoutes
    ]
  }))
];
