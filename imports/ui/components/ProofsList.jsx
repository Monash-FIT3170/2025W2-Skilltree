import React from 'react';

import { AddComment } from './AddComment';
import { useFind } from 'meteor/react-meteor-data/suspense';
import { useSubscribeSuspense } from 'meteor/communitypackages:react-router-ssr';
import { ProofCollection } from '/imports/api/collections/Proof';
import { CommentSection } from '/imports/ui/components/CommentSection';
import { Link } from 'react-router-dom';

export const ProofsList = () => {
  useSubscribeSuspense('proof');
  const proofs = useFind(ProofCollection, [{}, { sort: { date: -1 } }]) || [];

  if (proofs.length === 0) {
    return <div>No proofs found.</div>;
  }

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

  return (
    <div className="min-h-screen bg-white py-6 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {proofs.map(proof => {
            const verification = proof.verification || 0;
            const progressPercent = Math.min((verification / 10) * 100, 100);

            return (
              <div key={proof._id} className="p-4 bg-[#D2EAD1] rounded-xl ">
                {/* User & Date */}
                <div className="text-sm text-white bg-[#328E6E] h-6 mb-1 flex items-center justify-between px-2 ">
                  <span className="flex items-center">
                    <span className="mr-1">👑</span>
                    <span>{proof.user}</span>
                  </span>
                  <span className="text-xs italic">
                    {formatDate(proof.date)}
                  </span>
                </div>

                {/* Subskill */}
                <div className="text-sm text-white bg-gray-400 h-6 mb-2 px-2">
                  {proof.subskill || 'Subskill Placeholder'}
                </div>

                {/* EvidenceLink Image */}
                <div className="w-full h-48 mb-4 bg-gray-300 flex items-center justify-center">
                  {proof.evidenceLink ? (
                    <img
                      src={proof.evidenceLink}
                      alt="EvidenceLink"
                      className="max-h-full max-w-full"
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </div>

                {/* Description */}
                <div className="text-sm text-white bg-[#328E6E] mb-4 px-2 py-1 rounded">
                  {proof.description || 'No caption'}
                </div>

                {/* Upvotes, Downvotes, Status, View Details */}
                <div className="flex items-center justify-between mt-4 text-sm gap-4 flex-wrap">
                  <div className="flex gap-4">
                    <div>👍 {proof.upvotes}</div>
                    <div>👎 {proof.downvotes}</div>
                  </div>

                  <div className="text-center mx-2">
                    <span>
                      {proof.verification < 10 ? 'Pending' : 'Approved'} &nbsp;
                    </span>
                    {proof.verification} / 10 Upvotes
                  </div>

                  <Link
                    to={`/proof/${proof._id}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 whitespace-nowrap"
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

                {/* Comment Section */}
                <div className="p-3 border-t border-gray-300 mt-12">
                  <div className="mb-2">
                    <AddComment
                      username="Username Placeholder"
                      proofid={proof._id}
                    />
                  </div>
                  <CommentSection proofId={proof._id} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
