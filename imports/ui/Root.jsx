import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeConfig } from 'flowbite-react';

// Provider
import { UserProvider } from '/imports/utils/providers/UserProvider';

// JSX UI
import { Fallback } from '/imports/ui/components/Fallback';

export const Root = () => (
  <>
    <ThemeConfig dark={false} />
    <UserProvider>
      {/* Provides user to any nested child via useContext instead of props */}
      <Suspense fallback={<Fallback msg={''} />}>
        {/* Renders the matched child (App/Login/Signup) route here */}
        <Outlet />
      </Suspense>
    </UserProvider>
  </>
);
