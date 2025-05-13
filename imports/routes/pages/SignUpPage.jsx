import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

//Sign up page component
import { SignUp } from '/imports/ui/pages/SignUp';

//Nested Children Routes: Sub views in the sign up page
import { SignUpPageRoutes } from '/imports/routes/components/SignUpView';

export const SignUpRoutes = [
  { path: '', element: <SignUp /> }, // default route, maybe for root `/`
  {
    path: 'signup/',
    element: <SignUp />,
    children: [...SignUpPageRoutes]
  }
];
