import React from 'react';
import { Helmet } from 'react-helmet';

// JSX UI
import { ProofUploadButton } from '../components/ProofUploadButton';

export const ProofUpload = () => (
  <>
    <Helmet>
      <title>SkillTree - 404: Upload Proof</title>
    </Helmet>
    <div className="">
      <div>
        <h1 className="font-bold">Upload Proof Page</h1>
      </div>

      <div className="grid grid-flow-col grid-rows-3 gap-4 border-2 border-indigo-500">
        <ProofUploadButton
          skill="C Major Scale"
          requirements="Upload a video of yourself playing 2 octaves of the C Major scale."
        />
      </div>
    </div>
  </>
);
