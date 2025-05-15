import React from 'react';
import { PendingProofs } from '/imports/ui/pages/PendingProofs';
import { HelloContainerRoutes } from '/imports/routes/layouts/HelloContainer';
import { SampleViewRoutes } from '/imports/routes/components/SampleView';

export const PendingProofsRoutes = [
  {
    path: 'pendingproofs',
    element: <PendingProofs />,
    children: [...SampleViewRoutes, ...HelloContainerRoutes]
  }
];
