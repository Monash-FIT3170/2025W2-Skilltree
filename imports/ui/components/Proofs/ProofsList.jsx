// React imports
import React, { useState } from 'react';

// Meteor-specific imports
import { useSubscribeSuspense } from 'meteor/communitypackages:react-router-ssr';
import { Meteor } from 'meteor/meteor';
import { useFind } from 'meteor/react-meteor-data/suspense';

// Collections & Components
import { ProofCollection } from '/imports/api/collections/Proof';
import { ProofDetails } from '/imports/ui/pages/ProofDetails';

/**
 * Component: ProofsList
 *
 * Displays a list of uploaded proofs from the ProofCollection,
 * allowing users to upvote, downvote, and view additional details in a popup.
 *
 * Features:
 * - Data fetching via Meteor subscriptions.
 * - Real-time reactive updates using `useFind`.
 * - Interactive upvote/downvote functionality.
 * - Conditional rendering for loading and empty states.
 * - Detail popup shown on 'View Details' click.
 */
export const ProofsList = ({ skilltreeId, userRoles = [] }) => {
  // Track selected proof to open its detail modal
  const proofMaxVotes = 10; // Maximum votes for a proof
  const [selectedProofId, setSelectedProofId] = useState(null);
  const currentUserId = Meteor.userId();

  /**
   * useFind hook:
   * - Subscribes to the 'proof' publication.
   * - Fetches all proofs, sorted by date (latest first).
   */
  useSubscribeSuspense('proof');
  const proofs =
    useFind(ProofCollection, [
      { skillTreeId: { $eq: skilltreeId } },
      {
        fields: {
          description: 1,
          user: 1,
          username: 1,
          date: 1,
          evidenceLink: 1,
          subskill: 1,
          upvotes: 1,
          downvotes: 1,
          expertVerified: 1, // ai double check this extra line is a correct implementation and is valid
          expertVerifiers: 1 // Added expertVerifiers field
        },
        sort: { date: -1 }
      }
    ]) ?? [];

  // Empty state UI
  if (proofs.length === 0) return <div>No proofs found.</div>;

  /**
   * Formats a given date into a human-readable string.
   * E.g., "28 May 2025, 03:15 PM"
   */
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

  /**
   * Calls the Meteor method to upvote a proof.
   * Errors are logged to console if the call fails.
   */
  const handleUpvote = proofId => {
    Meteor.call('proof.upvote', proofId, error => {
      if (error) console.error('Upvote failed:', error.reason);
    });
  };

  /**
   * Calls the Meteor method to downvote a proof.
   * Errors are logged to console if the call fails.
   */
  const handleDownvote = proofId => {
    Meteor.call('proof.downvote', proofId, error => {
      if (error) console.error('Downvote failed:', error.reason);
    });
  };

  const handleVerify = proofId => {
    Meteor.call('proof.verify', proofId, error => {
      if (error) console.error('Verify failed:', error.reason);
    });
  };

  return (
    <div className="min-h-screen bg-white py-6 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-screen-2xl mx-auto">
        {/* Grid Layout for Proof Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {proofs.map(proof => {
            // Calculate net votes and progress bar, ensure non-negative
            const netVotesRaw = (proof.upvotes || 0) - (proof.downvotes || 0);
            const netVotes = Math.max(Math.min(netVotesRaw, proofMaxVotes), 0);
            const progressPercent = Math.min(
              (netVotes / proofMaxVotes) * 100,
              100
            );

            return (
              <div key={proof._id} className="p-4 bg-[#D2EAD1] rounded-xl">
                {/* Header: User and Date */}
                <div className="text-sm text-black h-6 mb-1 flex items-center justify-between px-2">
                  <span className="flex items-center">
                    {proof.user === currentUserId && (
                      <span className="mr-1">👑</span>
                    )}
                    <span>{proof.username}</span>
                  </span>
                  <span className="text-xs italic">
                    {formatDate(proof.date)}
                  </span>
                </div>

                {/* Subskill Tag */}
                <div className="text-sm font-bold text-black h-6 mb-2 px-2">
                  {proof.subskill || 'Subskill Placeholder'}
                  {typeof proof.expertVerified === 'number' && proof.expertVerified > 0 && (
                    <span className="ml-2 text-xs text-green-700 font-semibold">
                      ✅ Verified by Expert ({proof.expertVerified})
                    </span>
                  )}
                </div>

                {/* Evidence Image Preview */}
                <div className="w-full h-48 mb-4 bg-gray-300 flex items-center justify-center">
                  {proof.evidenceLink ? (
                    <img
                      src={proof.evidenceLink}
                      alt="Evidence"
                      className="max-h-full max-w-full"
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </div>

                {/* Description Caption */}
                <div className="text-sm text-black mb-4 px-2 py-1 rounded">
                  {proof.description || 'No caption'}
                </div>
                {/* Controls: Voting, Status, and View Details */}
                <div className="flex items-center justify-between mt-4 text-sm gap-4 flex-wrap">
                  {userRoles.includes('expert') && (
                    <button
                      onClick={() => handleVerify(proof._id)}
                      className={`px-3 py-1 rounded ${
                        proof.expertVerifiers?.includes(currentUserId)
                          ? 'bg-green-600 hover:bg-green-700 text-white'
                          : 'bg-green-600 hover:bg-green-700 text-white'
                      }`}
                    >
                      {proof.expertVerifiers?.includes(currentUserId) ? (
                        <>⭐ Unverify ({proof.expertVerified || 0})</>
                      ) : (
                        <>⭐ Verify ({proof.expertVerified || 0})</>
                      )}
                    </button>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpvote(proof._id)}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      👍 Upvote ({proof.upvotes || 0})
                    </button>
                    <button
                      onClick={() => handleDownvote(proof._id)}
                      className="px-3 py-1 bg-[#024059] text-white rounded hover:bg-[#032E3F]"
                    >
                      👎 Downvote ({proof.downvotes || 0})
                    </button>
                  </div>
                  
                  
                  {/* Net Upvotes Status */}
                  <div className="text-center mx-2">
                    <span>
                      {netVotesRaw < proofMaxVotes ? 'Pending' : 'Approved'}{' '}
                      &nbsp;
                    </span>
                    {netVotes < 0 ? 0 : netVotes} / {proofMaxVotes} Net Upvotes
                  </div>
                  {/* Show Proof Details Button */}
                  <button
                    onClick={() => setSelectedProofId(proof._id)}
                    className="px-4 py-2 text-white font-semibold text-sm rounded-[22px] transition-colors duration-300"
                    style={{ backgroundColor: '#024059' }}
                    onMouseOver={e =>
                      (e.currentTarget.style.backgroundColor = '#025940')
                    }
                    onMouseOut={e =>
                      (e.currentTarget.style.backgroundColor = '#024059')
                    }
                  >
                    View Details
                  </button>
                </div>

                {/* Visual Progress Bar for Net Upvotes */}
                <div className="mt-2 w-full bg-gray-300 rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-[#03A64A] h-4 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                    aria-label={`Net upvotes progress: ${netVotes} out of ${proofMaxVotes}`}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal: Proof Details Popup */}
      {selectedProofId && (
        <ProofDetails
          proofId={selectedProofId}
          onClose={() => setSelectedProofId(null)}
        />
      )}
    </div>
  );
};
