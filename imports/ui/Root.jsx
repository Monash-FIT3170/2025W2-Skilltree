import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

// Provider
import { AuthProvider } from '/imports/utils/providers/AuthProvider';

// JSX UI
import { Fallback } from '/imports/ui/components/Fallback';

export const Root = () => (
  <AuthProvider>
    {/* Provides loggedIn to any nested child via useContext, no props */}
    <Suspense fallback={<Fallback />}>
      <Outlet /> {/* Renders the matched child (App/Login/Signup) route here */}
    </Suspense>
  </AuthProvider>
);
