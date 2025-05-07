import React from "react";

// Element JSX UI
import { SignUpPage } from '/imports/ui/components/SignUpView';

// Define Routes for SignUpView JSX component
export const SignUpPageRoutes = [
  { path: "", element: <SignUpPage /> }, // default child at `/signup/`
  { path: "step1", element: <SignUpPage /> },
  { path: "step2", element: <SignUpPage /> },
];
