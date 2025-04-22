import React from "react";

// Element JSX Component/Layout 
import { App } from '/imports/ui/layouts/App';

// Nested/Children Routes
import { SampleRoutes } from '/imports/routes/Sample';
import { HelloRoutes } from '/imports/routes/Hello';
import { Page404Routes } from '/imports/routes/Page404';

// Define Routes for App JSX layout
export const AppRoutes = [
  { 
    path: "/", 
    element: <App />,
    children: [ // Extends children array with nested routes via spread operator (...)
      ...SampleRoutes,
      ...HelloRoutes,
      ...Page404Routes, // * Last for Page not found
    ],
  },
];
