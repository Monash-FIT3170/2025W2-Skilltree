import React, { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';

// Element JSX UI
import { SignUpPage } from '/imports/ui/components/SignUpView';

const Step1 = lazy(
  () => import('/imports/ui/components/SignUpComponents/SignUpStep1')
);
const Step2 = lazy(
  () => import('/imports/ui/components/SignUpComponents/SignUpStep2')
);
const Step3 = lazy(
  () => import('/imports/ui/components/SignUpComponents/SignUpStep3')
);

// Define Routes for SignUpView JSX component
export const SignUpPageRoutes = [
  {
    //When the user visits /signup, the SignUpPage will render
    //Note: SignUpPage has an Outlet component to tell React Router where to render the nested child routes.
    path: 'signup',
    element: <SignUpPage />,
    children: [
      {
        //Default Child Route: index:true === /signup
        index: true,
        element: <Navigate to="step1" replace /> // avoids cluttering the browser history, so back button works cleanly
      },
      {
        path: 'step1', // /signup/step1 and renders Step1 ui component inside the Outlet of SignUpPage
        element: <Step1 />
      },
      {
        path: 'step2',
        element: <Step2 />
      },
      {
        path: 'step3',
        element: <Step3 />
      }
    ]
  }
];
