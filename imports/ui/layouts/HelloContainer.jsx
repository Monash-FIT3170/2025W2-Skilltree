import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

// JSX UI
import { Fallback } from '/imports/ui/components/Fallback';

export const HelloContainer = () => (
  <>
    <div className="p-2">
      <h2 className="text-2xl font-bold mt-2">Hello Layout</h2>
      <div className="flex">
        <nav className="bg-gray-400 p-2">
          <Link
            to=""
            className="block text-white hover:bg-gray-600 px-3 py-2 rounded"
          >
            Hello
          </Link>
          <Link
            to="SkillTree/"
            className="block text-white hover:bg-gray-600 px-3 py-2 rounded"
          >
            SkillTree
          </Link>
          <Link
            to="url_param/"
            className="block text-white hover:bg-gray-600 px-3 py-2 rounded"
          >
            url_param
          </Link>
        </nav>
        <div className="flex-1 p-4">
          {/* Suspense delays rendering until asynchronous data is ready (SSR) */}
          <Suspense fallback={<Fallback />}>
            <Outlet /> {/* Renders the matched child (HelloView) route here */}
          </Suspense>
        </div>
      </div>
    </div>
  </>
);
