import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { PostCollection } from '/imports/api/collections/PostCollection';

import { CommentSection } from '/imports/ui/components/CommentSection';

export const ProofsPostList = () => {
  // Subscribe and fetch posts reactively
  const { posts, isLoading } = useTracker(() => {
    const handler = Meteor.subscribe('post');

    return {
      posts: PostCollection.find({}, { sort: { date: -1 } }).fetch(),
      isLoading: !handler.ready(),
    };
  });

  if (isLoading) {
    return <div>Loading posts...</div>;
  }

  if (posts.length === 0) {
    return <div>No posts found.</div>;
  }

  // Helper to format date nicely
  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };


  return (
    <div className="min-h-screen bg-white py-10">
      <div className="max-w-5xl mx-auto px-4">
        <h3 className="text-xl font-semibold mt-4">Posts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Render empty boxes */}
          {posts.map((_, index) => (
            <div
              key={index}
              className="p-4 border border-gray-300 mb-4 bg-gray-200"
            >
              {/* Placeholder for Post */}
              <div className="text-sm text-white bg-gray-400 h-6 mb-2">
                Username Placeholder
              </div>
              <div className="text-sm text-white bg-gray-400 h-6 mb-2">
                Community Placeholder
              </div>

              <div className="text-sm text-white bg-[#a0bc86] mb-4 px-2 py-1 rounded">
                 {post.description || 'No caption'}
                 </div>

              {/* Placeholder for Caption */}
              <div className="text-sm text-white bg-gray-400 h-6 mb-4">
                Caption Placeholder
              </div>

              {/* View More Button */}
              <div className="text-right mt-4">
                <Link
                  to={`/hello/post/${index}`}
                  // to={`/hello/${index}`} // Replace `index` with post._id when using real data
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  View More
                </Link>
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
