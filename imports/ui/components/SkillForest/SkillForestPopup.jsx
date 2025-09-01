import React from 'react';
import { SubscribedTrees } from './SubscribedTrees';
export const SkillForestPopup = ({
  selectedSkillTrees,
  onConfirm,
  onClose
}) => {
  if (!selectedSkillTrees.length) return null;

  return (
    <>
      {/* Full-page overlay */}
      <div className="fixed inset-0 z-[1000] flex items-center justify-center pointer-events-none">
        {/* Semi-transparent background */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm pointer-events-auto" />

        {/* Popup content */}
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg p-6 z-[1001] pointer-events-auto">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#328E6E' }}>
            Preview Your SkillForest
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-80 overflow-y-auto">
            {selectedSkillTrees.map(tree => (
              <SubscribedTrees
                key={tree._id}
                skillTreeId={tree._id}
                showSubscribers={true}
                currentUserId={tree.owner}
                isSelected={true}
              />
            ))}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
            >
              Back
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded-lg text-white font-semibold hover:bg-green-700"
              style={{ backgroundColor: '#328E6E' }}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
