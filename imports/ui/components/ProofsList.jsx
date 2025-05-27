import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { ProofCollection } from '/imports/api/collections/Proof';
import { ProofDetails } from '/imports/ui/pages/ProofDetails'; 

export const ProofsList = () => {
  const [selectedProofId, setSelectedProofId] = useState(null);

  const { proofs, isLoading } = useTracker(() => {
    const handle = Meteor.subscribe('proof');
    const data = ProofCollection.find({}, { sort: { date: -1 } }).fetch();

    return {
      proofs: Array.isArray(data) ? data : [],
      isLoading: !handle.ready()
    };
  }, []);

  if (isLoading) return <div>Loading proofs...</div>;

  if (proofs.length === 0) return <div>No proofs found.</div>;

  const formatDate = (date) => {
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

  const handleUpvote = (proofId) => {
    Meteor.call('proof.upvote', proofId, (error) => {
      if (error) console.error('Upvote failed:', error.reason);
    });
  };

  const handleDownvote = (proofId) => {
    Meteor.call('proof.downvote', proofId, (error) => {
      if (error) console.error('Downvote failed:', error.reason);
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
                  <span className="text-xs italic">{formatDate(proof.date)}</span>
                </div>

                {/* Subskill */}
                <div className="text-sm text-white bg-gray-400 h-6 mb-2 px-2">
                  {proof.subskill || 'Subskill Placeholder'}
                </div>

                {/* Evidence Image */}
                <div className="w-full h-48 mb-4 bg-gray-300 flex items-center justify-center">
                  {proof.evidenceLink ? (
                    <img src={proof.evidenceLink} alt="Evidence" className="max-h-full max-w-full" />

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
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpvote(proof._id)}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      👍 Upvote ({proof.upvotes || 0})
                    </button>
                    <button
                      onClick={() => handleDownvote(proof._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      👎 Downvote ({proof.downvotes || 0})
                    </button>
                  </div>

                  <div className="text-center mx-2">
                    <span>
                      {proof.verification < 10 ? 'Pending' : 'Approved'} &nbsp;
                    </span>
                    {proof.verification} / 10 Upvotes
                  </div>

                  <button
                    onClick={() => setSelectedProofId(proof._id)}
                    className="px-4 py-2 text-white font-semibold text-sm rounded-[22px] transition-colors duration-300"
                    style={{
                      backgroundColor: '#024059'
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#025940')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#024059')}
                  >
                    View Details
                  </button>

                </div>

                {/* Verification Progress Bar */}
                <div className="mt-2 w-full bg-gray-300 rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-[#03A64A] h-4 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                    aria-label={`Verification progress: ${verification} out of 10`}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Proof Detail Popup */}
      {selectedProofId && (
        <ProofDetails
          proofId={selectedProofId}
          onClose={() => setSelectedProofId(null)}
        />
      )}
    </div>
  );
};
