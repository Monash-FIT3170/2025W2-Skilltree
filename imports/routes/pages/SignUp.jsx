import React, { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';

// Element JSX UI
import { SignUp } from '/imports/ui/pages/SignUp';

const Step1 = lazy(
  () => import('/imports/ui/components/SignUpComponents/SignUpStep1')
);
const Step2 = lazy(
  () => import('/imports/ui/components/SignUpComponents/SignUpStep2')
);
const Step3 = lazy(
  () => import('/imports/ui/components/SignUpComponents/SignUpStep3')
);
const Step4 = lazy(
  () => import('/imports/ui/components/SignUpComponents/SignUpStep4')
);

// Define Routes for SignUpView JSX component
export const SignUpRoutes = [
  {
    //When the user visits /signup, the SignUpPage will render
    //Note: SignUp has an Outlet component to tell React Router where to render the nested child routes.
    path: 'signup',
    element: <SignUp />,
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
      },
      {
        path: 'step4',
        element: <Step4 />
      }
    ]
  }
];
