//TODO (not possible at the moment, as no proof or user context is available)
// have method to get the current user
// have method to get current proof id

import React from 'react';
import { Meteor } from 'meteor/meteor';

export const AddComment = ({ username, proofid }) => {
  const [comment, setComment] = React.useState('');

  const handleAddComment = async e => {
    e.preventDefault(); // prevent reloading the page
    if (comment.trim()) {
      // Placeholder for addComment method
      const commentToInsert = {
        username: username,
        comment: comment.trim(),
        proofId: proofid,
        createdAt: new Date()
      };
      try {
        await Meteor.callAsync('addComment', commentToInsert);
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
//             Proof
//         </button>
//     </div>
// );
