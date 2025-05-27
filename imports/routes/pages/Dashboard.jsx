import React from 'react';

// Element JSX Component/Layout
import { Dashboard } from '/imports/ui/pages/Dashboard';

// Define Routes for Sample JSX component
export const DashboardRoutes = [
  ...['', 'dashboard/'].map(path => ({
    path: path, // Paths: "", "dashboard/"
    element: <Dashboard />
  }))
];
