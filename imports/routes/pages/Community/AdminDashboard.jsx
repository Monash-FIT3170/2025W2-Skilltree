import React from 'react';

import { Navigate } from 'react-router-dom';
import { AdminDashboardLayout } from '/imports/ui/layouts/Management/AdminDashboardLayout';
import { UserManagement } from '/imports/ui/components/Community/Management/UserManagement';
import { Roles } from '/imports/ui/components/Community/Management/Roles';
import { Queue } from '/imports/ui/components/Community/Management/Queue';

// Admin Dashboard Routes (separate section)
export const AdminDashboardRoutes = [
  {
    path: 'skilltree/:id/admin-tools',
    element: <AdminDashboardLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="users" replace />
      },
      {
        path: 'users',
        element: <UserManagement />
      },
      {
        path: 'roles',
        element: <Roles />
      },
      {
        path: 'queue',
        element: <Queue />
      },
      {
        path: '*',
        element: <Navigate to="users" replace />
      }
    ]
  }
];
