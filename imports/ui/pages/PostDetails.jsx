import React from 'react';
import { useParams } from 'react-router-dom';

export const PostDetails = () => {
  const { id } = useParams();

  // In a real app, you'd fetch post data using the `id`
  return (
    <div className="min-h-screen bg-white py-10">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4">Post Details</h1>
        <p>Showing details for post ID: {id}</p>
        {/* Here you would display actual post info */}
      </div>
    </div>
  );
};
