import React from 'react';
import { Helmet } from 'react-helmet';
import { ProofUploadForm } from '../components/ProofUploadForm';

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
        <ProofUploadForm />
      </div>
    </div>
  </>
);
