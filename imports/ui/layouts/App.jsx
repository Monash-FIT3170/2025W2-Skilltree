import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

// JSX Components 
import { NavBar } from '/imports/ui/components/NavBar';

export const App = () => { 
  return (
    <div>
      <NavBar />
      <main>
        <Suspense> {/* Suspense delays rendering until asynchronous data is ready (SSR) */}
          <Outlet /> {/* Renders the matched child route here */}
        </Suspense>
      </main>
    </div>
  );
}
