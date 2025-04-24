import React from 'react';
import { Helmet } from 'react-helmet';

export const NotFound = () => (
  <>
    <Helmet>
      <title>SkillTree - 404: Page not Found</title>
    </Helmet>
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-8xl font-bold text-gray-400">Page Not Found 404</h1>
    </div>
  </>
);
