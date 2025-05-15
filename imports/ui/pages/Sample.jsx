import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

// JSX UI
import { Fallback } from '/imports/ui/components/Fallback';

export const Sample = () => (
  <>
    <Helmet>
      <title>SkillTree - Sample</title>
    </Helmet>
    <div className="p-2">
      <h1 className="text-3xl font-bold mt-2">Sample Page</h1>
      <nav className="bg-gray-500 p-2">
        <Link to="" className="text-white hover:bg-gray-600 px-3 py-2 rounded">
          Sample
        </Link>
        <Link
          to="Hello/"
          className="text-white hover:bg-gray-600 px-3 py-2 rounded"
        >
          Hello
        </Link>
      </nav>
      {/* Suspense delays rendering until asynchronous data is ready (SSR) */}
      <Suspense fallback={<Fallback />}>
        {/* Renders the matched child (Sample||HelloContainer) route here */}
        <Outlet />
      </Suspense>
    </div>
  </>
);
