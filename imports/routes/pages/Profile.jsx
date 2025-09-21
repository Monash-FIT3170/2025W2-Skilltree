import React from 'react';

import { Profile } from '/imports/ui/pages/Profile';
import { ProfileContentRoutes } from '/imports/routes/layouts/ProfileContent';

// Define Routes JSX component
export const ProfileRoutes = [
  {
    path: 'profile/',
    element: <Profile />,
    children: [...ProfileContentRoutes]
  }
];
