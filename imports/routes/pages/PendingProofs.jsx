import React from 'react';

// Element JSX Component/Layout
import { PendingProofs } from '/imports/ui/pages/PendingProofs';

// Nested/Children Routes
import { HelloContainerRoutes } from '/imports/routes/layouts/HelloContainer';
import { SampleViewRoutes } from '/imports/routes/components/SampleView';

export const PendingProofsRoutes = [
  {
    path: 'Pendingproofs',
    element: <PendingProofs />,
    children: [...SampleViewRoutes, ...HelloContainerRoutes]
  }
];
