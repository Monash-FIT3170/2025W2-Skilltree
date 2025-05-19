import React from 'react';
import { CommentsCollection } from '/imports/api/collections/Comments';
import { useSubscribeSuspense } from 'meteor/communitypackages:react-router-ssr';
import { useFind } from 'meteor/react-meteor-data/suspense';

export const CommentSection = () => {
  // Subscribe to comments and get real-time data
  useSubscribeSuspense('comments');
  const comments = useFind(CommentsCollection, [
    {},
    { sort: { createdAt: -1 } }
  ]);

  // Format date to be more readable
  const formatDate = date => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Shows a scrollable comment section
  return (
    <div
      style={{
        maxHeight: '300px',
        overflowY: 'scroll',
        border: '1px solid #ccc',
        padding: '10px',
        borderRadius: '5px'
      }}
    >
      {comments.map(item => (
        <div
          key={item._id}
          style={{
            marginBottom: '15px',
            padding: '10px',
            borderBottom: '1px solid #eee'
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '5px'
            }}
          >
            <strong>{item.username}</strong>
            <span style={{ fontSize: '0.8rem', color: '#666' }}>
              {formatDate(item.createdAt)}
            </span>
          </div>
          <p style={{ margin: '5px 0' }}>{item.comment}</p>
        </div>
      ))}
    </div>
  );
};
