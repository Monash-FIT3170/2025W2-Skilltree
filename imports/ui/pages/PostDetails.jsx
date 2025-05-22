import React from 'react';
import { useParams } from 'react-router-dom';
import { useFind } from 'meteor/react-meteor-data/suspense';
import { useSubscribeSuspense } from 'meteor/communitypackages:react-router-ssr';
import { Meteor } from 'meteor/meteor';
import { PostCollection } from '/imports/api/collections/PostCollection';

export const PostDetails = () => {
  const { id } = useParams();

  useSubscribeSuspense('post');
  const post = useFind(PostCollection, [{ _id: { $eq: id } }])[0]; // Find returns an array of matches, [0] first value for 'findOne'

  if (!post) return <div className="p-4">Post not found.</div>;

  const formatDate = date => {
    if (!date) return '';
    return new Date(date).toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleUpvote = () => Meteor.call('post.upvote', post._id);
  const handleDownvote = () => Meteor.call('post.downvote', post._id);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-2">{post.user}</h2>
      <p className="text-gray-600 mb-1">Subskill: {post.subskill || 'N/A'}</p>
      <p className="text-gray-500 text-sm mb-4">
        Posted on: {formatDate(post.date)}
      </p>

      <div className="w-full mb-4">
        {post.evidence ? (
          <img
            src={post.evidence}
            alt="Post Evidence"
            className="w-full max-h-[400px] object-contain rounded"
          />
        ) : (
          <div className="bg-gray-200 h-48 flex items-center justify-center rounded">
            No Image Available
          </div>
        )}
      </div>

      <p className="mb-6 text-lg text-gray-700">
        {post.description || 'No caption provided.'}
      </p>

      <div className="flex space-x-4">
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
