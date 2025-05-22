import React, { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

//Sign In UI page component
import { SignIn } from '/imports/ui/pages/SignIn';

const MissingGoogleFieldsStep = lazy(
  () => import('/imports/ui/components/SignUpComponents/GetMissingGoogleFields')
);

export const SignInRoutes = [
  { path: '', element: <SignIn /> }, // "" Will make it the default one to be displayed at / where no children displays nothing in <Outlet /> at Home UI JSX
  {
    path: 'login/',
    element: <SignIn />,
  },
  { path: 'login/extraStep1', element: <MissingGoogleFieldsStep /> }
];
