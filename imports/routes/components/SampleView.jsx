import React from 'react';

// Element JSX UI
import { SampleView } from '../../ui/components/Sample/SampleView';

// Define Routes for SampleView JSX component
export const SampleViewRoutes = [
  { path: '', element: <SampleView /> } // "" Will make it the default one to be displayed at /
];
