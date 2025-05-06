import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { Link, Outlet } from 'react-router-dom';
import { ProofsPostList } from '/imports/ui/components/ProofsPostList'; // Update import

export const PendingProofs = () => (
  <>
    <Helmet>
      <title>SkillTree - Pending Proofs</title>
    </Helmet>
    <div className="p-2">
      <h1 className="text-3xl font-bold mt-2">Pending Proofs Page</h1>
      <nav className="bg-gray-500 p-2 flex gap-2">
        <Link to="Hello/" className="text-white hover:bg-gray-600 px-3 py-2 rounded">
          Hello
        </Link>
      </nav>

      <Suspense fallback={<div>Loading content...</div>}>
        <Outlet />
      </Suspense>

      {/* Render ProofsPostList below the navigation */}
      <ProofsPostList />
    </div>
  </>
);
