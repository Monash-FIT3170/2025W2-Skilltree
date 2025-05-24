import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

import { PostCollection } from '/imports/api/collections/PostCollection';
import { AddComment } from './AddComment';
import { CommentSection } from '/imports/ui/components/CommentSection';
import { PostDetailPopup } from '/imports/ui/pages/PostDetailPopup';

export const ProofsPostList = () => {
  const [selectedPostId, setSelectedPostId] = useState(null);

  const { posts, isLoading } = useTracker(() => {
    const handle = Meteor.subscribe('post');
    const data = PostCollection.find({}, { sort: { date: -1 } }).fetch();

    return {
      posts: Array.isArray(data) ? data : [],
      isLoading: !handle.ready()
    };
  }, []);

  if (isLoading) return <div>Loading posts...</div>;

  if (posts.length === 0) return <div>No posts found.</div>;

  const formatDate = (date) => {
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

  const handleUpvote = (postId) => {
    Meteor.call('post.upvote', postId, (error) => {
      if (error) console.error('Upvote failed:', error.reason);
    });
  };

  const handleDownvote = (postId) => {
    Meteor.call('post.downvote', postId, (error) => {
      if (error) console.error('Downvote failed:', error.reason);
    });
  };

  return (
    <div className="min-h-screen bg-white py-6 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {posts.map(post => {
            const verification = post.verification || 0;
            const progressPercent = Math.min((verification / 10) * 100, 100);

            return (
              <div key={post._id} className="p-4 bg-[#D2EAD1] rounded-xl ">
                {/* User & Date */}
                <div className="text-sm text-white bg-[#328E6E] h-6 mb-1 flex items-center justify-between px-2 ">
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

                {/* Evidence Image */}
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
                      {post.verification < 10 ? 'Pending' : 'Approved'} &nbsp;
                    </span>
                    {post.verification} / 10 Upvotes
                  </div>

                  <button
                    onClick={() => setSelectedPostId(post._id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 whitespace-nowrap"
                  >
                    View Details
                  </button>
                </div>

                {/* Verification Progress Bar */}
                <div className="mt-2 w-full bg-gray-300 rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-[#03A64A] h-4 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                    aria-label={`Verification progress: ${verification} out of 10`}
                  ></div>
                </div>

                {/* Comment Section */}
                <div className="p-3 border-t border-gray-300 mt-12">
                  <div className="mb-2">
                    <AddComment
                      username="Username Placeholder"
                      postid={post._id}
                    />
                  </div>
                  <CommentSection postId={post._id} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Post Detail Popup */}
      {selectedPostId && (
        <PostDetailPopup
          postId={selectedPostId}
          onClose={() => setSelectedPostId(null)}
        />
      )}
    </div>
  );d
};


// import { Meteor } from 'meteor/meteor';

// import { useTracker } from 'meteor/react-meteor-data';
// import { AddComment } from './AddComment';
// import { PostCollection } from '/imports/api/collections/PostCollection';
// import { CommentSection } from '/imports/ui/components/CommentSection';
// import { Link } from 'react-router-dom';
// import React, { useState } from 'react';
// import { PostDetailPopup } from '/imports/ui/pages/PostDetailPopup';


// export const ProofsPostList = () => {
//   const [selectedPostId, setSelectedPostId] = useState(null);
//   const { posts, isLoading } = useTracker(() => {
//     const handle = Meteor.subscribe('post');
//     const currentUser = Meteor.userId();

//     const data = PostCollection.find({}, { sort: { date: -1 } }).fetch();

//     return {
//       posts: Array.isArray(data) ? data : [],
//       isLoading: !handle.ready()
//     };
//   }, []);

//   if (isLoading) {
//     return <div>Loading posts...</div>;
//   }

//   if (posts.length === 0) {
//     return <div>No posts found.</div>;
//   }

//   const formatDate = date => {
//     if (!date) return '';
//     const d = new Date(date);
//     return d.toLocaleDateString(undefined, {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };
//   const handleUpvote = (postId) => {
//     Meteor.call('post.upvote', postId, (error, result) => {
//       if (error) {
//         console.error('Upvote failed:', error.reason);
//       } else {
//         console.log('Upvoted post:', postId);
//       }
//     });
//   };

//   const handleDownvote = (postId) => {
//     Meteor.call('post.downvote', postId, (error, result) => {
//       if (error) {
//         console.error('Downvote failed:', error.reason);
//       } else {
//         console.log('Downvoted post:', postId);
//       }
//     });
//   };
  


//   return (
//     <div className="min-h-screen bg-white py-6 px-4 sm:px-6 lg:px-8">
//       <div className="w-full max-w-screen-2xl mx-auto">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {posts.map(post => {
//             const verification = post.verification || 0;
//             const progressPercent = Math.min((verification / 10) * 100, 100);

//             return (
//               <div key={post._id} className="p-4 bg-[#D2EAD1] rounded-xl ">
//                 {/* (unchanged parts of post card...) */}

//                 {/* Replace View Details Link with Popup Trigger */}
//                 <div className="flex items-center justify-between mt-4 text-sm gap-4 flex-wrap">
//                   {/* Upvote/Downvote Buttons */}
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => handleUpvote(post._id)}
//                       className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
//                     >
//                       👍 Upvote ({post.upvotes || 0})
//                     </button>
//                     <button
//                       onClick={() => handleDownvote(post._id)}
//                       className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
//                     >
//                       👎 Downvote ({post.downvotes || 0})
//                     </button>
//                   </div>

//                   <div className="text-center mx-2">
//                     <span>
//                       {post.verification < 10 ? 'Pending' : 'Approved'} &nbsp;
//                     </span>
//                     {post.verification} / 10 Upvotes
//                   </div>

//                   {/* Popup Button */}
//                   <button
//                     onClick={() => setSelectedPostId(post._id)}
//                     className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 whitespace-nowrap"
//                   >
//                     View Details
//                   </button>
//                 </div>

//                 {/* Progress bar + Comment section (unchanged) */}
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* 🔍 Post Detail Popup */}
//       {selectedPostId && (
//         <PostDetailPopup
//           postId={selectedPostId}
//           onClose={() => setSelectedPostId(null)}
//         />
//       )}
//     </div>
//   );
// };

//     <div className="min-h-screen bg-white py-6 px-4 sm:px-6 lg:px-8">
//       <div className="w-full max-w-screen-2xl mx-auto">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {posts.map(post => {
//             const verification = post.verification || 0;
//             const progressPercent = Math.min((verification / 10) * 100, 100);

//             return (
//               <div key={post._id} className="p-4 bg-[#D2EAD1] rounded-xl ">
//                 {/* User & Date */}
//                 <div className="text-sm text-white bg-[#328E6E] h-6 mb-1 flex items-center justify-between px-2 ">
//                   <span className="flex items-center">
//                     <span className="mr-1">👑</span>
//                     <span>{post.user}</span>
//                   </span>
//                   <span className="text-xs italic">
//                     {formatDate(post.date)}
//                   </span>
//                 </div>

//                 {/* Subskill */}
//                 <div className="text-sm text-white bg-gray-400 h-6 mb-2 px-2">
//                   {post.subskill || 'Subskill Placeholder'}
//                 </div>

//                 {/* Evidence Image */}
//                 <div className="w-full h-48 mb-4 bg-gray-300 flex items-center justify-center">
//                   {post.evidence ? (
//                     <img
//                       src={post.evidence}
//                       alt="Evidence"
//                       className="max-h-full max-w-full"
//                     />
//                   ) : (
//                     <span>No Image</span>
//                   )}
//                 </div>

//                 {/* Description */}
//                 <div className="text-sm text-white bg-[#328E6E] mb-4 px-2 py-1 rounded">
//                   {post.description || 'No caption'}
//                 </div>

//                 {/* Upvotes, Downvotes, Status, View Details */}
//                 <div className="flex items-center justify-between mt-4 text-sm gap-4 flex-wrap">
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => handleUpvote(post._id)}
//                       className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
//                     >
//                       👍 Upvote ({post.upvotes || 0})
//                     </button>
//                     <button
//                       onClick={() => handleDownvote(post._id)}
//                       className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
//                     >
//                       👎 Downvote ({post.downvotes || 0})
//                     </button>
//                   </div>


//                   <div className="text-center mx-2">
//                     <span>
//                       {post.verification < 10 ? 'Pending' : 'Approved'} &nbsp;
//                     </span>
//                     {post.verification} / 10 Upvotes
//                   </div>

//                   <Link
//                     to={`/post/${post._id}`}
//                     className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 whitespace-nowrap"
//                   >
//                     View Details
//                   </Link>
//                 </div>

//                 {/* Verification Progress Bar */}
//                 <div className="mt-2 w-full bg-gray-300 rounded-full h-4 overflow-hidden">
//                   <div
//                     className="bg-[#03A64A] h-4 rounded-full transition-all duration-500"
//                     style={{ width: `${progressPercent}%` }}
//                     aria-label={`Verification progress: ${verification} out of 10`}
//                   ></div>
//                 </div>

//                 {/* Comment Section */}
//                 <div className="p-3 border-t border-gray-300 mt-12">
//                   <div className="mb-2">
//                     <AddComment
//                       username="Username Placeholder"
//                       postid={post._id}
//                     />
//                   </div>
//                   <CommentSection postId={post._id} />
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };
