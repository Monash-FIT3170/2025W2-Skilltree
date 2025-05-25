import React from 'react';
import { Navigate } from 'react-router-dom';
import { PublicRoute } from '/imports/utils/RouteGuard';

// Element JSX UI
import { SignUp } from '/imports/ui/pages/SignUp';

import Step1 from '/imports/ui/components/SignUpComponents/SignUpStep1';
import Step2 from '/imports/ui/components/SignUpComponents/SignUpStep2';
import Step3 from '/imports/ui/components/SignUpComponents/SignUpStep3';
import Step4 from '/imports/ui/components/SignUpComponents/SignUpStep4';

// Define Routes for SignUpView JSX component
export const SignUpRoutes = [
  {
    // PublicRoute redirects to / if hideForLoggedIn
    //When the user visits /signup, the SignUpPage will render
    //Note: SignUp has an Outlet component to tell React Router where to render the nested child routes.
    path: 'signup/',
    element: (
      <PublicRoute hideForLoggedIn={true} redirect="/">
        <SignUp />
      </PublicRoute>
    ),
    children: [
      {
        //Default Child Route: index:true === /signup
        index: true,
        element: <Navigate to="step1/" replace /> // avoids cluttering the browser history, so back button works cleanly
      },
      ...[<Step1 />, <Step2 />, <Step3 />, <Step4 />].map((StepJsx, index) => ({
        path: `step${index + 1}`, // /signup/step<n> and renders Step<n> ui component inside the Outlet of SignUpPage
        element: StepJsx
      }))
    ]
  }
];
