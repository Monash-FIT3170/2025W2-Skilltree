import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

// JSX UI
import { Fallback } from '../components/SiteFrame/Fallback';

export const PublicLayout = () => (
  <>
    <main>
      {/* Suspense delays rendering until asynchronous data is ready (SSR) */}
      <Suspense fallback={<Fallback />}>
        <Outlet /> {/* Renders the matched child (pages) route here */}
      </Suspense>
    </main>
  </>
);
