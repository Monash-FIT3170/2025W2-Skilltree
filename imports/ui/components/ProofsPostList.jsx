import React from 'react';

import { AddComment } from './AddComment';
import { useFind } from 'meteor/react-meteor-data/suspense';
import { useSubscribeSuspense } from 'meteor/communitypackages:react-router-ssr';
import { PostCollection } from '/imports/api/collections/PostCollection';
import { CommentSection } from '/imports/ui/components/CommentSection';

export const ProofsPostList = () => {
  useSubscribeSuspense('post');
  const posts = useFind(PostCollection, [{}, { sort: { date: -1 } }]) || [];

  if (posts.length === 0) {
    return <div>No posts found.</div>;
  }

  // Helper to format date nicely
  const formatDate = date => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-white py-10">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {posts.map(post => (
            <div key={post._id} className="p-4 bg-[#D2EAD1] rounded-xl ">
              {/* Render real post data */}
              <div className="text-sm text-white bg-[#328E6E] h-6 mb-1 flex items-center justify-between px-2 ">
                <span className="flex items-center">
                  <span className="mr-1">👑</span>
                  <span>{post.user}</span>
                </span>
                <span className="text-xs italic">{formatDate(post.date)}</span>
              </div>

              <div className="text-sm text-white bg-gray-400 h-6 mb-2 px-2">
                {/* Changed Community to Subskill */}
                {post.subskill || 'Subskill Placeholder'}
              </div>

              {/* If you have evidence as image or URL, you can render it */}
              <div className="w-full h-48 mb-4 bg-gray-300 flex items-center justify-center">
                {post.evidence ? (
                  <img
                    src={post.evidence}
                    alt="Evidence"
                    className="max-h-full max-w-full"
                  />
                ) : (
                  <span>No Image</span>
                )}
              </div>

              <div className="text-sm text-white bg-[#328E6E] mb-4 px-2 py-1 rounded">
                {post.description || 'No caption'}
              </div>

              <div className="p-3 border-t border-gray-300 mt-12">
                <div className="mb-2">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-200"
                    disabled
                    aria-label="Add a comment"
                  />
                </div>
                <CommentSection postId={post._id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
