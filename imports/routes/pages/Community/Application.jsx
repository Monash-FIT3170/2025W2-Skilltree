import React from 'react';

import { Application } from '/imports/ui/pages/Community/Management/Application';

// Admin Dashboard Routes (separate section)
export const ApplicationRoutes = [
  {
    path: 'skilltree/:id/application',
    element: <Application />
  }
];
