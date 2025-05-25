import React from 'react';
import { useParams } from 'react-router-dom';
import { useFind } from 'meteor/react-meteor-data/suspense';
import { useSubscribeSuspense } from 'meteor/communitypackages:react-router-ssr';
import { Meteor } from 'meteor/meteor';
import { ProofCollection } from '/imports/api/collections/Proof';
import { FullCommentSection } from '../components/FullCommentSection';

export const ProofDetails = () => {
  const { id } = useParams();

  useSubscribeSuspense('proof');
  const proof = useFind(ProofCollection, [{ _id: { $eq: id } }])[0]; // Find returns an array of matches, [0] first value for 'findOne'

  if (!proof) return <div className="p-4">Proof not found.</div>;

  const formatDate = date => {
    if (!date) return '';
    return new Date(date).toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleUpvote = () => Meteor.call('proof.upvote', proof._id);
  const handleDownvote = () => Meteor.call('proof.downvote', proof._id);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-2">{proof.user}</h2>
      <p className="text-gray-600 mb-1">Subskill: {proof.subskill || 'N/A'}</p>
      <p className="text-gray-500 text-sm mb-4">
        Proofed on: {formatDate(proof.date)}
      </p>

      <div className="w-full mb-4 flex gap-4">
        <div className="w-1/2">
          {proof.evidence ? (
            <img
              src={proof.evidence}
              alt="Proof Evidence"
              className="w-full max-h-[400px] object-contain rounded"
            />
          ) : (
            <div className="bg-gray-200 h-full flex items-center justify-center rounded w-full">
              No Image Available
            </div>
          )}
        </div>

        <div className="w-1/2">
          <FullCommentSection
            username="usernameOfPersonLoggedIn"
            proofid={proof._id}
          />
        </div>
      </div>

      <p className="mb-6 text-lg text-gray-700">
        {proof.description || 'No caption provided.'}
      </p>

      <div className="flex space-x-4">
        <button
          onClick={handleUpvote}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          👍 Upvote ({proof.upvotes || 0})
        </button>
        <button
          onClick={handleDownvote}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          👎 Downvote ({proof.downvotes || 0})
        </button>
      </div>
    </div>
  );
};
