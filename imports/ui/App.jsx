import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

// JSX UI
import { NavBar } from './components/SiteFrame/NavBar';
import { Fallback } from './components/SiteFrame/Fallback';

export const App = () => (
  <>
    <NavBar />
    <main>
      {/* Suspense delays rendering until asynchronous data is ready (SSR) */}
      <Suspense fallback={<Fallback />}>
        <Outlet /> {/* Renders the matched child (pages) route here */}
      </Suspense>
    </main>
  </>
);
