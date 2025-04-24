import React from 'react';

// Element JSX Component/Layout
import { Sample } from '/imports/ui/pages/Sample';

// Nested/Children Routes
import { HelloContainerRoutes } from '/imports/routes/layouts/HelloContainer';
import { SampleViewRoutes } from '/imports/routes/components/SampleView';

// Define Routes for Sample JSX component
export const SampleRoutes = [
  {
    path: 'sample/',
    element: <Sample />,
    children: [
      // Extends children array with nested routes via spread operator (...)
      ...SampleViewRoutes,
      ...HelloContainerRoutes
    ]
  }
];
