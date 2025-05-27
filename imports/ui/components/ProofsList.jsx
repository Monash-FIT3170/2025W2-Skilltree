import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { ProofCollection } from '/imports/api/collections/Proof';
import { PostDetailPopup } from '/imports/ui/pages/PostDetailPopup';

export const ProofsPostList = () => {
  const [selectedPostId, setSelectedPostId] = useState(null);

  const { posts, isLoading } = useTracker(() => {
    const handle = Meteor.subscribe('post');
    const data = ProofCollection.find({}, { sort: { date: -1 } }).fetch();

    return {
      posts: Array.isArray(data) ? data : [],
      isLoading: !handle.ready()
    };
  }, []);

  if (isLoading) return <div>Loading posts...</div>;
  if (posts.length === 0) return <div>No posts found.</div>;

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

  const handleUpvote = postId => {
    Meteor.call('post.upvote', postId, error => {
      if (error) console.error('Upvote failed:', error.reason);
    });
  };

  const handleDownvote = postId => {
    Meteor.call('post.downvote', postId, error => {
      if (error) console.error('Downvote failed:', error.reason);
    });
  };

  return (
    <>
      <div className="min-h-screen bg-white py-6 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {posts.map(post => {
              const verification = post.verification || 0;
              const progressPercent = Math.min((verification / 10) * 100, 100);

              return (
                <div key={post._id} className="p-4 bg-[#D2EAD1] rounded-xl">
                  {/* User & Date */}
                  <div className="text-sm text-white bg-[#328E6E] h-6 mb-1 flex items-center justify-between px-2">
                    <span className="flex items-center">
                      <span className="mr-1">👑</span>
                      <span>{post.user}</span>
                    </span>
                    <span className="text-xs italic">{formatDate(post.date)}</span>
                  </div>

                  {/* Subskill */}
                  <div className="text-sm text-white bg-gray-400 h-6 mb-2 px-2">
                    {post.subskill || 'Subskill Placeholder'}
                  </div>

                  {/* EvidenceLink Image */}
                  <div className="w-full h-48 mb-4 bg-gray-300 flex items-center justify-center">
                    {post.evidenceLink ? (
                      <img
                        src={post.evidenceLink}
                        alt="EvidenceLink"
                        className="max-h-full max-w-full"
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </div>

                  {/* Description */}
                  <div className="text-sm text-white bg-[#328E6E] mb-4 px-2 py-1 rounded">
                    {post.description || 'No caption'}
                  </div>

                  {/* Upvotes, Downvotes, Status, View Details */}
                  <div className="flex items-center justify-between mt-4 text-sm gap-4 flex-wrap">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpvote(post._id)}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        👍 Upvote ({post.upvotes || 0})
                      </button>
                      <button
                        onClick={() => handleDownvote(post._id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        👎 Downvote ({post.downvotes || 0})
                      </button>
                    </div>

                    <div className="text-center mx-2">
                      <span>
                        {verification < 10 ? 'Pending' : 'Approved'} &nbsp;
                      </span>
                      {verification} / 10 Upvotes
                    </div>

                    <Link
                      to={`/proof/${post._id}`}
                      className="px-4 py-2 bg-[#026873] text-white text-sm font-semibold rounded-[22px] hover:bg-[#025940] transition duration-200 ease-in-out"
                    >
                      View Details
                    </Link>
                  </div>

                  {/* Verification Progress Bar */}
                  <div className="mt-2 w-full bg-gray-300 rounded-full h-4 overflow-hidden">
                    <div
                      className="bg-[#03A64A] h-4 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                      aria-label={`Verification progress: ${verification} out of 10`}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Post Detail Popup */}
      {selectedPostId && (
        <PostDetailPopup
          postId={selectedPostId}
          onClose={() => setSelectedPostId(null)}
        />
      )}
    </>
  );
};
