import React from 'react';
import { Helmet } from 'react-helmet';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { Meteor } from 'meteor/meteor';
import { useNavigate } from 'react-router-dom';

export const Home = () => (
  <>
    <Helmet>
      <title>SkillTree - Home</title>
    </Helmet>
    <div className="p-2">
      <h1 className="text-3xl font-bold mt-2">Welcome to SkillTree!</h1>
      <SampleView />
      {/* Suspense delays rendering until asynchronous data is ready (SSR) */}
      <Suspense fallback={<Fallback />}>
        <Outlet /> {/* Renders the matched child (HelloContainer) route here */}
      </Suspense>

      <Suspense fallback={<Fallback />}>
        <CommentSection />
      </Suspense>
    </div>
  </>
);
