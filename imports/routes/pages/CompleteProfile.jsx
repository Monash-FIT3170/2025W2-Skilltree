import React from 'react';
import { PrivateRoute, ProfileCompleteRoute } from '/imports/utils/RouteGuard';

import { CompleteProfile } from '../../ui/pages/CompleteProfile';

export const CompleteProfileRoutes = [
  {
    path: 'login/complete-profile',
    element: (
      <PrivateRoute redirect="/login">
        {/* Route requires isProfileComplete to be false to access otherwise redirects to / */}
        <ProfileCompleteRoute redirectUrl="/" requireComplete={false}>
          <CompleteProfile />
        </ProfileCompleteRoute>
      </PrivateRoute>
    )
  }
];
