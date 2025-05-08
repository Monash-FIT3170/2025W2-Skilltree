import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { UploadForm } from '../components/UploadForm';

export const ProofUpload = () => (
  <>
    <Helmet>
      <title>SkillTree - 404: Upload Proof</title>
    </Helmet>
    <div className="">
      <div>
        <h1 className="font-bold">Upload Proof</h1>
      </div>

      <div className="grid grid-flow-col grid-rows-3 gap-4 border-2 border-indigo-500">
        <Suspense>
          <UploadForm />
        </Suspense>
      </div>
    </div>
  </>
);

const uploadIt = event => {
  console.log('uploadit');
  // Access the input value using event.target.value
  const newValue = event.target.value;
  // Update the component's state or perform other actions
  console.log(newValue);
  console.log(event.target.files[0]);
};
