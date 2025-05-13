import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

// JSX UI
import { NavBar } from '/imports/ui/components/NavBar';

export const App = () => (
  <>
    <NavBar />
    <main>
      {/* Suspense delays rendering until asynchronous data is ready (SSR) */}
      <Suspense>
        <Outlet /> {/* Renders the matched child (pages) route here */}
      </Suspense>
    </main>
  </>
);
