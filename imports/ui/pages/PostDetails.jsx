// import React from 'react';
// import { useParams } from 'react-router-dom';

// export const PostDetails = () => {
//   const { id } = useParams();

//   // In a real app, you'd fetch post data using the `id`
//   return (
//     <div className="min-h-screen bg-white py-10">
//       <div className="max-w-4xl mx-auto px-4">
//         <h1 className="text-3xl font-bold mb-4">Post Details</h1>
//         <p>Showing details for post ID: {id}</p>
//         {/* Here you would display actual post info */}
//       </div>
//     </div>
//   );
// };

import React from 'react';
import { useParams } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { SampleCollection } from '/imports/api/collections/Sample';
import { Meteor } from 'meteor/meteor';

export const PostDetails = () => {
  const { id } = useParams();

  const post = useTracker(() => SampleCollection.findOne(id), [id]);

  if (!post) return <div className="p-4">Loading post...</div>;

  const handleUpvote = () => Meteor.call('sample.upvote', id);
  const handleDownvote = () => Meteor.call('sample.downvote', id);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">{post.username}</h2>
      <p className="text-gray-600 mb-2">Community: {post.community}</p>
      <img src={post.imageUrl} alt="Post" className="w-full mb-4 rounded" />
      <p className="mb-4">{post.caption}</p>

      <div className="flex items-center space-x-4 mt-6">
        <button
          onClick={handleUpvote}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          👍 Upvote ({post.upvotes || 0})
        </button>
        <button
          onClick={handleDownvote}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          👎 Downvote ({post.downvotes || 0})
        </button>
      </div>
    </div>
  );
};
