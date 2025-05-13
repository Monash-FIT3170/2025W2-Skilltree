import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

//Sign In UI page component
import { SignIn } from '/imports/ui/pages/SignIn';


export const SignInRoutes = [
  {
    path: 'login/',
    element: <SignIn />,
    children: []
  }
];
