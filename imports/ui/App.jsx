import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

// JSX UI
import { NavBar } from '/imports/ui/components/NavBar';

export const App = () => (
  <>
    <NavBar />
    <main>
      <Suspense>
        {' '}
        {/* Suspense delays rendering until asynchronous data is ready (SSR) */}
        <Outlet /> {/* Renders the matched child (pages) route here */}
      </Suspense>
    </main>
  </>
);
