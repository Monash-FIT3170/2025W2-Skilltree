import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { PostCollection } from '/imports/api/collections/PostCollection';
import { CommentSection } from '/imports/ui/components/CommentSection';
import { AddComment } from '/imports/ui/components/AddComment';



export const PostDetailPopup = ({ postId, onClose }) => {
  const { post, isLoading } = useTracker(() => {
    const handle = Meteor.subscribe('post');
    const post = handle.ready() ? PostCollection.findOne({ _id: postId }) : null;
    return { post, isLoading: !handle.ready() };
  }, [postId]);

  const handleUpvote = () => Meteor.call('post.upvote', post._id);
  const handleDownvote = () => Meteor.call('post.downvote', post._id);

  const formatDate = date =>
    new Date(date).toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

  if (isLoading || !post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-3xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-1">{post.title}</h2>
          <p className="text-sm text-gray-500">by {post.user} | {formatDate(post.date)}</p>
          <p className="text-gray-600 mt-2">Subskill: <strong>{post.subskill}</strong></p>
        </div>

        {post.evidence && (
          <img
            src={post.evidence}
            alt="Evidence"
            className="w-full max-h-96 object-cover rounded mb-4"
          />
        )}

        <p className="text-gray-700 mb-4">{post.description || 'No description provided.'}</p>
        {/*Evidence Image Preview */}
        {post.evidence && (
        <div className="mt-4">
            <img
            src={selectedPost.evidence}
            alt="Evidence preview"
            className="rounded-md max-h-64 object-cover w-full"
            />
        </div>
        )}

        <div className="flex space-x-4 mb-6">
          <button
            onClick={handleUpvote}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            👍 Upvote ({post.upvotes || 0})
          </button>
          <button
            onClick={handleDownvote}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            👎 Downvote ({post.downvotes || 0})
          </button>
        </div>

        <AddComment username="Username Placeholder" postid={post._id} />
        {/* Comments Section */}
        <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Comments</h3>
        <CommentSection postId={post._id} />
        </div>
      </div>
    </div>
  );
};
