// React imports
import React from 'react';

// Meteor-specific imports
import { useFind, useSubscribe } from 'meteor/react-meteor-data/suspense';

// Utils imports
import { toLocale } from '/imports/utils/Locale';

// Collections & Components
import { VoteUpButton } from './VoteUpButton';
import { ProofCollection } from '/imports/api/collections/Proof';
import { User } from '/imports/utils/User';

/**
 * Component: EventCard
 * Displays a list of events.
 * Currently uses the proofs as event cards as a placeholder
 * Accepts a filter prop to sort by date or upvotes
 */
export const EventCard = ({ eventId, skilltreeId, filter = 'default' }) => {
  const user = User(['_id']);
  const currentUserId = user?._id ?? '';
  /**
   * useFind hook:
   * - Subscribes to the 'proof' publication.
   * - Fetches all proofs, sorted by date (latest first).
   */
  useSubscribe('proof');

  // Always fetch by date descending for consistency, then sort in-memory if needed
  const proofs =
    useFind(ProofCollection, [
      { eventId: { $eq: eventId } },
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

  // Sort proofs based on filter
  let sortedProofs = proofs;
  if (filter === 'upvotes') {
    sortedProofs = [...proofs].sort((a, b) => {
      // Sort descending by upvotes (highest first)
      const upA = typeof a.upvotes === 'number' ? a.upvotes : 0;
      const upB = typeof b.upvotes === 'number' ? b.upvotes : 0;
      return upB - upA;
    });
  }

  // Empty state UI
  if (sortedProofs.length === 0) return <div>No proofs found.</div>;

  return (
    <div className="min-h-screen bg-white py-6 px-2 sm:px-3 lg:px-4">
      <div className="w-full max-w-screen-2xl mx-auto">
        {/* Grid Layout for Event Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProofs.map(proof => {
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
                  <span className="text-xs italic popInEffect">
                    {toLocale(proof.date, 'DateTimeShort')}
                  </span>
                </div>

                {/* Evidence Image Preview */}
                <div className="w-full h-48 mb-4 bg-gray-300 flex items-center justify-center">
                  {proof.evidenceLink ? (
                    proof.evidenceLink.includes('.mp4') ? (
                      <video
                        alt="EventCard Evidence"
                        src={proof.evidenceLink}
                        controls
                        typeof="video/mp4"
                        className="max-h-full max-w-full"
                      />
                    ) : (
                      <img
                        src={proof.evidenceLink}
                        alt="Evidence"
                        className="max-h-full max-w-full"
                      />
                    )
                  ) : (
                    <span>No Image</span>
                  )}
                </div>

                {/* Description Caption */}
                <div className="text-sm text-black mb-4 px-2 py-1 rounded">
                  {proof.description || 'Event submission'}
                </div>
                {/* Controls: Voting, Status, and View Details */}
                <div className="flex items-center justify-between mt-4 text-sm gap-4 flex-wrap">
                  {/* Voting Controls */}
                  <VoteUpButton proof={proof} skilltreeId={skilltreeId} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
