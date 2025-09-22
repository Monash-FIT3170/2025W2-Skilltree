import React from 'react';

import { ProfileContent } from '/imports/ui/layouts/ProfileContent'; //this contains the outlet
import { ProfileOverview } from '/imports/ui/layouts/ProfileOverview';
import { UsersFollowList } from '/imports/ui/layouts/UsersFollowList';

export const ProfileContentRoutes = [
  {
    path: ':profileUsername/',
    element: <ProfileContent />,
    children: [
      {
        index: true,
        element: <ProfileOverview />
      },
      {
        path: 'following/',
        element: <UsersFollowList type="following" />
      },
      {
        path: 'followers/',
        element: <UsersFollowList type="followers" />
      }
    ]
  }
];
