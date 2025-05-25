import React from 'react';

// Element JSX Component/Layout
import { Home } from '/imports/ui/pages/Home';

// Define Routes for Sample JSX component
export const HomeRoutes = [
  ...['', 'home/'].map(path => ({
    path: path, // Paths: "", "hello/"
    element: <Home />
  }))
];
