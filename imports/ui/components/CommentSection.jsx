import React, { useState } from 'react';
import { CommentsCollection } from '/imports/api/collections/Comments';
import { useSubscribeSuspense } from 'meteor/communitypackages:react-router-ssr';
import { useFind } from 'meteor/react-meteor-data/suspense';
import { Meteor } from 'meteor/meteor';
import '/imports/api/methods/Comments';

export const CommentSection = () => {
  const DUMMY_USERNAME = 'user1';

  useSubscribeSuspense('comments');
  const comments = useFind(CommentsCollection, [
    {},
    { sort: { createdAt: -1 } }
  ]);

  const [editingComment, setEditingComment] = useState('');
  const [currentText, setCurrentText] = useState('');

  const formatDate = date => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const edit = async id => {
    setEditingComment(id);
    setCurrentText(comments.find(item => item._id === id).comment);
  };

  const submitEdit = async (id, newText) => {
    if (newText.trim() === '') {
      alert('Please enter a comment');
      return;
    }
    await Meteor.callAsync('editComment', id, newText);
    setEditingComment('');
    setCurrentText('');
  };

  const deleteComment = async id => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this comment?'
    );
    if (!confirmed) return;

    try {
      await Meteor.callAsync('deleteComment', id);
    } catch (err) {
      alert(`Failed to delete comment: ${err.message}`);
    }
  };

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

          {editingComment === item._id ? (
            <div>
              <textarea
                onChange={e => setCurrentText(e.target.value)}
                value={currentText}
                className="w-full bg-white"
              ></textarea>
              <button
                className="text-center border-2 border-emerald-950 bg-emerald-600 text-white font-bold py-1 px-2 rounded hover:bg-emerald-700 active:bg-emerald-500 mt-2"
                onClick={() => submitEdit(item._id, currentText)}
              >
                Save
              </button>
            </div>
          ) : (
            <>
              <p style={{ margin: '5px 0' }}>{item.comment}</p>
              {item.username === DUMMY_USERNAME && (
                <div id="user-actions-container" className="flex gap-2">
                  <button
                    id="edit-btn"
                    className="text-center border-2 border-gray-950 bg-gray-600 text-white font-bold py-1 px-2 rounded hover:bg-gray-700 active:bg-gray-500 mt-2"
                    onClick={() => edit(item._id)}
                  >
                    Edit
                  </button>
                  <button
                    id="delete-btn"
                    className="text-center border-2 border-red-950 bg-red-600 text-white font-bold py-1 px-2 rounded hover:bg-red-700 active:bg-red-500 mt-2"
                    onClick={() => deleteComment(item._id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};
