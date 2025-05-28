import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { UserProvider } from '/imports/utils/providers/UserProvider';

// JSX UI
import { NavBar } from '/imports/ui/components/NavBar';
import { Fallback } from '/imports/ui/components/Fallback';

export const App = () => (
  <>
    <UserProvider>
      <NavBar />
      <main>
        {/* Suspense delays rendering until asynchronous data is ready (SSR) */}
        <Suspense fallback={<Fallback />}>
          <Outlet /> {/* Renders the matched child (pages) route here */}
        </Suspense>
      </main>
    </UserProvider>
  </>
);
