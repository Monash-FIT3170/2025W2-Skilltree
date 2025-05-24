import React from 'react';
// Element JSX UI
import { HelloView } from '/imports/ui/components/HelloView';
// Define Routes for HelloView JSX component
export const HelloViewRoutes = [
  { path: 'hello', element: <HelloView /> }, // default route
  { path: 'hello/:name', element: <HelloView /> }, // existing dynamic route

];