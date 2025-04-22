import React from "react";

// Element JSX Component/Layout 
import { Hello } from '/imports/ui/components/Hello';

// Define Routes for Hello JSX component
export const HelloRoutes = [ 
  { path: "/hello", element: <Hello /> },
  { path: "/hello/:name", element: <Hello /> },
  { path: "/hi", element: <Hello /> },
  { path: "/hi/:name", element: <Hello /> },
];
