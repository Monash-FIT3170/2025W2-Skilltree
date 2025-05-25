import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { Outlet } from 'react-router-dom';
import { CommentSection } from '/imports/ui/components/CommentSection';

// JSX UI
import { SampleView } from '/imports/ui/components/SampleView';
import { Fallback } from '/imports/ui/components/Fallback';
import { ProofUploadButton } from '../components/ProofUploadButton';

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
      <ProofUploadButton
        skill="C Major Scale"
        requirements="Upload a video of yourself playing 2 octaves of the C Major scale."
      />
      <Suspense fallback={<Fallback />}>
        <CommentSection />
      </Suspense>
    </div>
  </>
);
