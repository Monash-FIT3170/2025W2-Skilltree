import React from "react";

// Element JSX Component/Layout 
import { Page404 } from '/imports/ui/components/Page404';

// Define Routes for Page404 JSX component
export const Page404Routes = [ // Extends Routes array via push with spread operator (...)
  { path: "*", element: <Page404 /> },
];
