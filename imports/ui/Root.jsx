import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeConfig } from 'flowbite-react';

// Provider
import { AuthProvider } from '/imports/utils/providers/AuthProvider';
import { FromUrlProvider } from '/imports/utils/providers/FromUrlProvider';

// JSX UI
import { Fallback } from '/imports/ui/components/Fallback';

export const Root = () => (
  <>
    <ThemeConfig dark={false} />
    {/* Provides loggedIn to any nested child via useContext instead of props */}
    <AuthProvider>
      <FromUrlProvider>
        <Suspense fallback={<Fallback msg={''} />}>
          {/* Renders the matched child (App/Login/Signup) route here */}
          <Outlet />
        </Suspense>
      </FromUrlProvider>
    </AuthProvider>
  </>
);
