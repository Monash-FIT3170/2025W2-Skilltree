import React from 'react';

// Element JSX UI
import { HelloView } from '/imports/ui/components/HelloView';

// Define Routes for HelloView JSX component
export const HelloViewRoutes = [
  { path: '', element: <HelloView /> }, // "" Will make it the default one to be displayed at /
  { path: ':name', element: <HelloView /> } // :name url params, extract in UI JSX via hook { name } = useParams()
];
