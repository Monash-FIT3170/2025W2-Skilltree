//TODO (not possible at the moment, as no post or user context is available)
// have method to get the current user
// have method to get current post id

import React from 'react';
import { Meteor } from 'meteor/meteor';

export const AddComment = ({ username, postid }) => {
  const [comment, setComment] = React.useState('');

  const handleAddComment = async e => {
    e.preventDefault(); // prevent reloading the page
    if (comment.trim()) {
      // Placeholder for addComment method
      try {
        await Meteor.callAsync(
          'commentInsert',
          username,
          comment.trim(),
          postid
        );
        setComment(''); // Clear input on success
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };

  return (
    <form onSubmit={handleAddComment} className="add-comment">
      <input
        type="text"
        placeholder="Add a comment..."
        value={comment}
        onChange={e => setComment(e.target.value)}
        className="comment-input"
      />
      <button type="submit" style={{ display: 'none' }}>
        Submit
      </button>
    </form>
  );
};

// return (
//     <div className="add-comment">
//         <input
//             type="text"
//             placeholder="Add a comment..."
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//             className="comment-input"
//         />
//         <button onClick={handleAddComment} className="comment-button">
//             Post
//         </button>
//     </div>
// );
