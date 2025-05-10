import { Link } from 'react-router-dom';
import React from 'react';

export const ProofUploadButton = () => {
  return (
    <>
      <div>
        <Link
          to="/Upload"
          className="text-center w-36 border-2 border-emerald-950 bg-emerald-600 text-white font-bold py-2 px-4 rounded hover:bg-emerald-700 active:bg-emerald-500 mt-2"
        >
          Upload Proof
        </Link>
      </div>
    </>
  );
};
