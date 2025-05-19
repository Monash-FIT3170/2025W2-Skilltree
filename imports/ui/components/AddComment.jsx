//TODO (not possible at the moment, as no post or user context is available)
// have method to get the current user
//have method to get current post id

import React from 'react';

export const AddComment = ({ username, postid }) => {
    const [comment, setComment] = React.useState('');

    const handleAddComment = () => {
        if (comment.trim()) {
            // Placeholder for addComment method
            Meteor.call('comments.insert', username, comment.trim(), postid, (error) => {
                if (error) {
                    console.error('Error adding comment:', error);
                } else {
                    setComment(''); // Clear input on success
                }
            });
        }
    };

    return (
        <form onSubmit={handleAddComment} className="add-comment">
            <input
                type="text"
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="comment-input"
            />
        </form>
    );
}


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