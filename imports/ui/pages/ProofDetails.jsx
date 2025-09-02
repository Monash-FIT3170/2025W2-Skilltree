/**
 * @fileoverview Component to display detailed view of a single proof post.
 * Includes post metadata, image, description, upvote/downvote buttons,
 * and an embedded comment section.
 */

import React from 'react';
import { useSubscribe, useFind } from 'meteor/react-meteor-data/suspense';
import { Meteor } from 'meteor/meteor';
import { ProofCollection } from '/imports/api/collections/Proof';
import { CommentSection } from '../components/Proofs/Comments/CommentSection';
import { AddComment } from '../components/Proofs/Comments/AddComment';
import { User } from '/imports/utils/User';

/**
 * Displays a modal popup with full details of a selected proof.
 *
 * @component
 * @param {Object} props
 * @param {string} props.proofId - The MongoDB _id of the proof document to display.
 * @param {Function} props.onClose - Callback to close the popup.
 */
export const ProofDetails = ({ proofId, onClose }) => {
  /**
   * Fetches the selected proof document from the Meteor data layer.
   */
  useSubscribe('proof');
  const proof = useFind(ProofCollection, [
    { _id: { $eq: proofId } },
    {
      fields: {
        description: 1,
        user: 1,
        username: 1,
        date: 1,
        evidenceLink: 1,
        subskill: 1,
        upvotes: 1,
        downvotes: 1
      }
    }
  ])[0];

  /**
   * Handles upvote action by calling the 'proof.upvote' Meteor method.
   */
  const handleUpvote = () => Meteor.call('proof.upvote', proof._id);

  /**
   * Handles downvote action by calling the 'proof.downvote' Meteor method.
   */
  const handleDownvote = () => Meteor.call('proof.downvote', proof._id);

  /**
   * Formats a JavaScript Date object into a human-readable string.
   * @param {Date|string} date
   * @returns {string}
   */
  const formatDate = date =>
    new Date(date).toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

  // Return nothing if data proof doesn't exist
  if (!proof) return null;

  const { username } = User(['username']);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={() => onClose()}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-xl w-full max-w-6xl h-[90vh] overflow-hidden relative"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => onClose()}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
        >
          ✕
        </button>

        <div className="flex h-full gap-6">
          {/* Post Details */}
          <div className="w-1/2 overflow-y-auto pr-4">
            <h2 className="text-xl font-semibold mb-1">{proof.title}</h2>
            <p className="text-sm text-gray-500">
              by {proof.username} | {formatDate(proof.date)}
            </p>
            <p className="text-gray-600 mt-2">
              Subskill: <strong>{proof.subskill}</strong>
            </p>

            {/* Evidence Image or Placeholder */}
            {proof.evidenceLink ? (
              <img
                src={proof.evidenceLink}
                alt="Evidence"
                className="w-full max-h-96 object-cover rounded mt-4 mb-4"
              />
            ) : (
              <div
                className="w-full h-48 flex items-center justify-center bg-gray-300 text-gray-600 rounded mt-4 mb-4"
                style={{ fontStyle: 'italic', height: '450px' }}
              >
                No Photo
              </div>
            )}

            {/* Description */}
            <p className="text-gray-700 mb-4">
              {proof.description || 'No description provided.'}
            </p>

            {/* Voting Controls */}
            <div className="flex space-x-4 mb-6">
              <button
                onClick={handleUpvote}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                👍 Upvote ({proof.upvotes || 0})
              </button>
              <button
                onClick={handleDownvote}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                👎 Downvote ({proof.downvotes || 0})
              </button>
            </div>
          </div>

          {/* Comment Section */}
          <div className="w-1/2 border-l border-gray-300 pl-4 overflow-y-auto">
            <h3 className="text-lg font-semibold mb-2">Comments</h3>
            <AddComment username={username} proofid={proof._id} />
            <CommentSection proofId={proof._id} />
          </div>
        </div>
      </div>
    </div>
  );
};
