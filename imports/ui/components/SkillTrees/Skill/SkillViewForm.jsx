import { Meteor } from 'meteor/meteor';
import { useEffect, useState } from 'react';
import { ProofUploadButton } from './ProofUploadButton';
import { User } from '/imports/utils/User';
import React from 'react';

export const SkillViewForm = ({
  skilltreeId,
  editingNode,
  onCancel,
  onUploadProof
}) => {
  const [isUserSubscribed, setIsUserSubscribed] = useState(false);

  const user = User(['_id']);
  const userId = user?._id ?? '';

  useEffect(() => {
    if (!skilltreeId || !userId) return;

    const checkStatus = async () => {
      const isSubscribed = await checkUserIsSubscribed();
      setIsUserSubscribed(isSubscribed);
    };
    checkStatus();
  }, [skilltreeId, userId]);

  const checkUserIsSubscribed = async () => {
    try {
      const foundUser = await Meteor.callAsync(
        'skilltrees.findUser',
        skilltreeId,
        userId
      );
      return !!foundUser;
    } catch (error) {
      console.error('Error checking subscription:', error);
      return false;
    }
  };

  const currentUpvotes = editingNode.currentNetUpvotes || 0;
  const requiredUpvotes = editingNode.netUpvotesRequired || 0;

  // Calculate progress, ensuring we don't divide by zero
  const progress = requiredUpvotes > 0
    ? Math.floor((currentUpvotes / requiredUpvotes) * 100)
    : 100; // If 0 required, consider it 100% complete

  const remainder = Math.max(0, requiredUpvotes - currentUpvotes);
  const isComplete = currentUpvotes >= requiredUpvotes;
  const progressBarWidth = `${Math.min(100, progress)}%`;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-gray-600/40 flex justify-center items-center z-[1000]">
      <div className="bg-neutral-200 p-5 rounded-lg max-w-lg w-11/12 md:max-w-3xl lg:max-w-[800px]">
        {/* Modal Header with Title and Close Button */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-emerald-700">
            {editingNode.label}
          </h3>
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-400 bg-transparent hover:bg-gray-300 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            aria-label="Close"
          >
            {/* SVG icon for the 'X' button */}
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        
        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-emerald-700"
          >
            Description:
          </label>
          <textarea
            name="description"
            id="description"
            rows={4}
            defaultValue={editingNode.description}
            // Removed redundant 'resize-none' as it's typically set globally or unnecessary on readOnly
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
            readOnly={true}
          />
          <br />
          <label
            htmlFor="requirements"
            className="block mb-2 text-sm font-medium text-emerald-700"
          >
            Requirements:
          </label>
          <input
            name="requirements"
            id="requirements"
            defaultValue={editingNode.requirements}
            readOnly={true}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
          />
          <br />
          <label
            htmlFor="xpPoints"
            className="block mb-2 text-sm font-medium text-emerald-700"
          >
            Upvotes Required to earn{' '}
            <strong className="text-xl text-emerald-700">
              {editingNode.xpPoints} XP
            </strong>
            :
          </label>
          
          <div className="flex items-center gap-4">
            {/* Progress Bar Container: Uses SkillTree palette (Gray base, Yellow in-progress, Emerald complete) */}
            <div className="w-full bg-gray-300 rounded-full h-8 relative shadow-inner">
              <div
                className={`text-xs font-semibold text-white text-center p-1 leading-none rounded-full h-8 flex items-center justify-center transition-all duration-500 ease-out 
                ${isComplete ? 'bg-emerald-500' : 'bg-yellow-600'}`}
                style={{ width: progressBarWidth }}
              >
                {/* Display text logic handles small bar widths */}
                {progress > 15 || isComplete ? (
                  isComplete ? (
                    'VERIFIED! Goal Reached.'
                  ) : (
                    `${remainder} upvotes to go (${progress}%)`
                  )
                ) : (
                  <span className="text-gray-900 absolute left-2">
                    {progress}%
                  </span>
                )}
                {/* Fallback text display for very small bars */}
                {progress <= 15 && !isComplete && (
                   <span className="text-gray-900 absolute left-full pl-2 whitespace-nowrap">
                    {remainder} upvotes to go
                  </span>
                )}
              </div>
            </div>
            
            {/* Current/Required Upvotes Display */}
            <div className="font-semibold text-lg text-emerald-700" style={{ minWidth: 'fit-content' }}>
              {currentUpvotes}/{requiredUpvotes}
            </div>
          </div>
          <br />
          
          <div className="mt-2.5 flex w-full justify-between">
            {/* Styled secondary close button */}
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-300 rounded-lg transition-colors"
            >
              Close
            </button>
            <div className="flex flex-col items-end">
              <ProofUploadButton
                skilltreeId={skilltreeId}
                skill={editingNode.label}
                requirements={editingNode.requirements}
                onUploadProof={onUploadProof}
                disabled={!isUserSubscribed}
              />
              {!isUserSubscribed && (
                <span className="text-gray-500 text-sm mt-1">
                  Please subscribe to post proofs.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};