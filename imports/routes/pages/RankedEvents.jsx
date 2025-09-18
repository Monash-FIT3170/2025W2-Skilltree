import React from 'react';

// Forum page component
import { RankedEvent } from '/imports/ui/pages/RankedEvent';

export const RankedEventRoutes = [
  {
    path: 'rankedevents/:skilltreeId',
    element: <RankedEvent />
  }
];
