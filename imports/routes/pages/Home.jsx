import React from 'react';

// Element JSX Component/Layout
import { Home } from '/imports/ui/pages/Home';

// Nested/Children Routes
import { HelloContainerRoutes } from '/imports/routes/layouts/HelloContainer';

// Define Routes for Sample JSX component
export const HomeRoutes = [
  { path: '', element: <Home /> }, // "" Will make it the default one to be displayed at / where no children displays nothing in <Outlet /> at Home UI JSX
  {
    path: 'home/',
    element: <Home />,
    children: [
      // Extends children array with nested routes via spread operator (...)
      ...HelloContainerRoutes // URL "/home" will display HelloContainer in <Outlet /> at Home UI JSX
    ]
  }
];
