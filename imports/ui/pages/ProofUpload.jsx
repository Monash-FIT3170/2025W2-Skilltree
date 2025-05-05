import React from 'react';
import { Helmet } from 'react-helmet';
import FileUploadComponent from '../components/files/FileUpload';

export const ProofUpload = () => (
  <>
    <Helmet>
      <title>SkillTree - Upload Proof</title>
    </Helmet>
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-8xl font-bold text-gray-400">Upload Proof</h1>
      <FileUploadComponent />
    </div>
  </>
);
